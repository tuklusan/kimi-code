#!/usr/bin/env bash
#
# sanyalnet-lab installer — links this snapshot into $KIMI_CODE_HOME
# (default ~/.kimi-code) so kimi picks up the six-role SDLC company setup
# on every launch. Idempotent — re-run to refresh links after a git pull.
#
# On first run, prompts (once, silently) for the NVIDIA API key and writes
# a fresh $KIMI_CODE_HOME/config.toml from `config.toml.template`. If a
# config.toml already exists, the installer leaves it alone.
#
# Usage:
#   ./bin/install.sh                       # links into ~/.kimi-code
#   KIMI_CODE_HOME=/tmp/kimi ./bin/install.sh
#   ./bin/install.sh --autoload            # also writes the KIMI_INITIAL_PROMPT_FILE
#                                            export line into ~/.bashrc
#
# Requires: bash, ln, mkdir, sed. No sudo.

set -euo pipefail

LAB_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${KIMI_CODE_HOME:-$HOME/.kimi-code}"
AUTOLOAD=0
for arg in "$@"; do
  case "$arg" in
    --autoload) AUTOLOAD=1 ;;
    -h|--help)
      sed -n '2,17p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *) echo "unknown flag: $arg" >&2; exit 2 ;;
  esac
done

mkdir -p "$DEST/agents"

# Symlink agent personas. `ln -sfn` replaces stale links, so re-running after
# a git pull refreshes any renamed / added files.
for src in "$LAB_DIR"/agents/*.md; do
  ln -sfn "$src" "$DEST/agents/$(basename "$src")"
done

# The SDLC directive lives at the same location kimi originally kept it.
ln -sfn "$LAB_DIR/SDLC-Multi-Agent-Project-Directive.md" "$DEST/"

# Seed config.toml on first install. Never overwrite an existing file — the
# lab box carries live provider keys and per-model overrides beyond the
# template.
if [ ! -f "$DEST/config.toml" ]; then
  echo "seeding $DEST/config.toml from template"
  read -srp "NVIDIA API key (nvapi-...): " key
  echo
  if [ -z "$key" ]; then
    echo "empty key; writing template with placeholder" >&2
    cp "$LAB_DIR/config.toml.template" "$DEST/config.toml"
  else
    sed "s|REPLACE_ME|$key|" "$LAB_DIR/config.toml.template" > "$DEST/config.toml"
  fi
  chmod 600 "$DEST/config.toml"
else
  echo "$DEST/config.toml exists; leaving it alone"
fi

# Optional: wire the initial-prompt env var into ~/.bashrc so every fresh
# shell launches with the SDLC directive as the first turn (needs the
# KIMI_INITIAL_PROMPT_FILE feature in the fork's kimi binary).
if [ "$AUTOLOAD" = "1" ]; then
  marker='# sanyalnet-lab: initial-prompt autoload'
  if ! grep -q "$marker" "$HOME/.bashrc" 2>/dev/null; then
    {
      echo ""
      echo "$marker"
      echo "export KIMI_INITIAL_PROMPT_FILE=\"$DEST/SDLC-Multi-Agent-Project-Directive.md\""
    } >> "$HOME/.bashrc"
    echo "added KIMI_INITIAL_PROMPT_FILE export to ~/.bashrc"
  else
    echo "~/.bashrc already contains the autoload marker; skipping"
  fi
fi

echo "installed. KIMI_CODE_HOME=$DEST"
echo "agents:  $DEST/agents/"
echo "primer:  $DEST/SDLC-Multi-Agent-Project-Directive.md"
