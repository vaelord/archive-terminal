
const USERNAME_REGEX = /^[A-Za-z0-9_]{1,15}$/;
const WALLET_REGEX = /^0x[a-fA-F0-9]{40}$/;

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function allowedOrigins(env) {
  return String(env.FRONTEND_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function originAllowed(request, env) {
  const origin = request.headers.get("Origin");

  return Boolean(
    origin && allowedOrigins(env).includes(origin)
  );
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin");

  if (!origin || !allowedOrigins(env).includes(origin)) {
    return {};
  }

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

// Random 8-digit GTD ticket serial
function generateGtdSerial() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);

  const number = 10000000 + (array[0] % 90000000);

  return `GTD-${number}`;
}

async function createUniqueGtdSerial(env) {
  for (let attempt = 0; attempt < 10; attempt++) {
    const serial = generateGtdSerial();

    const existing = await env.DB.prepare(`
      SELECT id
      FROM gtd_applications
      WHERE gtd_serial = ?
      LIMIT 1
    `)
      .bind(serial)
      .first();

    if (!existing) {
      return serial;
    }
  }

  throw new Error("Could not generate a unique GTD ticket serial.");
}

async function submitApplication(request, env) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return json(
      { error: "Invalid request body." },
      400,
      corsHeaders(request, env)
    );
  }

  const xUsername = String(body.xUsername || "")
    .trim()
    .replace(/^@/, "");

  const walletAddress = String(body.walletAddress || "")
    .trim()
    .toLowerCase();

  if (!USERNAME_REGEX.test(xUsername)) {
    return json(
      {
        error: "Invalid X username. Use 1-15 letters, numbers or underscores.",
      },
      400,
      corsHeaders(request, env)
    );
  }

  if (!WALLET_REGEX.test(walletAddress)) {
    return json(
      { error: "Invalid Ethereum wallet address." },
      400,
      corsHeaders(request, env)
    );
  }

  try {
    const serial = await createUniqueGtdSerial(env);

    await env.DB.prepare(`
      INSERT INTO gtd_applications (
        x_username,
        wallet_address,
        gtd_serial
      )
      VALUES (?, ?, ?)
    `)
      .bind(xUsername, walletAddress, serial)
      .run();

    return json(
      {
        success: true,
        message: "GTD application submitted.",
        ticket: {
          serial,
          username: xUsername,
        },
      },
      201,
      corsHeaders(request, env)
    );

  } catch (error) {
    const message = String(error?.message || "").toLowerCase();

    if (
      message.includes("unique constraint") &&
      message.includes("wallet_address")
    ) {
      return json(
        {
          error: "This wallet address has already submitted a GTD application.",
        },
        409,
        corsHeaders(request, env)
      );
    }

    console.error("GTD application error:", error);

    return json(
      { error: "Could not save your GTD application." },
      500,
      corsHeaders(request, env)
    );
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (method === "OPTIONS") {
      if (!originAllowed(request, env)) {
        return new Response(null, { status: 403 });
      }

      return new Response(null, {
        status: 204,
        headers: corsHeaders(request, env),
      });
    }

    if (method === "GET" && path === "/api/gtd/health") {
      return json({
        success: true,
        service: "ether-archive-gtd-api",
      });
    }

    if (method === "POST" && path === "/api/gtd/submit") {
      if (!originAllowed(request, env)) {
        return json(
          { error: "Origin not allowed." },
          403
        );
      }

      return submitApplication(request, env);
    }

    return json(
      { error: "Not found." },
      404,
      corsHeaders(request, env)
    );
  },
};
