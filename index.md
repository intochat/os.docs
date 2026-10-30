---
layout: home

hero:
  name: "IntoChat OS"
  text: "Self-Improving Personal Operating System"
  tagline: "Built on DigitalBrain, .NET Aspire, Microsoft Orleans, and an unified declarative Flutter Whiteboard Desktop."
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: Architecture
      link: /architecture
    - theme: alt
      text: Official Modules
      link: /modules

features:
  - title: "Whiteboard Home Desk & Smart Sticky-Note Apps"
    details: "Apps live on an infinite whiteboard desktop as resizable sticky-note cards and floating windows that auto-arrange while respecting always-on-top pinned (LucideIcons.pin) apps."
  - title: "Ino & Cross-App Memory"
    details: "Ino acts as your personal AI brain coordinator, combining live ReadBrainContext with persistent MemoryNeuron (IMemory) recall and friend-style capability sharing across all apps."
  - title: "Creator 3D Inspector, Plain-English BDD & Live Sandbox"
    details: "Inspect and build apps in a 3D BrainScene that pauses rotation and smoothly zooms to the active app node, debug plain-English (and multi-language) [Scenario] BDD steps, and test in a live sandbox viewport badged SANDBOX / TEST CREDENTIALS with Roslyn compilation, version rollback, and hot-restart."
  - title: "Zero-Token Connections & Unified /integrations/{provider}"
    details: "OAuth redirects and inbound webhooks route through /integrations/{provider} into 3-part ConnectionKeys ({brainId}/connection/{connectorId}/{connectionId}). Sandboxed apps never see raw OAuth tokens—capabilities execute strictly inside ConnectionNeuron.UseCredentialAsync via ICapabilityBroker and GrantCallFilterStage."
  - title: "Multi-Mode App Execution & WASM Studios"
    details: "Top-bar controls let you short-click to refresh a view, long-press (>500ms) or right-click to hard-restart an isolated sandbox, and switch per-app execution modes (WASM Web UI, MCP Server, Native Linux CLI), powering live UI.WebBrowser WASM studios for PhotoCraft and FilmCraft."
  - title: "Official DDD Modules & LocalCloudNeuron"
    details: "Install first-party and community capabilities from intochat/modules and built-in OS modules—including LocalCloudNeuron (filtered local IStorage), sdk capability sharing, Gmail, GitHub, Telegram, Stripe, and ArtCraft."
---

## Three Repositories, One Cohesive Ecosystem

| Repository | Role | License |
| --- | --- | --- |
| **[`intochat/digitalbrain`](https://github.com/intochat/digitalbrain)** | Pure C# framework (`INeuron`, `App<TState>`, `DigitalBrain.UI` declarative value trees, `UI.WebBrowser`, `BrainSceneNode`, `BddNeuron`, `ScenarioStepVerdict`, `TestBrain`, Roslyn analyzers) | MIT |
| **[`intochat/modules`](https://github.com/intochat/modules)** | Official & community DDD capability and connector modules (`ConnectionNeuron<TState>`, `UseCredentialAsync`, Gmail, GitHub, Google Drive, Telegram, Slack, Notion, Linear, Stripe, OpenAI, Anthropic, Whisper, ElevenLabs, ArtCraft) | MIT |
| **[`intochat/os`](https://github.com/intochat/os)** | The IntoChat OS runtime (`IntoChat.OS.Kernel`), `.NET Aspire` orchestrator (`intochat.cs start`), consolidated Flutter Pub workspace (`ui/core`, `ui/ui`, `ui/shell`), `InoApp`, `CreatorApp`, `PhotoCraftApp`, `FilmCraftApp`, `/integrations/{provider}`, `LocalCloudNeuron`, and zero-token security | Core Engine |
