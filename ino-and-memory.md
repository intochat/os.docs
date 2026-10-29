# Ino & Brain Context

`InoApp` (`src/IntoChat.OS.Modules.Apps/Apps/InoApp.cs`) is your personal AI assistant and home dashboard on IntoChat OS.

Unlike a standalone chatbot, Ino operates with full visibility into your Digital Brain — reading your profile, active apps, background tasks, user settings, and persistent semantic memory on every turn.

## Whole-Brain Context (`ReadBrainContext`)

Before answering a prompt or orchestrating an action, `InoApp` calls `ReadBrainContext()`:

- **`IUserSettings` (`settings`)** — Reads your display name, theme, language, and default model preference.
- **`IMemory` (`memory`)** — Queries your persistent semantic and episodic memory entries (`Recall(query, limit)`).
- **`IAppStudio` (`main`)** — Lists installed apps and can synthesize or launch new apps on demand (`Make(goal)`).
- **Active Reminders & Tasks** — Tracks background tasks and reminders directly in `InoAppState`.

## Zero-Docker Local Memory (`MemoryNeuron`)

The `IntoChat.OS.Modules.Memory` module provides `IMemory` (`MemoryNeuron`):

```csharp
[DefaultNeuronType("memory")]
public interface IMemory : INeuron
{
    Task<MemoryEntry> Remember(string text, IReadOnlyList<string>? tags = null, CancellationToken ct = default);
    Task<IReadOnlyList<MemoryEntry>> Recall(string query, int limit = 5, CancellationToken ct = default);
    Task<IReadOnlyList<MemoryEntry>> List(CancellationToken ct = default);
    Task Forget(string id, CancellationToken ct = default);

    [Signal]
    MemoryUpdated? Updated { get; }
}
```

- **Local Development**: Runs out-of-the-box with zero external containers using tokenized keyword & tag scoring persisted in neuron state.
- **Cloud Production**: Swaps cleanly to vector embeddings while preserving the exact same `IMemory` contract.

## Creating Apps from Ino (`InoApp.Make`)

When you ask Ino to build a new workflow or tracker (for example, `Make("Track posts from Elon Musk on X")`):

1. `InoApp.Make(goal)` resolves `Get<IAppStudio>("main")` if available in the brain.
2. `IAppStudio.Create(goal)` synthesizes a new `App<TState>` C# script and installs it into your brain.
3. If `IAppStudio` is not provisioned in a minimal test environment, `InoApp` records the app request cleanly in `State.CreatedApps` and logs the action in `IMemory`.

## Live Signal Subscription

`InoApp` also subscribes to background signals from your `settings` neuron:

```csharp
[On("settings", Contract = typeof(IUserSettings))]
public void OnSettingsChanged(UserSettingsChanged? changed)
{
    if (changed is null) return;
    State = State with
    {
        UserDisplayName = changed.DisplayName,
        DefaultModel = changed.DefaultModel,
        StatusMessage = $"Settings updated: {changed.DisplayName} ({changed.DefaultModel})",
    };
}
```

Whenever your user settings change anywhere in the OS, `InoApp` automatically updates its state in the background.
