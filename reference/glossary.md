# Glossary

Technical terms used across the IntoChat OS documentation. See [Concepts](../concepts) for the core model.

| Term | Meaning | Boundary |
| --- | --- | --- |
| IntoChat OS | The open-source AI-native operating system: a .NET 11 / Orleans kernel, modules, a C# sandbox and a Flutter shell | Named DigitalBrain before 0.3.0; see the [0.3.0 release notes](./releases/os-0.3.0) |
| Brain | An ownership scope and state boundary holding a person's apps and state; a circle is a shared brain | Not a synonym for an AI model |
| Workspace | User environment containing applications, conversations and scoped shared context | Access to one workspace does not grant all connections or data |
| Application | User-facing task with entry points, workflow, UI, dependencies and permissions | A registered module alone is not an installed usable application |
| Module | The unit of code; one folder with Contracts, internal neurons, tests and one static ModuleManifest | Can supply capabilities or integrations used by multiple applications |
| Synapse | The durable routing of a signal kind from one neuron to another | Means routing only; a script file is a reaction |
| Reaction | A script method that runs when a signal arrives (shape checked by RXN0001/RXN0002) | Was called a synapse before os 0.7.0 |
| Capability | A versioned contract (storage@1) a module provides and an app requires | Apps require capabilities, never a specific module |
| Connection | A person's authorised use of a module in a brain; apps never pick a module, the broker resolves connections | A connection proves authorised working access |
| Topology | Local, local+cloud or cloud; one topology profile class each | Chosen per deployment, not per app |
| Agent | Model-driven execution behavior using instructions and tools | Neither an application package nor an isolation boundary by itself |
| Framework | Runtime contracts and composition primitives | Source and API surface |
| SDK | Framework plus developer tools, templates and test workflow | Compatibility is tracked per release |
| Runtime | Executes application behavior and manages state | Runs independently of any hosted service |
| Catalog | The module composition (`OsCatalog`), or a discoverable inventory of apps | `OsCatalog` is the one place the module composition is named |
| Shared context | Data reused across applications within explicit scope | Provenance, user permission and deletion rules travel with it |
| Provenance | Origin, retrieval time, transformations and permission context of a result | Model-generated text alone does not establish a source |
