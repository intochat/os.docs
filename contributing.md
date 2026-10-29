# Contributing

Thank you for contributing to the IntoChat ecosystem!

## Repository Guide

- **[`intochat/digitalbrain`](https://github.com/intochat/digitalbrain)**: Contribute to the core C# framework (`INeuron`, `App<TState>`, `BddNeuron`, `TestBrain`, Roslyn analyzers, and standalone examples).
- **[`intochat/modules`](https://github.com/intochat/modules)**: Build new DDD capability/connector modules or vote on trending module requests.
- **[`intochat/os`](https://github.com/intochat/os)**: Contribute to the Orleans runtime host, `.NET Aspire` orchestration, `InoApp`, `CreatorApp`, `csharp-sandbox`, and Circle/Grant security.

## Development Workflow

1. **Zero-Magic-String Policy**: Always test neurons and apps through typed contracts (`brain.Add<IMyContract, MyNeuron>("key")`) and `TestOS` (`os.InstallApp<MyApp>("key")`). Never use string-based reflection or empty marker assertions in unit tests.
2. **Write `[Scenario]` BDD Tests**: Every `App<TState>` should include `[Scenario]` methods verifying its behavior with `IBdd` (`Given` / `When` / `Then`).
3. **Verify Locally Before Opening a PR**:

```powershell
# DigitalBrain Framework
dotnet test E:\intochat\digitalbrain\DigitalBrain.slnx

# IntoChat Modules
dotnet build E:\intochat\modules\IntoChat.Modules.slnx

# IntoChat OS
dotnet test E:\intochat\os\IntoChat.OS.slnx
```
