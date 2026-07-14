# Privacy notice — MCP Precheck

Effective: 14-07-2026

This notice applies to the MCP Precheck skill and the PolicyLayer registry
lookup commands that it invokes. It does not describe every PolicyLayer
product.

## What a registry lookup sends

`policylayer stack`, `policylayer precheck` and the optional precheck hook send
only the identifier candidates needed to find an MCP server's published
record. Depending on the configuration, those candidates can include npm
package names, registry slug guesses, remote URL hostnames and MCP config key
names.

The registry also receives the normal request metadata required to operate an
internet service. PolicyLayer records the requested operation, the identifier
candidate, the resolved registry slug and outcome, the CLI version and
subcommand from the user agent, a timestamp, and a shortened SHA-256 hash of
the source IP address. A stack check records a stack-size summary and one
lookup result for each identifier candidate it checks.

The lookup commands do **not** send raw MCP configuration files, environment
variable values, authentication tokens, command lines or local file paths.
Use `policylayer stack --packages-only` to restrict candidates to package
identifiers when config key names or URL hostnames are themselves sensitive.

## How PolicyLayer uses this data

PolicyLayer uses lookup data to return registry records, operate and protect
the lookup service, understand aggregate usage, and improve registry coverage.
An identifier that is not already published can be recorded as unmet demand
and, when it resolves to an MCP-shaped package, queued for identity resolution
and scanning.

Registry lookup and unmet-demand records are currently kept as append-only
operational records and do not have a fixed automatic deletion period. The
lookup service is anonymous, and the shortened IP hash is not designed to
identify an individual account.

## Data stored on the user's machine

The CLI keeps published record summaries in
`~/.policylayer/precheck.json`. This local cache powers the “since last seen”
comparison and remains until the user deletes it. It contains record summaries,
not MCP configuration contents or secrets.

The optional Claude Code hook is installed only after the user approves it.
It can be removed with:

```
npx -y policylayer install-hook --remove
```

## Distribution services

Installing or updating the skill through GitHub, npm, an agent marketplace or
another package service also subjects that interaction to the selected
service's own privacy terms. MCP Precheck does not control those services.

## Questions or requests

Contact [hello@policylayer.com](mailto:hello@policylayer.com) with privacy
questions or requests. Because registry lookups do not require an account and
store only a shortened IP hash, PolicyLayer may not be able to associate a
particular anonymous request with the person making it.

