const Product = require("../models/Product");
const express = require('express');
const router = express.Router(); 
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken");

//CREATE
router.post("/create", verifyTokenAndAdmin, async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const product = await newProduct.save();

        return res.status(200).json({
            success: true,
            message: "Create product successfully",
            product
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
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if(updatedProduct) {
            return res.status(200).json({
                success: true,
                message: "Update product successfully",
                updatedProduct
            });
        }else{
            return res.status(401).json({
                success: false,
                message: 'Product is not found',
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
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
      
        if(deleteProduct) {
            return res.status(200).json({
                success: true,
                message: "Delete product successfully"
            })
        }else{
            return res.status(401).json({
                success: false,
                message: 'Product is not found',
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
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(product) {
            return res.status(200).json({
                success: true,
                product
            })
        }else{
            return res.status(401).json({
                success: false,
                message: 'Product is not found',
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
router.get("/findAll", async (req, res) => {
    try {
        let products;
        const qNew = req.query.new;
        const qCategory = req.query.category;  
    
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                }
            });
        } else {
            products = await Product.find();
        }

        if(products) {
            return res.status(200).json({
                success: true,
                products
            })
        }else{
            return res.status(401).json({
                success: false,
                message: 'Products is not found',
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