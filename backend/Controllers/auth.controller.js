const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const generateToken = require('../utils/generateToken.js');

const register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    if (password !== confirmPassword) {
        return res.status(409).json({ message: "Passwords do not match!" });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long!" });
    }

    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPassword.test(password)) {
        return res.status(400).json({
            message: "Password must include uppercase, lowercase, number, and special character!"
        });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = await User.create({
        username,
        email,
        password: hashedPassword
    });

    newUser = await User.findById(newUser._id).select("-password");
    const token = generateToken(newUser._id);

    res.cookie("token", token, {
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "None"
    });

    return res.status(201).json(newUser);
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required!" });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: "User does not exist!" });
        }
         console.log("🧪 Login attempt:", password);
         console.log("🔐 Hashed password:", existingUser.password);

        const isMatch = await bcrypt.compare(password, existingUser.password);
       

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        const loggedInUser = await User.findById(existingUser._id).select("-password");
        const token = generateToken(loggedInUser._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/"
        });

        return res.status(200).json(loggedInUser);

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/"
        });

        return res.status(200).json({ message: "Logged out successfully!" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { register, login, logout };
