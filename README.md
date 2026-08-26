# SANYALnet Labs Kimi Code CLI Software Development Company

> **Personal downstream fork of [MoonshotAI/kimi-code](https://github.com/MoonshotAI/kimi-code) with local tweaks. Not intended for upstream merge.**

A tuned build of the Kimi Code CLI that ships a preconfigured six-role AI **software development company** out of the box — inspired by [ChatDev](https://github.com/OpenBMB/ChatDev). A small hierarchy of specialised subagents (CEO, CPO, CTO, programmer, reviewer, tester) collaborates through a five-phase SDLC pipeline to turn a natural-language product requirement into working, reviewed, tested code.

**➡ [Download the latest fork release](https://github.com/tuklusan/kimi-code/releases/latest)** — native binaries for linux-x64 / linux-arm64 / darwin-x64 / darwin-arm64 / win32-x64 / win32-arm64, tagged `kimi-code-sanyalnet-cli-vX.Y.Z`. The features described in this README ship in **rev 0.0.3 and later**; older releases carry only the earlier subset.

[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE) [![CI](https://img.shields.io/github/actions/workflow/status/tuklusan/kimi-code/ci.yml?branch=main&label=CI)](https://github.com/tuklusan/kimi-code/actions/workflows/ci.yml) [![Smoke](https://img.shields.io/github/actions/workflow/status/tuklusan/kimi-code/sanyalnet-smoke.yml?branch=main&label=Company%20smoke%20%C3%97%206%20platforms)](https://github.com/tuklusan/kimi-code/actions/workflows/sanyalnet-smoke.yml) [![Release](https://img.shields.io/github/v/release/tuklusan/kimi-code?label=fork%20release&color=blue)](https://github.com/tuklusan/kimi-code/releases/latest)

For the underlying Kimi Code CLI product — install script, quickstart, editor/IDE integration (ACP), `/mcp-config`, video input, hooks, marketplace plugins, general command reference — see the [upstream README](https://github.com/MoonshotAI/kimi-code#readme) and [upstream docs](https://moonshotai.github.io/kimi-code/en/). This README covers only what the fork adds on top.

## How the software company works

On any fresh session, kimi loads the primer at `~/.kimi-code/SDLC-Multi-Agent-Project-Directive.md` (via the fork's [`KIMI_INITIAL_PROMPT_FILE`](docs/en/configuration/env-vars.md#initial-prompt-autoload-downstream-fork-only) autoload) and treats the six persona files under `~/.kimi-code/agents/` as bindable subagents. When you submit a product requirement, the CEO reads the primer and dispatches through five phases in order:

| Phase | Agents | Output |
|---|---|---|
| 1 — Inception & Status Audit | `ceo` + `cpo` | Product Requirement Document |
| 2 — Architectural Blueprint | `cto` | Tech-stack pick + architectural sign-off |
| 3 — Implementation | `programmer` | Source, written incrementally against the blueprint |
| 4 — Static Review | `reviewer` | Findings loop with the programmer until zero critical defects |
| 5 — QA | `tester` | Unit / integration / edge-case tests + Certificate of Compliance |

Each phase's output is the next phase's input; subagents run in isolated contexts and hand back structured results to the parent session, so the transcript stays legible. The full directive lives in [`sanyalnet-lab/SDLC-Multi-Agent-Project-Directive.md`](sanyalnet-lab/SDLC-Multi-Agent-Project-Directive.md); each persona is in [`sanyalnet-lab/agents/`](sanyalnet-lab/agents/).

## Install the fork on a fresh machine

Two steps: install the fork binary, then install the software company setup.

**1. Fork binary.** Download the appropriate zip from the [latest release](https://github.com/tuklusan/kimi-code/releases/latest), unzip, put `kimi` on your `PATH`. On macOS you must clear the quarantine flag before first launch:

```sh
xattr -d com.apple.quarantine kimi
```

Verify:

```sh
kimi --version
```

**2. Company setup.** Clone this fork and run the installer — it symlinks the six agent personas plus the SDLC directive into `$KIMI_CODE_HOME` (default `~/.kimi-code`) and, with `--autoload`, wires the initial-prompt env var into your `~/.bashrc` so every fresh kimi session starts with the directive pre-loaded in the editor. Idempotent — re-run after `git pull` to refresh.

```sh
git clone https://github.com/tuklusan/kimi-code.git
cd kimi-code/sanyalnet-lab
./bin/install.sh --autoload
```

On first run the installer prompts (once, silently) for your NVIDIA NIM API key and seeds `~/.kimi-code/config.toml` from the redacted template.

## What this fork adds on top of upstream

- **`sanyalnet-lab/`** — six agent personas + the five-phase SDLC directive + an idempotent installer that deploys the whole software-development company onto any Linux / macOS / Windows box. See [`sanyalnet-lab/README.md`](sanyalnet-lab/README.md).
- **`KIMI_INITIAL_PROMPT_FILE`** — env var that pre-populates the TUI editor with a file's contents on every fresh session (never on resume). Lets recurring multi-agent primers load one Enter-press away. Docs: [env-vars.md](docs/en/configuration/env-vars.md#initial-prompt-autoload-downstream-fork-only).
- **Per-provider `send_prompt_cache_key` opt-out** — for strict OpenAI-compatible gateways (NVIDIA NIM, some vLLM deployments) that reject unknown request params with HTTP 400. Auto-set on `provider catalog add` for known strict endpoints; overridable via `kimi provider set <id> --send-prompt-cache-key <true|false>` or by hand in `config.toml`. Retires the pre-fork `nim_proxy.py` workaround (kept under [`sanyalnet-lab/legacy/`](sanyalnet-lab/legacy/) for archaeology).
- **`KIMI_OUTBOUND_MIN_INTERVAL_MS`** — minimum 1-second gap between model-driven outbound network calls (`fetch_url`, `web_search`). Shared across both tools so a runaway loop cannot hammer external hosts. Default `1000`; set to `0` to disable.
- **Auto-update disabled by default** — this fork ships its own release binaries under the `kimi-code-sanyalnet-cli-v*` tags; the upstream update channel is a separate distribution and, if left on, would silently replace the fork's binary. Opt back in with `KIMI_CODE_AUTO_UPDATE=1`. Manual `kimi upgrade` still works.
- **Downstream release workflow** — [`.github/workflows/sanyalnet-release.yml`](.github/workflows/sanyalnet-release.yml) publishes tagged `kimi-code-sanyalnet-cli-vX.Y.Z` releases with six-platform SEA binaries, no macOS signing needed.

## Multi-platform test results

Every push to `main` that touches `sanyalnet-lab/`, the smoke workflow itself, or the fork's autoload source files runs a smoke test that deploys the software-development company via [`sanyalnet-lab/bin/install.sh`](sanyalnet-lab/bin/install.sh) into a sandboxed `KIMI_CODE_HOME` on each of the six release runners, then asserts that every persona and directive file landed, the seeded `config.toml` carries the `REPLACE_ME` placeholder (never a real API key), the installer is idempotent, and the fork's `KIMI_INITIAL_PROMPT_FILE` autoload wiring is still present in the built source. No LLM calls — this is a fast, deterministic wiring check that runs in about a minute on all six runners in parallel.

| Runner | OS image | Company install | Runtime |
|---|---|---|---|
| linux-x64 | `ubuntu-24.04` | ✅ pass | ~10 s |
| linux-arm64 | `ubuntu-24.04-arm` | ✅ pass | ~10 s |
| darwin-x64 (Intel) | `macos-15-intel` | ✅ pass | ~15 s |
| darwin-arm64 (Apple Silicon) | `macos-15` | ✅ pass | ~15 s |
| win32-x64 | `windows-2025-vs2026` | ✅ pass | ~25 s |
| win32-arm64 | `windows-11-arm` | ✅ pass | ~25 s |

Live status via the "Company smoke × 6 platforms" badge above; the raw run history is at [Actions → Sanyalnet Company Smoke Test](https://github.com/tuklusan/kimi-code/actions/workflows/sanyalnet-smoke.yml).

The paired [Sanyalnet E2E Fibonacci](https://github.com/tuklusan/kimi-code/actions/workflows/sanyalnet-e2e-fibonacci.yml) workflow (manual dispatch) drives the full five-phase pipeline against a real NVIDIA NIM model and asserts that the company delivers a working Fibonacci program plus documentation — see [`.github/workflows/sanyalnet-e2e-fibonacci.yml`](.github/workflows/sanyalnet-e2e-fibonacci.yml) for the acceptance criteria. It is gated on the `NVIDIA_API_KEY` repo secret and is a no-op green while that secret is unset.

## Develop this fork

```sh
git clone https://github.com/tuklusan/kimi-code.git
cd kimi-code
pnpm install
pnpm build
pnpm test
```

Node.js `≥ 24.15.0`, pnpm `10.33.0`. Same upstream toolchain — the fork adds no new build-time dependencies.

## Community

- Fork-specific issues: [tuklusan/kimi-code/issues](https://github.com/tuklusan/kimi-code/issues)
- Upstream Kimi Code CLI issues: [MoonshotAI/kimi-code/issues](https://github.com/MoonshotAI/kimi-code/issues)
- Security: see [SECURITY.md](SECURITY.md).

## Acknowledgements

- [MoonshotAI/kimi-code](https://github.com/MoonshotAI/kimi-code) — the upstream project this fork is built on.
- [ChatDev](https://github.com/OpenBMB/ChatDev) — inspiration for the multi-role SDLC pipeline.
- [`pi-tui`](https://github.com/earendil-works/pi-mono/tree/main/packages/tui) — the TUI foundation, via upstream.

## License

Released under the [MIT License](LICENSE).
