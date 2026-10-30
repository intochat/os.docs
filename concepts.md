# Core Concepts

## 1. Brains & Neurons (`INeuron`)

A **Brain** (`IBrain`) is an isolated, addressable personal compute space containing stateful **Neurons** (`Neuron<TState>`) that communicate through typed contracts (`INeuron`) and asynchronous **Signals** (`Signal`).

```csharp
[Neuron("notes")]
public sealed class NotesNeuron : Neuron<NotesState>, INotes
{
    public Task AddAsync(string note, CancellationToken ct = default)
    {
        State.Items.Add(note);
        return Task.CompletedTask;
    }
}
```

## 2. Declarative Apps (`App<TState>` & `DigitalBrain.UI`)

An **App** (`App<TState>`) is a specialized neuron that renders declarative UI trees (`DigitalBrain.UI.View`) via `Render()` and `RenderSide()`, responds to user and neuron signals via `[On]`, and defines executable `[Scenario]` BDD specifications. Both built-in shell apps (`DesktopApp`, `InoApp`, `CreatorApp`, `SettingsApp`, `GalleryApp`, `Files`, `PhotoCraftApp`, `FilmCraftApp`, `PostApp`, `CalculatorApp`) and user-created runtime apps share the exact same `App<TState>` SDK.

```csharp
[App("counter", Title = "Counter", Icon = "hash")]
public sealed class CounterApp : App<CounterState>
{
    [On]
    public void Increment(IncrementClicked _) => State.Count++;

    public override View Render() =>
        UI.Card("Counter",
            UI.Text($"Count: {State.Count}"),
            UI.Button("Increment", new IncrementClicked()));

    [Scenario("Incrementing increases the counter by one")]
    public static async Task VerifyIncrement(CounterApp app, IBdd bdd)
    {
        await bdd.Given("a fresh counter", () => { });
        await bdd.When("Increment is clicked", () => app.Increment(new()));
        await bdd.Then("Count is 1", () => Assert.Equal(1, app.State.Count));
    }
}
```

### First-Class UI Nodes (`UI.WebBrowser` & `UI.BrainScene`)

`DigitalBrain.UI` exposes rich declarative nodes rendered natively by the Flutter `intochat_os_ui` package (`NeuronView` and `UiGalleryScreen`):
- **`UI.WebBrowser(url, title, key, height, executionMode)` (`WebBrowserNode`)**: Embeds interactive WASM/Web studios (such as `PhotoCraft` at `http://localhost:18082` and `FilmCraft` at `http://localhost:18083`) with live execution-mode badges (`wasm-ui`, `mcp`, `native-linux`) and reload controls.
- **`UI.BrainScene(...)` (`BrainSceneNode`)**: Renders the interactive 3D neuron and synapse graph (`BrainScene3D`) with camera controls (`PauseRotation`, `ZoomTargetId`, `TargetZoom`) so selecting or inspecting an app halts auto-rotation and smoothly zooms onto the target neuron node.

## 3. 3-Part `ConnectionKeys` & Unified `/integrations/{provider}`

External service connections are addressed by canonical 3-part **`ConnectionKeys`**:

```text
{brainId}/connection/{connectorId}/{connectionId}
```

For example, a single user can connect both personal and work GitHub accounts side-by-side:
- `local/connection/github/personal`
- `local/connection/github/work`

All OAuth redirects and inbound provider webhooks route through the unified `/integrations/{provider}` HTTP surface (`IntegrationsEndpoints`):
- **OAuth Redirects**: `GET /integrations/{provider}/oauth/callback` (and `/integrations/{provider}/callback`) completes the OAuth exchange, seals the token inside the target `ConnectionNeuron<TState>`, and records connection health.
- **Inbound Webhooks**: `POST /integrations/{provider}/webhook` (and `POST /integrations/{provider}`) resolves the target `ConnectionKey` and dispatches the verified webhook payload to `IConnectionInbound`.

## 4. Zero-Token Security, Circles & Capability Sharing

IntoChat OS enforces **zero raw token exposure** across all sandboxed apps and neurons:

- **Sealed Credentials Inside `ConnectionNeuron.UseCredentialAsync`**: OAuth access tokens, refresh tokens, and API keys are encrypted via `IBrainSecretSealer` and unsealed strictly inside `ConnectionNeuron<TState>.UseCredentialAsync`. Raw tokens never cross grain boundaries or reach app code.
- **Capability Broker & Call Filtering (`ICapabilityBroker` & `GrantCallFilterStage`)**: Apps request domain capabilities (such as `IStorage`, `IEmail`, or `IGitHubIssues`) through `ICapabilityBroker`. Every cross-neuron call passes through `PlainNeuronCallFilter` and `GrantCallFilterStage`, which block direct calls from `app:*` principals to `ISecretValueSource` or `IVault`.
- **Friend-Style Capability Sharing (`SdkCapabilitySharing` & `ConnectionBindings`)**: Trusted apps can be linked as **friends** (for example, `ino` <-> `photocraft`, `ino` <-> `files`, `creator` <-> `bdd`) or granted scoped access to specific neuron keys via **Circles** (`CirclesNeuron`), allowing direct capability collaboration without exposing credentials.
