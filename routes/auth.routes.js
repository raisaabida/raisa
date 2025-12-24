import express from "express";
import admin from "../config/firebaseAdmin.js";

const router = express.Router();

/**
 * @route POST /api/auth/verify-token
 * @desc Verify Firebase ID token (frontend sends token)
 */
router.post("/verify-token", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    return res.json({
      success: true,
      message: "Token verified",
      user: decoded,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: err.message,
    });
  }
});

export default router;
