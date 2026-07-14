# mcp-precheck

[![skills.sh](https://skills.sh/b/PolicyLayer/mcp-precheck)](https://skills.sh/PolicyLayer/mcp-precheck)

Agent skill that checks every MCP server against the [PolicyLayer registry](https://policylayer.com/registry) before connecting — identity, risk grade, tool classifications and changes.

MCP servers describe themselves, and those descriptions are claims, not facts. This skill gives an agent one habit: before adding, installing or configuring any MCP server, look it up in a registry of tens of thousands of continuously scanned servers and report what the record actually says — who publishes it, what its tools can read, change or destroy, and what changed since the machine last saw it.

More: https://policylayer.com/agents

## Find it

- [OpenAI Plugin Directory](https://chatgpt.com/plugins/plugins_6a5672a6f8288191b0635a124c19bdac) — published as **MCP Precheck**
- [skills.sh](https://skills.sh/PolicyLayer/mcp-precheck) — portable Agent Skills installer
- [Smithery](https://smithery.ai/skills/policylayer/mcp-precheck) — indexed as `policylayer/mcp-precheck`

## Install

For a human, in any project:

```
npx skills add PolicyLayer/mcp-precheck
```

The installer detects supported clients and asks where to install the skill. To target one client and skip the prompt, add its agent flag, for example:

```
npx skills add PolicyLayer/mcp-precheck -a claude-code -y
```

Supported targets include `claude-code`, `cursor`, `codex`, `gemini-cli`, `github-copilot` and others.

For an agent, one instruction:

> Read https://policylayer.com/skill.md and follow the instructions.

The skill can persist itself to the client's skills directory with the human's approval.

## What it does

The skill drives the [`policylayer`](https://www.npmjs.com/package/policylayer) CLI. Both commands are read-only lookups against the registry:

```
npx -y policylayer stack --json                     # scan every MCP server configured on this machine
npx -y policylayer precheck <server> --json --rules # check one server before connecting
```

- **What you already have** — `stack` finds every configured server across the repo and client config files and checks each against the live registry.
- **What you add** — `precheck` runs before the connection exists: identity confidence, auth posture, per-tool risk classification, recent changes, and a suggested action (`proceed`, `connect-with-rule`, `ask-first`).
- **What changes** — rechecks diff the latest record against the last one this machine saw and flag what is new.

Where a tool is flagged, the output includes ready-made deny rules for clients that can enforce them locally (Claude Code `permissions.deny`, Codex `disabled_tools`). There is also an optional Claude Code PreToolUse hook (`npx -y policylayer install-hook`) that prechecks servers at the moment they are added.

Lookups send identifier candidates only — package names, slugs and config key names. Config contents, env values and file paths never leave the machine.

See the skill-specific [privacy notice](PRIVACY.md) for the complete lookup
data, retention and local-storage details.

## Repository layout

```
.claude-plugin/plugin.json       # Claude Code marketplace package
.codex-plugin/plugin.json        # Codex marketplace package
.cursor-plugin/plugin.json       # Cursor marketplace package
gemini-extension.json            # Gemini CLI gallery package
skills/mcp-precheck/SKILL.md     # shared skill payload
```

`SKILL.md` here is a mirror of the canonical file served at https://policylayer.com/skill.md. The served copy is the source of truth; CI checks the two copies remain byte-identical on every change and once a day.

The manifests are thin wrappers around the same skill. They contain no separate instructions and do not add an MCP server, credentials or background process.

## Related

- [PolicyLayer/mcp](https://github.com/PolicyLayer/mcp) — the registry as an MCP server (`com.policylayer/registry` on the official MCP Registry): the same lookups over `https://api.policylayer.com/mcp`, including `check_mcp_stack` for whole-stack checks in one call.
- [PolicyLayer registry](https://policylayer.com/registry) — search the records; every published server has a page at `policylayer.com/tools/<slug>`.
- [PolicyLayer](https://policylayer.com) — the hosted control plane: the same policy enforced for a whole team, on every tool call, with approvals and audit history.

## Licence

MIT
