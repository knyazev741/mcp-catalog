# KnyazevAI MCP Catalog

MCP server that connects your AI assistant to the [KnyazevAI](https://knyazevai.work) search engine — the largest unified index of MCP servers and AI agents (24,500+ entries across 8 registries).

Your assistant gets tools to **search**, **browse**, **filter**, and **inspect** MCP servers. It returns structured data (JSON with names, descriptions, trust scores, install commands, GitHub stars, licenses, vulnerabilities) — the assistant then presents results however it wants.

## Quick Start

```bash
npx -y knyazevai-mcp-catalog
```

## Configure in Claude Desktop

```json
{
  "mcpServers": {
    "mcp-catalog": {
      "command": "npx",
      "args": ["-y", "knyazevai-mcp-catalog"]
    }
  }
}
```

<details>
<summary>Cursor / Windsurf / VS Code</summary>

**Cursor** — `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "mcp-catalog": {
      "command": "npx",
      "args": ["-y", "knyazevai-mcp-catalog"]
    }
  }
}
```

**Windsurf** — `~/.codeium/windsurf/mcp_config.json`:
```json
{
  "mcpServers": {
    "mcp-catalog": {
      "command": "npx",
      "args": ["-y", "knyazevai-mcp-catalog"]
    }
  }
}
```

**VS Code** — `.vscode/mcp.json`:
```json
{
  "servers": {
    "mcp-catalog": {
      "command": "npx",
      "args": ["-y", "knyazevai-mcp-catalog"]
    }
  }
}
```
</details>

## Tools

| Tool | What it does | Returns |
|------|-------------|---------|
| `search_servers` | Semantic search by task description | Ranked list of servers with scores, stars, install commands |
| `list_servers` | Browse with filters (category, sort) | Paginated server list |
| `get_server` | Get full details by server UUID | Tools list, trust breakdown, framework compat, packages |
| `discover` | Task-based search across MCP + A2A agents | Ranked results with similarity scores |
| `get_server_vulnerabilities` | Check CVE/GHSA for a server | Vulnerability list with severity and affected packages |
| `get_catalog_stats` | Catalog overview | Total counts by registry, category breakdown |

## What you get back

Every search result includes:
- **Title & description** — what the server does
- **Trust score** (0-100) — composite of source credibility, popularity, freshness, security
- **GitHub stars** — community adoption signal
- **Install command** — ready to paste into your config
- **Transport type** — stdio, SSE, or streamable-http
- **License** — MIT, Apache-2.0, etc.
- **Pricing** — free/paid/freemium
- **Vulnerability count** — known CVEs in dependencies

Server details (`get_server`) additionally include:
- Full list of MCP tools the server exposes
- Trust score breakdown (6 dimensions)
- Framework compatibility (Claude Desktop, Cursor, Windsurf, etc.)
- npm/PyPI/Docker package info
- README summary

## How it works

This package is a thin MCP server that forwards requests to the [knyazevai.work](https://knyazevai.work) REST API. All indexing, ranking, and scoring happens on the backend. This client just calls the API and returns JSON results as MCP tool responses.

No API key required. No data collection. No internal logic.

## REST API

You can also use the API directly without MCP:

```bash
# Search
curl "https://knyazevai.work/api/v1/servers/search?q=database&limit=5"

# Browse by trust score
curl "https://knyazevai.work/api/v1/servers?sort_by=trust&limit=10"

# Server details
curl "https://knyazevai.work/api/v1/servers/{uuid}"

# Vulnerabilities
curl "https://knyazevai.work/api/v1/servers/{uuid}/vulnerabilities"

# Stats
curl "https://knyazevai.work/api/v1/stats"
```

Full API docs: [knyazevai.work/llms-full.txt](https://knyazevai.work/llms-full.txt)

## License

MIT
