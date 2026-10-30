# Official & Community Modules (`intochat/modules` & Built-In OS Modules)

IntoChat OS separates domain capabilities and third-party service integrations into modular DDD packages hosted in **[`intochat/modules`](https://github.com/intochat/modules)** alongside core OS capability modules in **[`intochat/os`](https://github.com/intochat/os)**.

## 1. Core OS Capability Modules (`cloud` & `sdk`)

Built directly into `intochat/os` to power everyday app storage and inter-app collaboration:

| Module | Neuron / Contract | Description |
| --- | --- | --- |
| **`cloud` (`IntoChat.OS.Modules.Cloud`)** | `LocalCloudNeuron` (`[Neuron("local-cloud")]`, `IStorage`) | Provides filtered, path-traversal-safe local `IStorage` (`storage@1`) scoped to the brain's local cloud directory, plus `LocalCloudSyncNeuron` and `CircleCloudNeuron`. |
| **`sdk` (`IntoChat.OS.Modules.Sdk`)** | `SdkCapabilitySharing` (`ISdkTools`, `ConnectionBindings`) | Provides typed SDK capability discovery (`storage@1`, `secrets@1`, `identity@1`) and **friend-style capability sharing** (`ShareWith`, `UnshareWith`, `IsSharedWith`) so trusted apps (`ino` <-> `photocraft`, `ino` <-> `files`) can invoke each other's capability contracts directly under `GrantCallFilterStage`. |
| **`integrations` (`/integrations/{provider}`)** | `IntegrationsEndpoints`, `ConnectionNeuron<TState>` | Unified OAuth redirect (`/integrations/{provider}/oauth/callback`) and inbound webhook (`POST /integrations/{provider}/webhook`) routing into 3-part `ConnectionKeys` (`{brainId}/connection/{connectorId}/{connectionId}`) with zero-token `UseCredentialAsync` execution. |

## 2. Official DDD Connector & Capability Modules (`intochat/modules`)

Every external connector inherits from `ConnectionNeuron<TState>` and executes authenticated API calls inside `UseCredentialAsync` so raw OAuth tokens and API keys never leave the connection grain:

| Category | Modules | Key Contracts |
| --- | --- | --- |
| **Communication & Messaging** | **Gmail**, **Telegram**, **Slack** | `IGmail`, `ITelegramBot`, `ISlackWorkspace`, `IConnectionInbound` |
| **Developer & Productivity** | **GitHub**, **Linear**, **Notion**, **Google Calendar**, **Google Drive** | `IGitHub`, `ILinear`, `INotion`, `ICalendar`, `IStorage` (`storage@1`) |
| **AI & Media Generation** | **OpenAI**, **Anthropic**, **Whisper**, **ElevenLabs**, **ArtCraft** (`PhotoCraft` / `FilmCraft`) | `IChatCompletion`, `ISpeechToText`, `ITextToSpeech`, `IArtCraftStudio` |
| **Commerce & Payments** | **Stripe** | `IStripeBilling`, `IConnectionInbound` |
| **System & Runtime** | **Windows Storage**, **Linux CLI (`CliModule`)**, **Docker**, **Browser**, **MCP**, **PostgreSQL** | `IStorage`, `ICliRunner`, `IMcpHost` |

## 3. Authoring a Zero-Token Connector Module

To build a new connector module in `intochat/modules`:
1. Define your domain capability interface in `Contracts/` (no Orleans or HTTP types).
2. Implement `ConnectionNeuron<TState>` and execute all external HTTP calls inside `UseCredentialAsync`:

```csharp
[Neuron("github")]
public sealed class GitHubConnectionNeuron : ConnectionNeuron<GitHubConnectionState>, IGitHub
{
    public Task<IReadOnlyList<GitHubIssue>> ListIssuesAsync(string repo, CancellationToken ct = default) =>
        UseCredentialAsync(async (credential, token) =>
        {
            // credential.AccessToken is unsealed strictly inside this grain call
            // and never returned to the calling App<TState>.
            return await FetchIssuesFromGitHubApiAsync(repo, credential.AccessToken, token);
        }, ct);
}
```
