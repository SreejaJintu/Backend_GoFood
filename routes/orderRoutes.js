import express from 'express';
import { createOrder,getUserOrders} from '../controllers/orderController1.js'
// import { authenticateToken } from "../middlewares/authMiddleware.js"; 
const orderRouter = express.Router();

orderRouter.post('/create',createOrder);
orderRouter.get('/my-orders', getUserOrders); 


export default orderRouter;
