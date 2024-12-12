import {orderModel} from '../models/Orders.js';
import Stripe from "stripe"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const createOrder = async (req, res) => {
  console.log('Request Body:', req.body);

  const { userId, items, totalAmount } = req.body;

  // Validate the request data
  if (!userId || !items || totalAmount == null) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  try {
    // Create a new order using the Mongoose model
    const order = new orderModel({
      userId,// Assuming this contains the user's ID or relevant user data
      items,          // Array of items
      totalAmount,    // Total amount of the order
      date: new Date(), // Order creation date
      status: 'Pending',

    });

    // Save the order to the database
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order', error });
  }
};

export { createOrder };

  export const getUserOrders = async (req, res) => {
    try {
      const userId = req.user.userId; 
      const orders = await orderModel.find({ userId }).sort({ createdAt: -1 }); // Get user's orders sorted by latest
      res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
  };
