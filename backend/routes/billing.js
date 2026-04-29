import "../config.js";
import express from "express";
import Stripe from "stripe";
import { frontendUrl, getEnv } from "../config.js";

const router = express.Router();

const STRIPE_PRICE_ID = getEnv("STRIPE_PRICE_ID");
const STRIPE_SECRET_KEY = getEnv("STRIPE_SECRET_KEY", "STRIPE_KEY");

const getStripe = () => {
  if (!STRIPE_SECRET_KEY) return null;
  return new Stripe(STRIPE_SECRET_KEY);
};

router.post("/checkout", async (req, res) => {
  try {
    const stripe = getStripe();
    if (!stripe || !STRIPE_PRICE_ID) {
      console.error("Stripe billing is not fully configured");
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
      success_url: `${frontendUrl()}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl()}/`,
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
    const stripe = getStripe();
    if (!stripe) {
      return res.status(500).json({ error: "Billing is not configured. Contact support." });
    }

    const session = await stripe.checkout.sessions.retrieve(req.params.id);
    res.json({ status: session.payment_status, customer: session.customer_email });
  } catch (err) {
    console.error("Session retrieve error:", err.message);
    res.status(500).json({ error: "Unable to verify session." });
  }
});

export default router;
