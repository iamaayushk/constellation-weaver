const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); 
require('dotenv').config();

exports.Auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || 
                      req.body.token || 
                      req.header("Authorization")?.replace("Bearer ", "");
                      console.log("Received Token:", token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        try {
          
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log("Decoded Token:", decoded);

            
            // req.user = decoded;
            req.user = { userId: decoded.userId || decoded.id || decoded._id };

            next(); 
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid or expired",
            });
        }
    } catch (error) {
        console.error("Authentication Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
};

module.exports = exports.Auth;
