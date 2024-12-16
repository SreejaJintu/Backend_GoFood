import {orderModel} from '../models/Orders.js';
import Stripe from "stripe"
import mongoose from "mongoose";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const createOrder = async (req, res) => {
  console.log('Request Body:', req.body);

  const { userId, items, totalAmount } = req.body;

  // Validate the request data
  if (!userId || !items || totalAmount == null) {
    return res.status(400).json({ error: "Invalid order data" });
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid or missing userId' });
  }

  try {
    const order = new orderModel({
      userId,
      items,         
      totalAmount,    
      date: new Date(), 
      status: 'Pending',

    });

    const savedOrder = await order.save();

     return res.status(201).json(savedOrder);

      // Step 2: Create a PaymentIntent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmount * 100), // Stripe expects the amount in cents
        currency: "usd", // Change to your preferred currency
        metadata: { orderId: savedOrder._id.toString() },
      });
  
       return res.status(201).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
        orderId: savedOrder._id,
      });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order', error });
  }
};

export { createOrder };

  export const getUserOrders = async (req, res) => {
    try {
      const userId = req.user.userId; 
      const orders = await orderModel.find({ userId }).sort({ createdAt: -1 }); 
      res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
  };
