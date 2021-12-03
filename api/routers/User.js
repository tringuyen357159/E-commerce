const User = require("../models/User");
const express = require('express');
const router = express.Router(); 
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken");
const CryptoJS = require("crypto-js");


//UPDATE USER
router.put("/update/:id", verifyTokenAndAuthorization, async (req, res) => {
  const { username, password, email } = req.body;

  if(!username || !password || !email) {
    return res.status(400).json({
        success: false,
        message: 'Missing Username or Password or Email',
    })
  }else {
    try {
      const hashPassword = await CryptoJS.AES.encrypt(password, process.env.PASSWROD_SECRET).toString();

      let updateUser = {
        username: username,
        password: hashPassword,
        email: email,
      }

      const updatedUser = await User.findByIdAndUpdate(req.params.id, updateUser, { new: true });

      if(!updatedUser) {
        return res.status(401).json({
          success: false,
          message: "User is not found"
        });
      }else{
        return res.status(200).json({
          success: true,
          message: "Update user successfully",
          updatedUser
        });
      }
    } catch (error) {
      console.log('error',error);
      return res.status(500).json({
          success: false,
          message: 'Internal server error',
      })
    }
  }
});

//DELETE USER
router.delete("/delete/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const deteleUser = await User.findByIdAndDelete(req.params.id);
    if(!deteleUser) {
      return res.status(401).json({
        success: false,
        message: 'User is not found',
      })
    }else{
      return res.status(200).json({
        success: true,
        message: 'User delete successfully',
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

//FIND USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if(!user) {
      return res.status(401).json({
        success: false,
        message: 'User is not found',
      })
    }else{
      return res.status(200).json({
        success: true,
        user
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

//GET ALL USER
router.get("/getAll", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    if(!users) {
      return res.status(401).json({
        success: false,
        message: 'Users is not found',
      })
    }else{
      return res.status(200).json({
        success: true,
        users
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

//GET USER BY MONTH

router.get("/byMonth", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));//2020

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },// >2020
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    if(data) {
      return res.status(200).json({
        success: true,
        data
      })
    }
  } catch (err) {
    console.log('error',error);
    return res.status(500).json({
        success: false,
        message: 'Internal server error',
    })
  }
});

module.exports = router;