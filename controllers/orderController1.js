import Stripe from "stripe";
import dotenv from "dotenv";
import {orderModel} from '../models/Orders.js';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createOrder = async (req, res) => {
  console.log("Request Body:", req.body);
  console.log('Authenticated User:', req.user);

  const { userId, items, totalAmount } = req.body;

  if (!userId || !items || totalAmount == null) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  try {
    const order = new orderModel({
      userId,
      items,
      totalAmount,
      date: new Date(),
      status: "Pending",
    });
    const savedOrder = await order.save();

    const paymentIntent = await stripe.paymentIntents.create({
      amount:  Number(totalAmount).toFixed(2) * 100,  
      currency: "usd", 
      metadata: { orderId: savedOrder._id.toString() },
    });

   return res.status(201).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      orderId: savedOrder._id,
      userId
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: error.message  });
  }
};
export { createOrder };
export const getUserOrders = async (req, res) => {
  try {

    console.log('Authenticated User:', req.user);
    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    // if (!req.user || !req.user.id) {
    //   return res.status(400).json({ success: false, message: "User not authenticated" });
    // }
    

    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

