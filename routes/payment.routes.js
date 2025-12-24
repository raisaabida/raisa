import express from "express";
import stripe from "../config/stripe.js";
import Payment from "../models/payment.js";

const router = express.Router();


router.post("/create-intent", async (req, res) => {
  try {
    const { amount } = req.body;


    if (!stripe) {
      return res.status(503).json({ 
        error: "Payment service is not configured. Please set a valid STRIPE_SECRET_KEY in environment variables." 
      });
    }
    

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/save", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.send({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get user payments
router.get("/:email", async (req, res) => {
  try {
    const payments = await Payment.find({ email: req.params.email });
    res.send(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
