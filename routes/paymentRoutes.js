import express from 'express';
 import paymentdata from '../controllers/paymentController.js'

const paymentRouter = express.Router();

paymentRouter.post('/create-payment-intent',paymentdata)

  
  


export default paymentRouter;

