const Cart = require("../models/Cart");
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
        const newCart = new Cart(req.body);
        const cart = await newCart.save();

        return res.status(200).json({
            success: true,
            message: "Create cart successfully",
            cart
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
router.put("/update/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if(updatedCart) {
            return res.status(200).json({
                success: true,
                message: "Update cart successfully",
                updatedCart
            });
        }else{
            return res.status(401).json({
                success: false,
                message: 'Cart is not found',
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
router.delete("/delete/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deleteCart = await Cart.findByIdAndDelete(req.params.id);
      
        if(deleteCart) {
            return res.status(200).json({
                success: true,
                message: "Delete cart successfully"
            })
        }else{
            return res.status(401).json({
                success: false,
                message: 'Cart is not found',
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
        const cart = await Cart.findOne({userId: req.params.userId});

        if(cart) {
            return res.status(200).json({
                success: true,
                cart
            })
        }else{
            return res.status(401).json({
                success: false,
                message: 'Cart is not found',
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
router.get("/findAll", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        if(carts) {
            return res.status(200).json({
                success: true,
                carts
            })
        }else{
            return res.status(401).json({
                success: false,
                message: 'Carts is not found',
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