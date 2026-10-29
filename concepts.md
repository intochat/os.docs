# Brains, Circles & Identity

## The DigitalBrain Scope

Every user owns a `BrainId`. Inside a brain:
- **System Neurons**:
  - `UserSettingsNeuron` (`IUserSettings` at `os.settings`): Stores `DisplayName`, `Theme`, `DefaultModel`, and user variables, emitting `UserSettingsChanged`.
  - `ProfileNeuron` (`IProfile` at `os.profile`): Stores the user's public handle, bio, and pinned social apps.
  - `ComputeNeuron` (`ICompute` at `flutter.compute`): Tracks 30-day token and compute spend in micro-dollars across apps (`ino`, `creator`, `settings`).

## Circles & Neuron-Level Access Control (`TargetNeuronKey`)

**Circles** combine social networking with capability-based security:
- A `Grant` in `IdentityModule` (`identity@1`) can scope access to an entire capability or down to a specific **`TargetNeuronKey`** (neuron-level grant).
- **Apps as Public Profile (`PostApp`)**: A user's public profile and feed are apps (`[App("post")]`). Users publish posts scoped to a Circle (`public`, `friends`, `private`), and other brains in that Circle can view, interact with, or fork those apps.
