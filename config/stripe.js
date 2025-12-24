import Stripe from "stripe";

let stripe = null;


if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes("xxxxxxxxx")) {
  try {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  } catch (error) {
    console.warn("Failed to initialize Stripe:", error.message);
  }
}

export default stripe;
