import Stripe from 'stripe'; 

const stripe = new Stripe('sk_test_51QTRAELEKPpFnzksfYyTwdBcSxQq5EwTrRIVCm9dSOSAwPTCaHaUWPgPyJBHgLsPOXQhHkBryilrQnu1ug38W8V000FYXL0MNU', {
  apiVersion: '2022-11-15', 
})

const paymentdata=async (req, res) => {
    const { amount } = req.body;
  
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, 
            currency: 'usd', 
            payment_method_types: ['card'],
            payment_method_options: {
              card: {
                request_three_d_secure: 'automatic',
              },
            },
          });
          
  
      res.status(200).json(paymentIntent.client_secret);
    } catch (error) {
      console.error('Error creating payment intent:', error.message);
      res.status(500).json({ error: error.message });
    }
  };

  export default paymentdata;