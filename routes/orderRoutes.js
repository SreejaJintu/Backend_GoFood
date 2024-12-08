import express from 'express';
import { getOrders, getUserOrders} from '../controllers/orderController.js'
import authenticate from '../middlewares/userAuth.js';
const orderRouter = express.Router();

orderRouter.post('/orders',authenticate,getOrders)
orderRouter.get('/my-orders', authenticate, getUserOrders); 


export default orderRouter;
