#!/usr/bin/env bash
set -euo pipefail

hosted_skill="$(mktemp)"
trap 'rm -f "$hosted_skill"' EXIT

curl --fail --silent --show-error --location \
  https://policylayer.com/skill.md \
  --output "$hosted_skill"

if ! diff --unified skills/mcp-precheck/SKILL.md "$hosted_skill"; then
  echo "The repository skill differs from https://policylayer.com/skill.md" >&2
  exit 1
fi

echo "The repository and hosted skill copies are byte-identical."
