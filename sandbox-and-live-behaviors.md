# C# Sandbox & Live Behaviors

IntoChat OS executes user and AI-created C# apps inside an isolated Docker container (`csharp-sandbox`, implemented in `src/IntoChat.OS.Modules.Microsoft.CSharp.Sandbox`), while connecting them back to the user's Digital Brain over a scoped HTTP + SSE connection (`IntoChatOSConnection`).

## How `csharp-sandbox` Works

1. **Dynamic Compilation with Roslyn**: When an app is deployed, `AppCompiler` compiles the C# source files in memory against `DigitalBrain.dll` and module contracts, enforcing Roslyn analyzers (`DB0020`–`DB0024`).
2. **Scoped `IntoChatOSConnection`**: The sandbox receives the user's brain identifier, OS gateway URL, and a scoped authentication token.
3. **Resolving Neurons (`Get<T>`)**:
   - Inside an `App<TState>`, calling `Get<IUserSettings>("settings")` invokes `AppRunner.ResolveNeuron(typeof(IUserSettings), "settings")`.
   - Relative keys (`"settings"`) resolve via `brain.Neuron<T>("settings")` (`{brain}/settings`).
   - Full cross-brain keys (`"alice/profile"`) resolve via `brain.Get<T>("alice/profile")` and pass through `GrantsInterceptor` for Circle/Grant permission checks.

## Two Execution Modes for Apps

### 1. Reactive UI Turns (`[On]`)

Parameterless `[On]` (or `[On("ActionName")]` with parameters) methods are user-callable UI turns:

```csharp
[On]
public async Task Ask(string prompt)
{
    var memory = Get<IMemory>("memory");
    await memory.Remember(prompt);
    State = State with { LastPrompt = prompt };
}
```

When a user clicks a button or submits a form in the UI:
1. The OS calls `POST /run` on `csharp-sandbox` with the current `State` JSON and operation arguments.
2. `AppRunner` hydrates the `App<TState>`, executes the `[On]` method, calls `Render()`, and returns the updated `State` + `UiNode` tree.

### 2. Live Background Signal Subscriptions (`[On("sourceKey")]`)

Apps can also react autonomously to live background `[Signal]`s emitted by any neuron in the user's brain (such as a new email arriving on a webhook, a timer firing, or user settings changing):

```csharp
[On("settings", Contract = typeof(IUserSettings))]
public void OnSettingsChanged(UserSettingsChanged? changed)
{
    if (changed is null) return;
    State = State with
    {
        UserDisplayName = changed.DisplayName,
        DefaultModel = changed.DefaultModel,
    };
}
```

How live subscriptions work under the hood:
- `AppDefinition.From(typeof(TApp))` discovers all `[On("sourceKey")]` methods whose single parameter is a `[Signal]` record type and stores them in `AppDefinition.SignalSubscriptions`.
- In `TestOS` (`InstalledApp<TApp>`), the test harness automatically subscribes to the target neuron's signal stream via `SignalSubscriptionWire` and executes an app turn whenever the signal fires.
- In `csharp-sandbox` (`AppRunner`), the runner subscribes to the remote neuron proxy's `[Signal]` over SSE (`IntoChatOSConnection`) and invokes the handler method automatically whenever an event arrives.
