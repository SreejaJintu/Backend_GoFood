import express from 'express';
import { createOrder,getUserOrders} from '../controllers/orderController1.js'
import { authenticateToken } from "../middlewares/authMiddleware.js"; 
const orderRouter = express.Router();

orderRouter.post('/create', authenticateToken,createOrder);
orderRouter.get('/my-orders', authenticateToken, getUserOrders);


export default orderRouter;
