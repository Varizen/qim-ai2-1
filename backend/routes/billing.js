import "../config.js";
import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID;

router.post("/checkout", async (req, res) => {
  try {
    if (!STRIPE_PRICE_ID) {
      console.error("STRIPE_PRICE_ID is not configured");
      return res.status(500).json({ error: "Billing is not configured. Contact support." });
    }

    const { email } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/`,
      customer_email: email || undefined,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Billing error:", err.message);
    res.status(500).json({ error: "Unable to create checkout session." });
  }
});

// Verify checkout session
router.get("/session/:id", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id);
    res.json({ status: session.payment_status, customer: session.customer_email });
  } catch (err) {
    console.error("Session retrieve error:", err.message);
    res.status(500).json({ error: "Unable to verify session." });
  }
});

export default router;
