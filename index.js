import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import serviceRoutes from "./routes/service.routes.js";

dotenv.config();

const app = express();

/* Middleware */
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* DB */
connectDB();

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/services", serviceRoutes);

/* Health check */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "StyleDecor backend running 🚀",
  });
});

/* ✅ REQUIRED FOR VERCEL NODE PROJECT */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});