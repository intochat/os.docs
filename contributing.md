# Contributing

Thank you for contributing to the IntoChat ecosystem!

## Repository Guide

- **[`intochat/digitalbrain`](https://github.com/intochat/digitalbrain)**: Contribute to the core C# framework (`INeuron`, `App<TState>`, `DigitalBrain.UI` declarative value trees, `UI.WebBrowser`, `BrainSceneNode`, `BddNeuron`, `ScenarioStepVerdict`, `TestBrain`, and Roslyn analyzers).
- **[`intochat/modules`](https://github.com/intochat/modules)**: Build new zero-token DDD capability/connector modules (`ConnectionNeuron<TState>.UseCredentialAsync`) or enhance creative studios (`ArtCraft`).
- **[`intochat/os`](https://github.com/intochat/os)**: Contribute to the Orleans runtime host (`IntoChat.OS.Kernel`), `.NET Aspire` orchestration (`intochat.cs start`), consolidated Flutter UI workspace (`e:\intochat\os\ui\`), built-in `App<TState>` apps (`DesktopApp`, `InoApp`, `CreatorApp`, `SettingsApp`, `PhotoCraftApp`, `FilmCraftApp`, `Files`), `/integrations/{provider}`, `LocalCloudNeuron`, and zero-token security.

## Development Rules & Invariants

1. **Single Declarative UI Toolkit (`DigitalBrain.UI` + `App<TState>`)**:
   - All apps (built-in and runtime) implement `App<TState>` and return `DigitalBrain.UI.View` value trees.
   - All Flutter packages reside in `e:\intochat\os\ui\` (`ui/core`, `ui/ui`, `ui/shell`). Never place `.csproj` or MSBuild files inside `e:\intochat\os\ui\`.
2. **Zero-Token Security**:
   - Sandboxed apps must never receive raw OAuth tokens or secrets. Always access external providers through `ICapabilityBroker` and `ConnectionNeuron<TState>.UseCredentialAsync`.
3. **Plain-English `[Scenario]` BDD Tests**:
   - Every `App<TState>` must include `[Scenario]` methods verifying its behavior with `IBdd` (`Given` / `When` / `Then`).
4. **Verify Locally Before Opening a PR**:

```powershell
# 1. DigitalBrain Framework
dotnet test E:\intochat\digitalbrain\DigitalBrain.slnx

# 2. IntoChat Modules
dotnet test E:\intochat\modules\IntoChat.Modules.slnx

# 3. IntoChat OS (Unit, Architecture, Integration & E2E)
dotnet test E:\intochat\os\Intochat.OS.slnx

# 4. Flutter UI Workspace
cd E:\intochat\os\ui
flutter analyze
flutter test

# 5. Start OS & Desktop Client via Aspire
cd E:\intochat\os
dotnet run intochat.cs start
```
