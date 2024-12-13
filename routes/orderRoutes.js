import express from 'express';
import { createOrder, getUserOrders} from '../controllers/orderController.js'
import { authenticateToken } from "../middlewares/authMiddleware.js"; 
const orderRouter = express.Router();

orderRouter.post('/create',createOrder);
orderRouter.get('/my-orders', authenticateToken, getUserOrders); 


export default orderRouter;
