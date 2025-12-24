import express from "express";
import Service from "../models/Service.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
});

/* =====================
   CREATE service
===================== */
router.post("/", async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({
      success: true,
      service,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create service",
    });
  }
});

/* =====================
   GET single service
===================== */
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false });
    }
    res.json({ success: true, service });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

/* =====================
   DELETE service
===================== */
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

export default router;