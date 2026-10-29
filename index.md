# IntoChat OS

**IntoChat OS** is an open-source, cloud-native distributed operating system where every user owns a **DigitalBrain** — a living network of stateful neurons, reactive C# apps, personal memory, and social Circles.

Built on **[DigitalBrain](https://github.com/intochat/digitalbrain)**, **.NET Aspire**, and **Microsoft Orleans**, IntoChat OS runs identically on your local PC (`local`), as a hybrid bridge (`local+cloud`), or on a multi-node cloud cluster (`cloud`).

## Ecosystem Repositories

| Repository | Role |
|---|---|
| **[`intochat/digitalbrain`](https://github.com/intochat/digitalbrain)** | Standalone C# framework (`Neuron<TState>`, `App<TState>`, `[Signal]`, `[On]`, `[Scenario]` / `BddNeuron`, `ModuleManifest`, `TestOS`). |
| **[`intochat/modules`](https://github.com/intochat/modules)** | Official & community DDD capability and connector modules (`Gmail`, `GitHub`, `MCP`, `Postgres`, `Qdrant`, `Time`, `Flame`, `AI`) + [Trending Module Requests](https://github.com/intochat/modules/issues?q=is%3Aissue+is%3Aopen+label%3Amodule-request+sort%3Areactions-%2B1-desc). |
| **[`intochat/os`](https://github.com/intochat/os)** | Distributed OS kernel (`WebhookGateway`, `MeteredHttpPipeline`), `.NET Aspire` AppHost, isolated `csharp-sandbox`, Flutter 3D shell, and core system apps (`InoApp`, `CreatorApp`, `SettingsApp`, `PostApp`). |

## Key Capabilities

- **Ino (`[App("ino")]`)**: Personal AI assistant backed by in-process `MemoryNeuron` (`IMemory`), `AgentContextNeuron` (`ReadBrainContext`), and fast local Jev intent routing.
- **Creator Self-Improving Loop (`[App("creator")]`)**: Visualizes your active DigitalBrain in a 3D Flame scene (`BrainScene`), inspects live runtime logs and traces via `IAspire`, synthesizes or repairs `App<TState>` C# code in `csharp-sandbox`, and gates promotion on `[Scenario]` BDD verification (`IBdd`).
- **Live Sandbox Behaviors (`csharp-sandbox`)**: User and AI-authored apps run in isolated unloadable `AssemblyLoadContext` sessions inside `csharp-sandbox`, connecting back to the brain via `IntoChatOSClient` and reacting to live background signals (`[On("sourceKey")]`).
- **Circles & Social App Profiles (`[App("post")]`)**: Fine-grained access control down to individual neurons (`Grant.TargetNeuronKey`), where a user's public profile and feed are composed of shareable, forkable apps.
