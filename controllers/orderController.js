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
