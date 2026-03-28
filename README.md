# MCP Catalog

> Search and discover 24,500+ MCP servers and AI agents from your AI assistant.

MCP Catalog is an [MCP server](https://modelcontextprotocol.io) that gives AI assistants the ability to search, compare, and evaluate MCP servers across the entire ecosystem. Powered by [knyazevai.work](https://knyazevai.work) — the largest unified MCP catalog with semantic search and trust scores.

## Quick Start

```bash
npx -y @knyazevai/mcp-catalog
```

## Configure in Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mcp-catalog": {
      "command": "npx",
      "args": ["-y", "@knyazevai/mcp-catalog"]
    }
  }
}
```

## Configure in Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "mcp-catalog": {
      "command": "npx",
      "args": ["-y", "@knyazevai/mcp-catalog"]
    }
  }
}
```

## Configure in Windsurf

Add to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "mcp-catalog": {
      "command": "npx",
      "args": ["-y", "@knyazevai/mcp-catalog"]
    }
  }
}
```

## Configure in VS Code

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "mcp-catalog": {
      "command": "npx",
      "args": ["-y", "@knyazevai/mcp-catalog"]
    }
  }
}
```

## Available Tools

| Tool | Description |
|------|-------------|
| `search_servers` | Semantic search across 24,500+ servers by task description |
| `list_servers` | Browse and filter servers by category, sort by trust/stars/downloads |
| `get_server` | Full details: tools, trust breakdown, install commands, compatibility |
| `get_server_vulnerabilities` | CVE/GHSA vulnerability data for server dependencies |
| `discover` | AI-powered recommendations for your specific task |
| `get_catalog_stats` | Aggregate ecosystem statistics |

## Example Prompts

Once configured, ask your AI assistant:

- *"Find MCP servers for managing PostgreSQL databases"*
- *"What are the most trusted MCP servers for web scraping?"*
- *"Compare the top email MCP servers"*
- *"Are there any vulnerabilities in the filesystem MCP server?"*
- *"What's the best MCP server for working with GitHub?"*

## How It Works

This package is a lightweight MCP server that proxies requests to the [knyazevai.work](https://knyazevai.work) public API. All search, ranking, and trust scoring happens server-side. The client simply formats API responses as MCP tool results.

**No API key required.** The public API is free to use.

## API

The underlying REST API is also available directly:

- **Search**: `GET https://knyazevai.work/api/v1/servers/search?q=your+query`
- **Browse**: `GET https://knyazevai.work/api/v1/servers?sort_by=trust&limit=20`
- **Details**: `GET https://knyazevai.work/api/v1/servers/{id}`
- **Stats**: `GET https://knyazevai.work/api/v1/stats`
- **Docs**: [knyazevai.work/llms.txt](https://knyazevai.work/llms.txt)

## Links

- **Website**: [knyazevai.work](https://knyazevai.work)
- **API Docs**: [knyazevai.work/llms-full.txt](https://knyazevai.work/llms-full.txt)
- **MCP Protocol**: [modelcontextprotocol.io](https://modelcontextprotocol.io)

## License

MIT
