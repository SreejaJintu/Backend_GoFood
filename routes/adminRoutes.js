import express from 'express';
import {orderModel} from '../models/Orders.js';
import {userModel} from '../models/User.js';
import {reportModel} from '../models/Report.js';

const router = express.Router();

router.get('/orders', async (req, res) => {
  try {
    const ordersData = await orderModel.find({});
    res.json(ordersData);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.get('/users', async (req, res) => {
  try {
    const usersData = await userModel.find({});
    res.json(usersData);
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

router.get('/reports',async (req, res) => {
  try {
    const reports = await reportModel.find(); 
    console.log('Reports:', reports); 
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports.' });
  }
});

export default router;
