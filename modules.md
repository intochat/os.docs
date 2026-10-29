# Modules & Community

All official and community DDD capability/connector modules live in the **[`intochat/modules`](https://github.com/intochat/modules)** repository (`E:\intochat\modules`) and are compiled together via `IntoChat.Modules.slnx`.

## Core System Modules

| Module | Contracts | Description |
|--------|-----------|-------------|
| `IntoChat.OS.Modules.Identity` | `IUserSettings`, `IProfile`, `ICompute` | System settings (`theme`, `username`, `model`), public profile (`PostApp` feed), and token metering (`ComputeNeuron`) |
| `IntoChat.OS.Modules.Memory` | `IMemory` | Zero-Docker local semantic & episodic memory (`MemoryNeuron`) with `Remember`, `Recall`, `List`, and `Forget` |
| `IntoChat.OS.Modules.Aspire` | `IAspire` | Programmatic `.NET Aspire` dashboard client (`AspireNeuron`) for resource health, logs, traces, and error feeds |
| `IntoChat.OS.Modules.Apps` | `IAppStudio`, `InoApp`, `CreatorApp`, `PostApp`, `SettingsApp` | Built-in AI-native apps and `IAppStudio` synthesis engine |
| `IntoChat.OS.Modules.Microsoft.CSharp` | `ICSharpSandbox` | Roslyn compilation, `AppRunner` sandbox container, and live `[Signal]` wiring |

## External Connector Modules

| Module | Capabilities |
|--------|--------------|
| `IntoChat.OS.Modules.Google` | Gmail (`IGmail` with `[Signal]` on new email webhook), Google Calendar (`IGoogleCalendar`), Google Drive (`IGoogleDrive`), Gemini (`IGemini`) |
| `IntoChat.OS.Modules.GitHub` | Repositories, issues, pull requests, and webhooks (`IGitHub`) |
| `IntoChat.OS.Modules.Slack` | Channels, messages, and event webhooks (`ISlack`) |
| `IntoChat.OS.Modules.Telegram` | Bot messaging and webhook updates (`ITelegram`) |
| `IntoChat.OS.Modules.Discord` | Guilds, channels, and bot signals (`IDiscord`) |
| `IntoChat.OS.Modules.Notion` | Pages, databases, and workspace search (`INotion`) |
| `IntoChat.OS.Modules.Linear` | Issues, cycles, and project tracking (`ILinear`) |
| `IntoChat.OS.Modules.Jira` | Issues, sprints, and webhooks (`IJira`) |
| `IntoChat.OS.Modules.Stripe` | Customers, subscriptions, and payment webhooks (`IStripe`) |
| `IntoChat.OS.Modules.Shopify` | Orders, products, and store webhooks (`IShopify`) |
| `IntoChat.OS.Modules.Twilio` | SMS, voice, and incoming message webhooks (`ITwilio`) |
| `IntoChat.OS.Modules.OpenAI` | Chat completions, embeddings, and responses (`IOpenAI`) |
| `IntoChat.OS.Modules.Anthropic` | Claude messages and tool use (`IAnthropic`) |
| `IntoChat.OS.Modules.ElevenLabs` | Text-to-speech and voice synthesis (`IElevenLabs`) |
| `IntoChat.OS.Modules.Brave` | Web search (`IBraveSearch`) |
| `IntoChat.OS.Modules.Timers` | Scheduled cron and one-shot timers (`ITimer`) |

## Shared SDK Primitives (`MeteredHttpPipeline` & `WebhookGateway`)

Every external connector module uses two shared primitives from `IntoChat.OS.Modules.Sdk`:

1. **`MeteredHttpPipeline`**: Wraps outbound `HttpClient` calls with OAuth token injection, retry policies, rate-limit tracking, and `ICompute` metering.
2. **`WebhookGateway`**: Provides a unified `/webhooks/{module}/{brainId}` ingress endpoint that validates provider signatures and emits `[Signal]` events directly into the target user's neuron.

## Community Module Leaderboard

Want a new integration (e.g., X/Twitter, WhatsApp, Home Assistant, Spotify)?

1. Open a **[Module Request Issue](https://github.com/intochat/modules/issues/new?template=module-request.yml)** in `intochat/modules`.
2. Vote on existing requests by reacting with 👍 on the issue description.
3. Maintainers and community contributors prioritize modules from the **[Trending Module Requests](https://github.com/intochat/modules/issues?q=is%3Aissue+is%3Aopen+label%3Amodule-request+sort%3Areactions-%2B1-desc)** leaderboard.
