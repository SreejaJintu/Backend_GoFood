import { orderModel } from "../models/Orders.js";
import Stripe from "stripe"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const getOrders= async (req, res) => {

  console.log('Request Body:', req.body);

    const { items, totalAmount } = req.body;
    const userId = req.user.userId; // Extracted from the JWT middleware

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order items cannot be empty' });
    }
  
    try {
      const order = new orderModel({
        userId,
        items,
        totalAmount,
      });
  
      const savedOrder = await order.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create order', error });
    }
  };
  export { getOrders };
  export const getUserOrders = async (req, res) => {
    try {
      const userId = req.user.userId; // Extract user ID from the authenticated request
      const orders = await orderModel.find({ userId }).sort({ createdAt: -1 }); // Get user's orders sorted by latest
      res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
  };
