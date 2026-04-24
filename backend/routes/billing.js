import "../config.js";
import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_KEY);

router.post("/checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_123",
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Billing error:", err.message);
    res.status(500).json({ error: "Unable to create checkout session." });
  }
});

export default router;
