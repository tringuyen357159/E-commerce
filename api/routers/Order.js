const Order = require("../models/Order");
const express = require('express');
const router = express.Router(); 
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken");

//CREATE
router.post("/create", verifyToken, async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const order = await newOrder.save();

        return res.status(200).json({
            success: true,
            message: "Order successfully",
            order
        })
    } catch (error) {
        console.log('error',error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

//UPDATE
router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if(updatedOrder) {
            return res.status(200).json({
                success: true,
                message: "Update order successfully",
                updatedOrder
            });
        }else{
            return res.status(401).json({
                success: false,
                message: 'Order is not found',
            })
        }
    } catch (error) {
        console.log('error',error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});

//DELETE
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deleteOrder = await Order.findByIdAndDelete(req.params.id);
      
        if(deleteOrder) {
            return res.status(200).json({
                success: true,
                message: "Delete order successfully"
            })
        }else{
            return res.status(401).json({
                success: false,
                message: 'Order is not found',
            })
        }
    } catch (err) {
        console.log('error',err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});

//FIND
router.get("/find/:userId",verifyTokenAndAuthorization ,async (req, res) => {
    try {
        const orders = await Order.find({userId: req.params.userId});

        if(orders) {
            return res.status(200).json({
                success: true,
                orders
            })
        }else{
            return res.status(401).json({
                success: false,
                message: 'Order is not found',
            })
        }
    } catch (err) {
        console.log('error',err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});

//GET ALL
router.get("/getAll", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        if(orders) {
            return res.status(200).json({
                success: true,
                orders
            })
        }else{
            return res.status(401).json({
                success: false,
                message: 'Orders is not found',
            })
        }
    } catch (err) {
        console.log('error',err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));//10
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));//9

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$amount",
            },
            },
            {
            $group: {
                _id: "$month",
                total: { $sum: "$sales" },
            },
            },
        ]);
        if(income) {
            return res.status(200).json({
                success: true,
                income
            })
        }
    } catch (err) {
        console.log('error',err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});
  

module.exports = router;