# Getting Started with IntoChat OS

## 1. Run Locally with `.NET Aspire`

IntoChat OS uses `.NET Aspire` (`IntoChat.OS.AppHost`) to orchestrate the local kernel silo, MCP server, reverse proxies, and the `csharp-sandbox` container:

```bash
dotnet run --project src/IntoChat.OS.AppHost/IntoChat.OS.AppHost.csproj
```

When `IntoChat.OS.AppHost` starts in the default `local` lean profile:
- **Zero database containers required**: State and encrypted secrets persist in `~/.intochat`, and `MemoryNeuron` (`IMemory`) runs in-process over `VectorIndexNeuron`.
- **`csharp-sandbox`**: Starts automatically and passes `/health` before `OperatingSystem-a` boots.
- **`OperatingSystem-front`**: Serves the HTTPS UI endpoint on `https://localhost:5080`.
- **`intochat-os-mcp-front`**: Serves the MCP server on `http://localhost:5081`.

## 2. Run Fast In-Memory Verification (`TestOS.Local()`)

All module, shell app, and architecture tests run in milliseconds without Docker:

```bash
dotnet test src/IntoChat.OS.Modules/IntoChat.OS/Apps/tests/IntoChat.OS.Modules.Apps.Tests.Unit/IntoChat.OS.Modules.Apps.Tests.Unit.csproj
dotnet test src/Testing/IntoChat.OS.Architecture.Tests.Unit/IntoChat.OS.Architecture.Tests.Unit.csproj
```
