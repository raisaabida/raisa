import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  email: String,
  amount: Number,
  transactionId: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Payment", paymentSchema);
