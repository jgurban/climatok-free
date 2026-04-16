const Stripe = require("stripe");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { customerId } = JSON.parse(event.body || "{}");
    console.log("[create-portal] customerId=", customerId, "config=", process.env.STRIPE_PORTAL_CONFIG_ID ? "set" : "MISSING");

    if (!customerId || !String(customerId).startsWith("cus_")) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing/invalid customerId" }) };
    }

    const returnUrl = (process.env.BASE_URL || "https://climatok.net") + "/app/";

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
      configuration: process.env.STRIPE_PORTAL_CONFIG_ID
    });

    console.log("[create-portal] portal session created");

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url })
    };
  } catch (err) {
    console.error("[create-portal] ERROR:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
