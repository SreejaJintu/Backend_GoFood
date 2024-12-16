import Stripe from 'stripe'; 
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15', 
});

const paymentdata = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), 
      currency: 'usd', 
      payment_method_types: ['card'],
    });
     return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
     return res.status(500).json({ error: error.message });
  }
};
export default paymentdata;

