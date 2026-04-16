const Stripe = require("stripe");

async function upstashSet(key, valueObj) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  const res = await fetch(`${url}/set/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(valueObj),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Upstash SET failed: ${res.status} ${t}`);
  }
}

function entitlementKey(customerId) {
  return `climatok:entitlement:${customerId}`;
}

// Regla premium: activo o trial y no expirado
function computePremium(status, currentPeriodEnd, nowSec) {
  const cpe = Number(currentPeriodEnd || 0);
  const statusOk = status === "active" || status === "trialing";
  return statusOk && cpe > nowSec;
}

async function writeEntitlement(customerId, payload) {
  const now = Math.floor(Date.now() / 1000);
  await upstashSet(entitlementKey(customerId), {
    customerId,
    ...payload,
    updatedAt: now,
  });
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = event.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let stripeEvent;
    try {
      stripeEvent = stripe.webhooks.constructEvent(event.body, sig, webhookSecret);
      console.log("[stripe-webhook] type=", stripeEvent.type);
    } catch (err) {
      return { statusCode: 400, body: `Webhook signature verification failed: ${err.message}` };
    }

    const now = Math.floor(Date.now() / 1000);

    // 1) Primera compra completada
    if (stripeEvent.type === "checkout.session.completed") {
      const session = stripeEvent.data.object;
      const subscriptionId = session.subscription;
      const customerId = session.customer;
      console.log("[stripe-webhook] checkout completed customer=", customerId, "subscription=", subscriptionId);
      const customerEmail = session.customer_details?.email || session.customer_email || null;

      if (!customerId || !subscriptionId) {
        return { statusCode: 200, body: "Missing customer/subscription; ignored" };
      }

      const sub = await stripe.subscriptions.retrieve(subscriptionId);
      console.log("[stripe-webhook] sub status=", sub.status, "current_period_end=", sub.current_period_end, "cancel_at_period_end=", sub.cancel_at_period_end);
      const premiumUntil = Number(sub.current_period_end || 0);
      const premium = computePremium(sub.status, sub.current_period_end, now);

      await writeEntitlement(customerId, {
        premium,
        premiumUntil,
        subscriptionId: sub.id,
        status: sub.status,
        cancelAtPeriodEnd: !!sub.cancel_at_period_end,
        customerEmail,
      });

      return { statusCode: 200, body: "ok" };
    }

    // 2) Suscripción actualizada (cancelación programada, renovación, cambio estado…)
    if (stripeEvent.type === "customer.subscription.updated") {
      const sub = stripeEvent.data.object;
      const customerId = sub.customer;
      console.log("[stripe-webhook] subscription updated customer=", customerId, "sub=", sub.id, "status=", sub.status, "cpe=", sub.current_period_end, "cancelAtPeriodEnd=", sub.cancel_at_period_end);
      const premiumUntil = Number(sub.current_period_end || 0);
      const premium = computePremium(sub.status, sub.current_period_end, now);

      await writeEntitlement(customerId, {
        premium,
        premiumUntil,
        subscriptionId: sub.id,
        status: sub.status,
        cancelAtPeriodEnd: !!sub.cancel_at_period_end,
      });

      return { statusCode: 200, body: "ok" };
    }

    // 3) Suscripción eliminada (cancelación efectiva)
    if (stripeEvent.type === "customer.subscription.deleted") {
      const sub = stripeEvent.data.object;
      const customerId = sub.customer;
      console.log("[stripe-webhook] subscription deleted customer=", customerId, "sub=", sub.id);
      await writeEntitlement(customerId, {
        premium: false,
        premiumUntil: now,
        subscriptionId: sub.id,
        status: sub.status,
        cancelAtPeriodEnd: !!sub.cancel_at_period_end,
      });

      return { statusCode: 200, body: "ok" };
    }

    // 4) Pago fallido (recomendado)
    if (stripeEvent.type === "invoice.payment_failed") {
      const invoice = stripeEvent.data.object;
      const customerId = invoice.customer;
      const subscriptionId = invoice.subscription;
      console.log("[stripe-webhook] invoice.payment_failed customer=", customerId, "subscription=", subscriptionId, "invoice=", invoice.id);
      // Conservador: consulta la suscripción si existe; si no, revoca
      if (customerId && subscriptionId) {
        try {
          const sub = await stripe.subscriptions.retrieve(subscriptionId);
          const premiumUntil = Number(sub.current_period_end || 0);
          const premium = computePremium(sub.status, sub.current_period_end, now);

          await writeEntitlement(customerId, {
            premium,
            premiumUntil,
            subscriptionId: sub.id,
            status: sub.status,
            cancelAtPeriodEnd: !!sub.cancel_at_period_end,
            lastInvoiceId: invoice.id,
          });

          return { statusCode: 200, body: "ok" };
        } catch (_) {
          console.error("[stripe-webhook] ERROR:", err);
          // fallthrough -> revoke
        }
      }

      if (customerId) {
        await writeEntitlement(customerId, {
          premium: false,
          premiumUntil: now,
          subscriptionId: subscriptionId || null,
          status: "payment_failed",
          lastInvoiceId: invoice.id,
        });
      }

      return { statusCode: 200, body: "ok" };
    }

    return { statusCode: 200, body: "ignored" };
  } catch (err) {
    return { statusCode: 500, body: `Webhook handler error: ${err.message}` };
  }
};