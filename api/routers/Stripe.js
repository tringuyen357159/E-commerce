const express = require('express');
const router = express.Router(); 
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

router.post("/payment", (req, res) => {
    stripe.charges.create( //tạo tính phí
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                return res.status(500).json({
                    success: false,
                    message: stripeErr
                })
            } else {
                return res.status(200).json({
                    success: true,
                    message: "Payment successfully",
                    stripeRes
                })
            }
        }
    );
});
  
module.exports = router;