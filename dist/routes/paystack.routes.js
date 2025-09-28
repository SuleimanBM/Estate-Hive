import express from 'express';
import axios from 'axios';
const router = express.Router();
router.post('/initialize', async (req, res) => {
    const { email, amount } = req.body;
    try {
        const response = await axios.post('https://api.paystack.co/transaction/initialize', {
            email,
            amount: amount * 100 // Paystack uses Pesewas (so ₵10 = 1000)
        }, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            }
        });
        res.status(200).json({ authorization_url: response.data.data.authorization_url });
    }
    catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: 'Payment initialization failed' });
    }
});
export default router;
// The route name is /paystack/initialize
// This route initializes a payment transaction with Paystack
// It expects an email and amount in the request body
//# sourceMappingURL=paystack.routes.js.map