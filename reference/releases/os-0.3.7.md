# OS 0.3.7: complete UI proxy responses

**Released 23 October 2026.** [OS 0.3.7](https://github.com/intochat/os/releases/tag/v0.3.7) targets `a72eee0319860c9d1119cc140551c9b67d51b187`, merged in [PR #294](https://github.com/intochat/os/pull/294) after [full PR CI](https://github.com/intochat/os/actions/runs/39889809802) and [Flutter/nginx CI](https://github.com/intochat/os/actions/runs/39889809805) passed. The exact master's [aggregate CI](https://github.com/intochat/os/actions/runs/39891191077) and [Flutter/nginx checks](https://github.com/intochat/os/actions/runs/39891191049) passed before release creation. The full master workflow subsequently completed successfully.

[Publication](https://github.com/intochat/os/actions/runs/39892470806) succeeded: 74 NuGet packages and the kernel, UI, and sandbox images were published, including sandbox validation. Test deployment and scoped application acceptance passed on 23 October 2026. Production was not deployed.

Ordinary upstream HTTP requests now omit the `Connection` header. WebSocket requests retain `Connection: upgrade` and the existing upgrade behavior. HTTP/1.1, unbuffered responses, forwarded public host and scheme, and private query-ticket logging behavior remain unchanged.

On the test deployment's same-environment Azure Container Apps route, `Connection: close` caused a successful large gRPC-web result to be cut short before its trailers. A bounded comparison on the same deployment delivered the full response when that header was omitted. This matches the reported behavior in [Azure Container Apps issue #734](https://github.com/microsoft/azure-container-apps/issues/734); it does not establish the deeper ingress implementation cause.

The real-nginx regression suite checks GET and POST header forwarding, complete delivery of a 256 KiB chunked response, an HTTP 101 WebSocket upgrade, static shell handling, forwarded identity and cookies, and query-ticket log privacy. An independent Ubuntu CI job runs the suite. These tests cover the proxy contract; the deployed comparison supplies the Azure-specific evidence.

The runtime behavior change is confined to the UI proxy. The release still publishes the complete package and image set. It adds no contract, stored-data, app-source, or authentication changes. Cloud deployments must consume the published OS version through their normal version pin and test deployment path.

## Deployed validation

[Cloud #44](https://github.com/intochat/cloud/pull/44) consumes the release. Its exact-master CI and [full test deployment](https://github.com/intochat/cloud/actions/runs/39894274225) passed, including unchanged reinstall, current-replica seeding, and tested-image recording. Backend, UI, and the account's actual sandbox allocation all used Cloud image tag `02fada7`; backend runtime was exactly `0.3.7+a72eee0319860c9d1119cc140551c9b67d51b187`.

The public Ino state read completed with 100,110 bytes and successful gRPC trailers. Calculator cleared and evaluated `2+3*4` as `14`. A single fresh Ino request produced Memory `ok` after 6.846 seconds, persisted a new intent with fresh Confirmed history, and produced the matching assistant reply after 8.889 seconds. No Memory timeout or fallback was observed. Ino 3.1.2 and Memory 1.2.1 were Live and unedited; existing settings, connections, and history were preserved.

This validates those flows, not every installed integration: the separate Jev/typesafe integration remains unconfigured, and aggregate runtime readiness was false. The earlier combined local MemoryLoop E2E sequence failure was also reproduced on unchanged code; its cause remains unresolved. Required PR checks passed before each merge, and exact-master CI passed before release and test deployment. Production remained untouched.
