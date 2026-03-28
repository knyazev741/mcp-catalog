#!/usr/bin/env node

/**
 * CLI entry point for the MCP Catalog server.
 * Connects to the knyazevai.work API and exposes tools via MCP protocol.
 */

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "../src/server.mjs";

const server = createServer();
const transport = new StdioServerTransport();
await server.connect(transport);
