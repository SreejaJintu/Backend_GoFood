import express from "express";
import Coupon from "../models/Coupon.js";

const router = express.Router();

// Create a new coupon
router.post("/create", async (req, res) => {
  const { code, discountType, discountValue, expiryDate, minOrderAmount, maxDiscountAmount } = req.body;
  try {
    const newCoupon = await Coupon.create({ code, discountType, discountValue, expiryDate, minOrderAmount, maxDiscountAmount });
    res.status(201).json({ message: "Coupon created successfully", coupon: newCoupon });
  } catch (error) {
    res.status(500).json({ message: "Error creating coupon", error });
  }
});

// Apply a coupon
router.post("/apply", async (req, res) => {
  const { code, orderAmount } = req.body;

  try {
    const coupon = await Coupon.findOne({ code, isActive: true, expiryDate: { $gte: new Date() } });

    if (!coupon) {
      return res.status(400).json({ message: "Invalid or expired coupon" });
    }

    if (orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({ message: `Minimum order amount is ${coupon.minOrderAmount}` });
    }

    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = Math.min((orderAmount * coupon.discountValue) / 100, coupon.maxDiscountAmount || Infinity);
    } else {
      discount = Math.min(coupon.discountValue, coupon.maxDiscountAmount || Infinity);
    }

    res.json({
      message: "Coupon applied successfully",
      discountAmount: discount,
      finalAmount: orderAmount - discount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error applying coupon", error });
  }
});

export default router;
