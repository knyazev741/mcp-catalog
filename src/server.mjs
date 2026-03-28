/**
 * MCP Server that proxies tool calls to the knyazevai.work public API.
 * No internal logic — all intelligence lives on the server side.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as api from "./api.mjs";

export function createServer() {
  const server = new McpServer({
    name: "knyazevai-mcp-catalog",
    version: "0.1.0",
    description:
      "Search and discover 24,500+ MCP servers and AI agents. " +
      "Semantic search, trust scores, vulnerability tracking.",
  });

  // ── search_servers ───────────────────────────────────────
  server.tool(
    "search_servers",
    "Semantic search across 24,500+ MCP servers and AI agents by task description. " +
      "Returns ranked results with trust scores.",
    {
      query: z.string().describe("What you need the server to do, e.g. 'manage PostgreSQL databases'"),
      limit: z.number().optional().default(10).describe("Max results (1-50)"),
      category: z.string().optional().describe("Filter by category slug"),
      sort: z
        .enum(["relevance", "trust", "stars", "updated"])
        .optional()
        .describe("Sort order"),
    },
    async ({ query, limit, category, sort }) => {
      const data = await api.searchServers(query, { limit, category, sort });
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
  );

  // ── list_servers ─────────────────────────────────────────
  server.tool(
    "list_servers",
    "Browse MCP servers with filtering and sorting. " +
      "Use for category browsing or top-N queries.",
    {
      limit: z.number().optional().default(20).describe("Max results"),
      offset: z.number().optional().default(0).describe("Pagination offset"),
      category: z.string().optional().describe("Filter by category"),
      sort: z
        .enum(["trust", "stars", "updated", "downloads"])
        .optional()
        .default("trust")
        .describe("Sort order"),
    },
    async ({ limit, offset, category, sort }) => {
      const data = await api.listServers({ limit, offset, category, sort });
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
  );

  // ── get_server ───────────────────────────────────────────
  server.tool(
    "get_server",
    "Get full details for a specific MCP server including tools, " +
      "trust breakdown, install commands, and framework compatibility.",
    {
      server_id: z.string().uuid().describe("Server UUID"),
    },
    async ({ server_id }) => {
      const data = await api.getServer(server_id);
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
  );

  // ── get_server_vulnerabilities ───────────────────────────
  server.tool(
    "get_server_vulnerabilities",
    "Check known CVE/GHSA vulnerabilities for an MCP server's dependencies.",
    {
      server_id: z.string().uuid().describe("Server UUID"),
    },
    async ({ server_id }) => {
      const data = await api.getServerVulnerabilities(server_id);
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
  );

  // ── discover ─────────────────────────────────────────────
  server.tool(
    "discover",
    "Find the best MCP server or AI agent for a task. " +
      "Returns top recommendations with reasoning.",
    {
      query: z.string().describe("Describe what you need, e.g. 'send emails via Gmail'"),
      limit: z.number().optional().default(5).describe("Max results"),
      budget: z.number().optional().describe("Max monthly price in USD"),
    },
    async ({ query, limit, budget }) => {
      const data = await api.discover(query, { limit, budget });
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
  );

  // ── get_catalog_stats ────────────────────────────────────
  server.tool(
    "get_catalog_stats",
    "Get aggregate statistics: total servers, agents, categories, " +
      "sources, and health metrics.",
    {},
    async () => {
      const data = await api.getStats();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
  );

  return server;
}
