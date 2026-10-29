# 3-Repository Architecture

IntoChat is partitioned into three clean layers with strict dependency rules enforced by `IntoChat.OS.Architecture.Tests.Unit`:

```mermaid
flowchart TD
    subgraph R1["1. intochat/digitalbrain"]
        DB["DigitalBrain Framework\n• Neuron<TState> & App<TState>\n• [Scenario] & BddNeuron (IBdd)\n• ModuleManifest & Need\n• TestOS.Local() & BddRunner"]
    end

    subgraph R2["2. intochat/modules"]
        MOD["21 DDD Capability & Connector Modules\n• AI (IMemory, IAgentContext, RouterNeuron)\n• Google (Gmail, Drive, Auth), GitHub, Salesforce, MCP\n• Aspire (IAspire), Flame (3D), Time, LocalDisk\n• Postgres, Qdrant, ClickHouse, Supabase, Playwright"]
    end

    subgraph R3["3. intochat/os"]
        KERNEL["IntoChat.OS.Kernel & AppHost\n• WebhookGateway & MeteredHttpPipeline\n• IntoChat.OS.Aspire.Hosting\n• csharp-sandbox (AppRunner + IntoChatOSClient)\n• Identity, Circles, Flutter & Apps\n  (InoApp, CreatorApp, SettingsApp, PostApp)"]
    end

    R1 --> R2
    R1 --> R3
    R2 --> R3
```

## Unified Kernel HTTP & Webhook Gateway

Instead of each connector module re-implementing HTTP retry policies or custom webhook controllers, modules declare `Need.HttpClient` and `Need.Webhook` in their `ModuleManifest`:

- **`MeteredHttpPipeline`**: Provisions named `IHttpClientFactory` pipelines with per-module rate limiting (`RequestsPerMinute`) and automatic OAuth bearer token injection (`ModuleAuth`).
- **`WebhookGateway`**: Exposes `POST /webhooks/{moduleId}`, validates signatures, and dispatches `WebhookPayload` directly to the module's target neuron (`TargetNeuronType`).
