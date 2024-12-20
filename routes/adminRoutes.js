import express from 'express';
import {orderModel} from '../models/Orders.js';

const router = express.Router();

// Get all orders (admin only)
router.get('/orders', async (req, res) => {
  try {
    const ordersData = await orderModel.find({});
    res.json(ordersData);
  } catch (error) {
    res.status(500).send("Server error");
  }
});



router.put('/orders/:id',async (req, res) => {
  const { status } = req.body;
  try {
    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
});

export default router;
