# Getting Started

This guide walks through building, testing, and launching **IntoChat OS** locally with `.NET Aspire` and the native Flutter desktop client.

## Prerequisites

- **.NET 11 SDK** (`11.0.100-preview.3` or newer)
- **Flutter SDK** (`3.41.x` / Dart `3.11+` for the `ui/` workspace)
- **Docker Desktop** (optional — only needed when running containerized PostgreSQL or external container resources; local development runs out-of-the-box in-memory)

## Repository Layout

Clone the repositories side-by-side under a shared parent directory:

```text
intochat/
├── digitalbrain/       # Core C# framework (intochat/digitalbrain)
├── modules/            # Official DDD modules (intochat/modules)
├── os/                 # IntoChat OS runtime, Aspire AppHost & Flutter UI (intochat/os)
│   └── ui/             # Dart Pub workspace (core, ui, shell)
└── nuget/              # Local NuGet feed for cross-repo package development
```

## 1. Run `aspire start` (`dotnet run intochat.cs start`)

From the root of `intochat/os`, start the full `.NET Aspire` orchestrator, the `IntoChat.OS.Kernel` Orleans silo, and the native desktop Flutter shell with a single command:

```powershell
cd E:\intochat\os
dotnet run intochat.cs start
```

What `dotnet run intochat.cs start` launches:
- **`.NET Aspire` Dashboard & AppHost**: Orchestrates all OS resources, health checks, structured logs, and distributed traces.
- **`IntoChat.OS.Kernel` (`http://localhost:5080`)**: Hosts the Orleans silo, gRPC `NeuronsService`, HTTP/SSE `RuntimeEdge`, unified `/integrations/{provider}` OAuth & webhook endpoints, and built-in `App<TState>` shell apps (`DesktopApp`, `InoApp`, `CreatorApp`, `SettingsApp`, `GalleryApp`, `Files`, `PhotoCraftApp`, `FilmCraftApp`).
- **WASM Studios (`PhotoCraft` & `FilmCraft`)**: Serves `PhotoCraft` (`http://localhost:18082`) and `FilmCraft` (`http://localhost:18083`) interactive WASM studios rendered via `UI.WebBrowser`.
- **Native Flutter Desktop Client (`ui/shell`)**: Launches the Whiteboard Home Desk connected to the kernel over HTTP/2 gRPC.

Useful CLI flags:

```powershell
# Start in detached background mode and wait until kernel + shell are healthy
dotnet run intochat.cs start --detach

# Inspect running OS status and endpoints
dotnet run intochat.cs status

# Stop all running Aspire and kernel processes
dotnet run intochat.cs stop
```

## 2. Build & Test the C# Stack

Run the automated unit, `[Scenario]` BDD, architecture, and integration test suites across all three repositories:

```powershell
# 1. DigitalBrain Framework
dotnet test E:\intochat\digitalbrain\DigitalBrain.slnx

# 2. Official Modules
dotnet test E:\intochat\modules\IntoChat.Modules.slnx

# 3. IntoChat OS (Unit, Architecture, Integration & E2E)
dotnet test E:\intochat\os\Intochat.OS.slnx
```

## 3. Build & Test the Consolidated Flutter UI Workspace (`ui/`)

All Flutter packages live inside the Dart Pub workspace at `e:\intochat\os\ui\` (`ui/core`, `ui/ui`, `ui/shell`), cleanly isolated from MSBuild and `.slnx`:

```powershell
cd E:\intochat\os\ui
flutter pub get
flutter analyze
flutter test
```

## 4. Explore the Whiteboard Desktop & Built-In Apps

Once `dotnet run intochat.cs start` opens the desktop shell:
1. **Whiteboard Home Desk**: Drag, resize, and **Auto-Arrange** sticky-note smart apps on the canvas. Click the **Pin** button (`LucideIcons.pin`) on any window top bar to lock its position during auto-layout and keep it **always-on-top**.
2. **Top-Bar Sandbox Controls**:
   - **Short-click Reload (`LucideIcons.rotateCw`)** to refresh the app's declarative `View` without losing state.
   - **Long-press (`> 500ms`) or right-click Reload** to hard-restart the isolated app sandbox.
   - **Settings Popover (`LucideIcons.slidersHorizontal`)** to switch the app's execution mode (`WASM Web UI`, `MCP Server`, `Native Linux CLI`), reset sandbox state, or inspect the app in Creator 3D.
3. **Talk to Ino (`ino`)**: Send a message in `InoApp`—Ino queries `ReadBrainContext` and recalls relevant facts from `MemoryNeuron` (`IMemory`).
4. **Build & Debug in Creator (`creator`)**: Select or create an app to watch the 3D `BrainScene3D` halt rotation and smoothly zoom to the target app node, inspect step-by-step plain-English `[Scenario]` BDD results, test in the live `SANDBOX / TEST CREDENTIALS` viewport, and release or roll back semantic versions.
