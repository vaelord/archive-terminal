const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };

function allowedOrigins(env) {
  return new Set(String(env.FRONTEND_ORIGINS || "https://etherarchive.xyz,https://www.etherarchive.xyz,http://localhost:5173")
    .split(",").map((origin) => origin.trim()).filter(Boolean));
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  const headers = { ...JSON_HEADERS, "Vary": "Origin", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" };
  if (origin && allowedOrigins(env).has(origin)) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

function json(request, env, data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders(request, env) });
}

function validUsername(value) {
  return typeof value === "string" && /^[A-Za-z0-9_]{1,15}$/.test(value);
}

function validWallet(value) {
  return typeof value === "string" && /^0x[a-fA-F0-9]{40}$/.test(value);
}

function validTasks(tasks) {
  return tasks && tasks.follow === true && tasks.like === true && tasks.repost === true && tasks.quote === true && tasks.reply === true;
}

function makeSerial() {
  return `EA-WL-${crypto.randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
}

function isUniqueConstraint(error) {
  return /UNIQUE constraint failed/i.test(String(error?.message || error));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    if (origin && !allowedOrigins(env).has(origin)) {
      return new Response(JSON.stringify({ error: "Origin is not allowed." }), { status: 403, headers: JSON_HEADERS });
    }

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    if (request.method === "GET" && url.pathname === "/health") return json(request, env, { ok: true, service: "ether-archive-wl-api" });
    if (request.method !== "POST" || url.pathname !== "/api/wl/submit") return json(request, env, { error: "Not found." }, 404);

    const contentType = request.headers.get("Content-Type") || "";
    if (!contentType.toLowerCase().includes("application/json")) return json(request, env, { error: "Content-Type must be application/json." }, 415);
    const contentLength = Number(request.headers.get("Content-Length") || 0);
    if (contentLength > 10000) return json(request, env, { error: "Request is too large." }, 413);

    let body;
    try { body = await request.json(); }
    catch { return json(request, env, { error: "Request body must be valid JSON." }, 400); }

    if (!body || typeof body !== "object" || Array.isArray(body)) return json(request, env, { error: "Request body must be a JSON object." }, 400);
    const username = typeof body.username === "string" ? body.username.trim().replace(/^@/, "") : "";
    const wallet = typeof body.wallet === "string" ? body.wallet.trim().toLowerCase() : "";
    if (!validUsername(username)) return json(request, env, { error: "Enter a valid X username (letters, numbers and underscores; max 15 characters)." }, 400);
    if (!validWallet(wallet)) return json(request, env, { error: "Enter a valid Ethereum wallet address." }, 400);
    if (!validTasks(body.tasks)) return json(request, env, { error: "Complete all campaign steps before submitting." }, 400);

    const createdAt = new Date().toISOString();
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const serial = makeSerial();
      try {
        await env.DB.prepare(`
          INSERT INTO wl_entries
            (x_username, wallet_address, task_follow, task_like, task_repost, task_quote, task_reply, ticket_serial, created_at)
          VALUES (?, ?, 1, 1, 1, 1, 1, ?, ?)
        `).bind(username, wallet, serial, createdAt).run();
        return json(request, env, { success: true, ticket: { serial, username, createdAt } }, 201);
      } catch (error) {
        const message = String(error?.message || error);
        if (isUniqueConstraint(error)) {
          if (/wl_entries\.wallet_address/i.test(message)) return json(request, env, { error: "This wallet has already submitted a WL entry." }, 409);
          if (/wl_entries\.x_username/i.test(message)) return json(request, env, { error: "This X username has already submitted a WL entry." }, 409);
          if (/wl_entries\.ticket_serial/i.test(message) && attempt < 3) continue;
        }
        console.error("WL submission failed", { error: message });
        return json(request, env, { error: "Could not save your entry. Please try again later." }, 500);
      }
    }
    return json(request, env, { error: "Could not generate a unique ticket. Please try again." }, 500);
  }
};
