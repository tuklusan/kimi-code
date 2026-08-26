# sanyalnet-lab — SDLC multi-agent company snapshot

> **Personal downstream fork of [MoonshotAI/kimi-code](https://github.com/MoonshotAI/kimi-code) with local tweaks. Not intended for upstream merge.**

Version-controlled copy of the SANYALnet Labs kimi setup — a six-role
software-development lifecycle (SDLC) "company" that runs entirely inside
kimi as parallel subagents. Committed here so the setup is backed up,
diffable, and reproducible on any lab box.

## Contents

| Path | Purpose |
|---|---|
| `SDLC-Multi-Agent-Project-Directive.md` | The five-phase pipeline directive — Inception → Blueprint → Code → Review → Test. Injected as the first user turn (see "Autoload" below). |
| `agents/ceo.md` | Chief Executive Officer persona — Phase 1 lead. |
| `agents/cpo.md` | Chief Product Officer persona — Phase 1 partner. |
| `agents/cto.md` | Chief Technology Officer persona — Phase 2 architect. |
| `agents/programmer.md` | Implementer — Phase 3. |
| `agents/reviewer.md` | Static-analysis reviewer — Phase 4. |
| `agents/tester.md` | QA — Phase 5. |
| `config.toml.template` | Redacted `~/.kimi-code/config.toml` — NVIDIA NIM provider, `send_prompt_cache_key = false` (natively supported by this fork; no NIM proxy needed), Kimi K2.6 + Nemotron models. Placeholder `REPLACE_ME` for the API key. |
| `bin/install.sh` | Idempotent installer — symlinks the snapshot into `$KIMI_CODE_HOME` (default `~/.kimi-code`), seeds `config.toml` on first run, optionally wires `KIMI_INITIAL_PROMPT_FILE` into `~/.bashrc`. |
| `legacy/nim_proxy.py` | 90-line NIM proxy that predated this fork's `send_prompt_cache_key = false` provider option. Obsolete once the fork binary is installed; kept for archaeology. |

## Install

On the lab box (or any machine you want the SDLC company on):

```sh
git clone https://github.com/tuklusan/kimi-code.git
cd kimi-code/sanyalnet-lab
./bin/install.sh --autoload      # links files into ~/.kimi-code and wires ~/.bashrc
```

The installer prompts (once, silently) for the NVIDIA API key on first
run and writes a fresh `~/.kimi-code/config.toml`. If a config already
exists, the installer leaves it alone.

Refresh after a git pull by re-running `./bin/install.sh`.

## How the autoload works

The fork adds a `KIMI_INITIAL_PROMPT_FILE` environment variable. When set,
kimi injects the file's contents as the first user turn on every new
session (guarded so resume doesn't re-inject). Set it manually:

```sh
export KIMI_INITIAL_PROMPT_FILE="$HOME/.kimi-code/SDLC-Multi-Agent-Project-Directive.md"
kimi     # first turn is the directive; the CEO+CPO subagents launch Phase 1 immediately
```

Or persist it via `install.sh --autoload` which appends the export to
`~/.bashrc`.

## Model choices

The template pins these providers and the initial default model:

- **Provider:** NVIDIA NIM (`https://integrate.api.nvidia.com/v1`) with
  `send_prompt_cache_key = false` — the fork's native opt-out for strict
  OpenAI-compatible gateways.
- **Models exposed:** Kimi K2.6, Llama 3.3 Nemotron Super 49B (thinking),
  Nemotron-3 Nano 30B (thinking), Llama 3.1 Nemotron Nano 8B, Nemotron
  Nano 12B v2 VL (multimodal), Llama 3.1 Nemotron 70B Instruct, plus
  voicechat, content-safety, and PII-detection specialists.
- **`default_model`** in the template points at a Nemotron 120B alias the
  lab was tuning against — swap for whichever alias you want the CEO
  subagent to start on.

## What this snapshot does NOT include

Runtime state — never commit these:

- `~/.kimi-code/sessions/`, `search-index/`, `cache/`, `logs/`,
  `telemetry/`, `updates/`, `session_index.jsonl`
- `~/.kimi-code/config.toml.bak*` — one-off manual backups from tuning
  history
- `~/.kimi-code/device_id`, `workspaces.json`, `workspace-trust/`,
  `region`, `user-history/`
- `~/.kimi-code/tui.toml` — TUI-local preferences

## Rotating the NVIDIA API key

The lab's key was pasted into an AI conversation transcript at one point
and should be treated as compromised. To rotate: generate a new key at
`build.nvidia.com` (or the NGC catalog), then either:

```sh
sed -i 's|api_key = "nvapi-[^"]*"|api_key = "nvapi-NEW-KEY-HERE"|' ~/.kimi-code/config.toml
```

or delete `~/.kimi-code/config.toml` and re-run `./bin/install.sh`.
