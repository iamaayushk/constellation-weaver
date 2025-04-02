const User = require('../models/user');
const Constellation= require('../models/constellation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
        } catch (error) {
            console.error("Error in password hashing:", error);
            return res.status(500).json({
                success: false,
                message: "Error hashing password",
            });
        }

        const createUser = await User.create({
            name,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/9.x/initials/svg?seed=${name}`,
        });

        console.log(createUser);

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: createUser,
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        // Find user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // let secretkey = process.env.secretkey;
        // compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const secretKey = process.env.JWT_SECRET_KEY;
        let token = jwt.sign({ _id: user._id, email: user.email }, secretKey, { expiresIn: "1h" });

        res.cookie("token", token); 
        // sending response
        res.status(200).json({ message: "Login successful", token });
        console.log("succesfully login");
        

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.logout = async (req, res) => {
    try {
        if (!req.cookies.token) {
            return res.json("Not login");
        }

        jwt.verify(req.cookies.token, "mysecretkey");

        res.clearCookie('token');
        return res.json("Logout succes")
    } catch (error) {
        console.error("Logout error:", error.message);
        res.clearCookie('token');
        return res.json("err");
    }
};





