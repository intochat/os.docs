# Sandbox Execution Modes, Window Controls & Live Behaviors

IntoChat OS combines an isolated multi-mode sandbox architecture with responsive window controls and reactive `[On("sourceKey")]` signal subscriptions.

## 1. Window Top-Bar Controls & Per-App Execution Modes

Every app window (`WindowFrame` in `e:\intochat\os\ui\shell\lib\desktop\window_frame.dart`) on the Whiteboard Home Desk provides four top-bar controls on the right side of its title bar:

1. **Pin Always-on-Top (`LucideIcons.pin` / `LucideIcons.pinOff`)**:
   - Locks the app's exact `(x, y, width, height)` position on the whiteboard so **Auto-Arrange** never displaces it.
   - Elevates the window into the pinned z-order partition (`[...unpinnedIds, ...pinnedIds]`) so it remains strictly always-on-top above unpinned windows.
2. **Reload View vs. Hard-Restart Sandbox (`LucideIcons.rotateCw`)**:
   - **Short Click (`< 500ms`)**: Triggers `onReload`, refreshing the declarative `NeuronView` without losing in-memory app or sandbox state.
   - **Long Press (`>= 500ms`) or Right-Click**: Triggers `onHardRestartSandbox`, dispatching a `sandbox-restart` (`hard-restart`) signal that tears down and recreates the isolated app sandbox container and resets its initial state.
3. **Execution Mode & Sandbox Settings Popover (`LucideIcons.slidersHorizontal`)**:
   - Opens an interactive popover allowing per-app selection of the execution mode:
     - **`WASM Web UI` (`wasm-ui`)**: Runs interactive browser/WASM studio surfaces via `UI.WebBrowser`.
     - **`MCP Server` (`mcp`)**: Exposes and executes the app's tools over the Model Context Protocol (`craft-mcp`).
     - **`Native Linux CLI` (`native-linux`)**: Executes commands inside an isolated Linux container/CLI runner.
   - Also provides quick actions to **Reset Sandbox State** or **Inspect in Creator 3D**.

## 2. WASM Studios (`PhotoCraft` & `FilmCraft`) via `UI.WebBrowser`

Creative studio apps use `UI.WebBrowser` (`WebBrowserNode` in `DigitalBrain.UI`) to embed high-framerate WASM studios directly inside declarative `App<TState>` views:
- **`PhotoCraftApp` (`photocraft`)**: Renders the PhotoCraft WASM Studio at `http://localhost:18082` (`UI.WebBrowser(State.WebUrl ?? "http://localhost:18082", "PhotoCraft WASM Studio", "photocraft-wasm", executionMode: State.ExecutionMode)`), alongside layer management, filter pipelines, and AI image generation tools.
- **`FilmCraftApp` (`filmcraft`)**: Renders the FilmCraft WASM Studio at `http://localhost:18083` (`UI.WebBrowser(State.WebUrl ?? "http://localhost:18083", "FilmCraft WASM Studio", "filmcraft-wasm", executionMode: State.ExecutionMode)`), supporting multi-track timeline editing, clip transitions, and render export.

## 3. Isolated C# Sandbox (`csharp-sandbox` & `RuntimeEdge`)

User-authored and runtime C# apps can execute out-of-process inside `IntoChat.OS.Sandbox.CSharp` (`AppRunner`), communicating with the OS kernel over HTTP + Server-Sent Events (`RuntimeEdge`):

- **SSE Event Loop (`/edge/{appKey}/events`)**: Streams incoming signals and UI interactions to the sandboxed `App<TState>` instance.
- **View & State Reporting (`/edge/{appKey}/report`)**: Publishes updated `DigitalBrain.UI.View` trees and serialized state snapshots back to the kernel.
- **Zero-Token Capability Proxy (`/edge/{appKey}/invoke`)**: Every outbound neuron or capability call from the sandbox carries the caller's `AppPrincipal` (`app:{appKey}`) and passes through `PlainNeuronCallFilter` and `GrantCallFilterStage`. Sandboxed code never receives raw OAuth tokens or vault secrets.

```powershell
dotnet run --project src/IntoChat.OS.Modules/Microsoft/CSharp/src/IntoChat.OS.Sandbox.CSharp -- `
  --assembly MyCustomApp.dll `
  --edge http://localhost:5080/edge/my-app
```

## 4. Live Behaviors (`[On("sourceKey")]`)

Apps and neurons can subscribe declaratively to signals emitted by any other neuron in the brain using `[On("sourceKey")]`:

```csharp
[App("inbox-digest", Title = "Inbox Digest", Icon = "mail")]
public sealed class InboxDigestApp : App<InboxDigestState>
{
    // Automatically invoked whenever the "gmail" neuron emits an EmailReceivedSignal
    [On("gmail")]
    public void OnEmailReceived(EmailReceivedSignal signal)
    {
        State.RecentSubjects.Insert(0, $"{signal.From}: {signal.Subject}");
    }

    public override View Render() =>
        UI.Card("Recent Emails",
            UI.Column(State.RecentSubjects.Select(s => UI.Text(s)).ToArray()));
}
```

When `gmail` emits `EmailReceivedSignal`, the runtime routes the signal across the durable synapse to `InboxDigestApp.OnEmailReceived`, persists the updated state, and pushes the re-rendered `View` to the Flutter desktop over gRPC.
