const Stripe = require("stripe");
const crypto = require("crypto");

function b64url(str) {
  return Buffer.from(str).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function signJWT(payload, secret) {
  const header = { alg: "HS256", typ: "JWT" };
  const encHeader = b64url(JSON.stringify(header));
  const encPayload = b64url(JSON.stringify(payload));
  const data = `${encHeader}.${encPayload}`;
  const sig = crypto.createHmac("sha256", secret).update(data).digest("base64")
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  return `${data}.${sig}`;
}

async function upstashGet(key) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Upstash GET failed: ${res.status} ${t}`);
  }

  const json = await res.json();
  if (!json.result) return null;

  try {
    return typeof json.result === "string" ? JSON.parse(json.result) : json.result;
  } catch {
    return json.result;
  }
}

exports.handler = async (event) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const jwtSecret = process.env.JWT_SECRET;

    const params = event.queryStringParameters || {};
    const sessionId = params.session_id || null;
    const customerIdParam = params.customer_id || null;
    console.log("[verify-entitlement] session_id=", sessionId ? "set" : "none", "customer_id=", customerIdParam || "none");
    let customerId = customerIdParam;

    if (sessionId) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      customerId = session.customer;
      console.log("[verify-entitlement] resolved customerId from session =", customerId);
    }

    if (!customerId) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing session_id or customer_id" }) };
    }

    const key = `climatok:entitlement:${customerId}`;
    const ent = await upstashGet(key);
    console.log("[verify-entitlement] ent found=", !!ent, "premiumUntil=", ent?.premiumUntil || 0, "entPremium=", !!ent?.premium);

    const now = Math.floor(Date.now() / 1000);
    const premiumUntil = ent?.premiumUntil || 0;
    const premium = !!ent?.premium && premiumUntil > now;

    const exp = premium ? premiumUntil : (now + 3600);
    const jwt = signJWT(
      { sub: customerId, premium, premiumUntil, exp, iat: now, iss: "climatok.net" },
      jwtSecret
    );

    console.log("[verify-entitlement] result premium=", premium, "customerId=", customerId);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ premium, premiumUntil, customerId, jwt })
    };
  } catch (err) {
    console.error("[verify-entitlement] ERROR:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};