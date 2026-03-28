/**
 * MCP Catalog API client.
 * All data comes from the public knyazevai.work REST API.
 * No internal logic — this is a thin HTTP wrapper.
 */

const BASE = "https://knyazevai.work/api/v1";

async function request(path, params = {}) {
  const url = new URL(`${BASE}${path}`);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }
  const res = await fetch(url.toString(), {
    headers: { "User-Agent": "mcp-catalog-client/0.1.0" },
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

export async function searchServers(query, { limit = 10, category, sort } = {}) {
  return request("/servers/search", { q: query, limit, category, sort_by: sort });
}

export async function listServers({ limit = 20, offset = 0, category, sort, source } = {}) {
  return request("/servers", { limit, offset, category, sort_by: sort, source_registry: source });
}

export async function getServer(serverId) {
  return request(`/servers/${serverId}`);
}

export async function getServerVulnerabilities(serverId) {
  return request(`/servers/${serverId}/vulnerabilities`);
}

export async function discover(task, { limit = 5, budget } = {}) {
  return request("/discover", { task, limit, max_price: budget });
}

export async function getStats() {
  return request("/stats");
}
