import express from 'express';
import { getAllOrders, updateOrderStatus } from '../controllers/adminController.js';
import { isAdmin } from '../middlewares/userAuth.js';

const router = express.Router();

router.get('/orders', isAdmin, getAllOrders);
router.get('/users', isAdmin, getAllUsers);
router.put('/orders/:id', isAdmin, updateOrderStatus);

// Add more routes for managing users, food items
export default router;
