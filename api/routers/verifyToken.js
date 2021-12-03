
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => { 
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            success: false,
            message: 'Access token not found',
        })
    }else{
        try {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return  res.status(403).json({
                        success: false,
                        message: 'Token is not valid!'
                    });
                }
                
                req.user = user;
                next();
            });
        } catch (error) {
            console.log('error',error);
            return res.status(403).json({
                success: false,
                message: 'Invalid token',
            })
        }
    }
}


const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: "You are not alowed to do that!"
            });
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: "You are not alowed to do that!"
            });
        }
    });
  };
  

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }