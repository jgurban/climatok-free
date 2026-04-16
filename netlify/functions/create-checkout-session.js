const Stripe = require("stripe");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { plan } = JSON.parse(event.body || "{}");
    console.log("[create-checkout] plan=", plan);

    const priceId =
      plan === "monthly" ? process.env.PRICE_MONTHLY :
      plan === "yearly"  ? process.env.PRICE_YEARLY  :
      null;

      console.log("[create-checkout] priceId=", priceId ? "set" : "MISSING", "baseUrl=", process.env.BASE_URL || "https://climatok.net");

    if (!priceId) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid plan" }) };
    }

    const baseUrl = process.env.BASE_URL || "https://climatok.net";
    const successUrl = `${baseUrl}/app/?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl  = `${baseUrl}/app/`;

    const session = await stripe.checkout.sessions.create({
  mode: "subscription",
  line_items: [{ price: priceId, quantity: 1 }],
  success_url: successUrl,
  cancel_url: cancelUrl,
  billing_address_collection: "auto",

  subscription_data: {
    trial_period_days: 3
  }
});

    console.log("[create-checkout] session created id=", session.id);


    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url })
    };
  } catch (err) {
    console.error("[create-checkout] ERROR:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    
  }
};