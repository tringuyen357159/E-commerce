const express = require('express');
const router = express.Router(); 
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register
router.post('/register', async (req, res) => {
    const {username, password, email} = req.body;

    if(!username || !password || !email) {
        return res.status(400).json({
            success: false,
            message: 'Missing Username or Password or Email',
        })
    }else{
        try {
            const user = await User.findOne({ email: email });
            if(user){
                return res.status(400).json({
                    success: false,
                    message: 'Email is already',
                })
            }

            const hashPassword = await CryptoJS.AES.encrypt(password, process.env.PASSWROD_SECRET).toString();
            const newUser = new User({
                username: username,
                email: email,
                password: hashPassword
            })
            await newUser.save();

            return res.status(200).json({
                success: true,
                message: 'Register successfully',
                newUser
            })

        } catch (error) {
            console.log('error',error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }
})

//login
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing Username or Password',
        })
    }else{
        try {
            const user = await User.findOne({ email: email });
            if(!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect email or password',
                })
            }else{
                const hashedPassword = CryptoJS.AES.decrypt(
                    user.password,
                    process.env.PASSWROD_SECRET
                ).toString(CryptoJS.enc.Utf8);
                    
                if(hashedPassword !== password) {
                    return res.status(400).json({
                        success: false,
                        message: 'Incorrect username or password',
                    })
                }else{
                    const accessToken = jwt.sign(
                        { id: user._id, isAdmin: user.isAdmin },
                        process.env.JWT_SECRET,
                        { expiresIn: "3d" }
                    );

                    const { password, ...others } = user._doc;  

                    return res.status(200).json({
                        success: true,
                        message: 'Login successfully',
                        accessToken,
                        ...others
                    })
                }
            }

        } catch (error) {
            console.log('error',error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }
})

module.exports = router;