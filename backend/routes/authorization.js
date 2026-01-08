import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Database from '../database.js';
import {validate } from "../middlewares/validationMiddleware.js";
import {body} from "express-validator";

const router = express.Router();
const JWT_SECRET = 'supersecretkey';

//register form
router.post('/register', [
    body("username")
        .notEmpty().withMessage("Name is required")
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),

    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
], validate, async (req, res) => {
    try{
        const {username, email, password} = req.body;

        const [exist] = await Database.query('SELECT * FROM users WHERE username = ?', [username]);
        if (exist.length > 0) return res.status(400).json({message: "Username already exists"});
        const hashedPass = await bcrypt.hash(password, 10);

        await Database.query('INSERT INTO users (username, email, password, description, profile_img, banner_img, is_admin, profile_font) VALUES (?,?,?,?,?,?,?,?)', [
            username,
            email,
            hashedPass,
            "No description",
            "assets\\Temp_Profile_Icon.png",
            "assets\\Temp_Profile_BG.png",
            0,
            1
        ]);
        res.json({message: "User registered successfully"});
    }
    catch(err){
        console.error('Register error: ',err);
        res.status(400).json({message: "Server error"});
    }
})

//login form
router.post('/login', async (req, res) => {
    try{
    const {username, password} = req.body;

    const [rows] = await Database.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) return res.status(400).json({message: "User not found"});

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return res.status(400).json({message: "Invalid password"});

    const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, {expiresIn: '1d'});

    res.json({message: 'Login successful', token, user});

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: "Server error" });
    }
})

export default router;