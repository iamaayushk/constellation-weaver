const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); 
require('dotenv').config();

exports.Auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || 
                      req.body.token || 
                      req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log("Decoded Token:", decoded);

            // Attach user data to request object
            req.user = decoded;
            next(); // Proceed to next middleware
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
