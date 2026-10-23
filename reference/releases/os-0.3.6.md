# OS 0.3.6: runtime failure recovery

**Released 23 October 2026.** [OS 0.3.6](https://github.com/intochat/os/releases/tag/v0.3.6) targets `a2a0c810dcb5ddca819786fd0b5116723b246463`, merged in [PR #293](https://github.com/intochat/os/pull/293) after green checks. [Aggregate CI](https://github.com/intochat/os/actions/runs/39877924198) passed on that exact master commit.

The [publication workflow](https://github.com/intochat/os/actions/runs/39879362302) successfully published 74 NuGet packages and the kernel, UI, and sandbox images, including the image validation steps. Deployed acceptance remains pending.

## Conditional text updates

`IntoChat.OS.Flutter.Text.IText` adds `Task<bool> TrySet(string markdown, int expectedVersion)`. Read the current `TextState`, then pass its `Version` when replacing text that belongs to that observation. A matching version applies the update, increments the version, and publishes the normal `TextChanged` signal. A stale version returns `false` without replacing a later writer's text. Existing `Set` and `Read` calls retain their behavior; the stored text-state shape is unchanged.

```csharp
var current = await status.Read();
if (current.Markdown == expectedNotice)
{
    await status.TrySet("", current.Version);
}
```

This is a conditional update, not a reservation. A caller that receives `false` must decide whether rereading is appropriate for its operation.

## Runtime transport errors

The sandbox session client preserves untyped HTTP 408, 429, and 5xx responses as `HttpRequestException` with `StatusCode`. Consumers that previously caught only `InvalidOperationException` for these responses should handle the typed transport error. Authentication refusals, structured revision conflicts, and explicit runtime refusals retain their existing exception handling.

The generic client does not replay neuron mutations. A failed HTTP response can be ambiguous: the server may have committed the write before the response was lost. Recovery belongs to the operation that can inspect its resulting state.

## Shipped apps

Ino 3.1.2 identifies a failed pending-message scan as a check that will be retried. A healthy scan clears that infrastructure warning, including the legacy persisted wording, only if its text version is unchanged. Genuine slow-Memory fallback notices and unrelated warnings remain visible.

Memory 1.2.1 reads an intent's state before retrying a transient rephrase or confirmation failure. It avoids repeating a change that already committed and limits mutation attempts to three, with 250 ms then 500 ms backoff for transient transport failures. The model's 30-second deadline and Ino's separate eight-second fallback gate retain their meanings.

Installed app source must be updated through the supported app update path to receive the feature patches. Existing conversations, memory records, and custody keys are retained. Kernel and sandbox images must carry matching contracts.
