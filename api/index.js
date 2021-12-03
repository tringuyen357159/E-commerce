const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const authRoute = require('./routers/Auth')
const userRoute = require('./routers/User')
const productRoute = require('./routers/Product')
const cartRoute = require('./routers/Cart')
const orderRoute = require('./routers/Order')
const paymentRoute = require('./routers/Stripe')
const cors = require('cors');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MOGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('connect mogodb success');
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
app.use('/api/checkout', paymentRoute);

connectDB();


const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`Backend is running port ${PORT}`);
})

