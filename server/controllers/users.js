import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

import { validateLoginInput, validateRegisterInput } from '../validations/clients/users.js'
import UserModel from '../models/userModel.js'

dotenv.config()
const SECRET = process.env.SECRET
const HOST = process.env.SMTP_HOST
const PORT = process.env.SMTP_PORT
const USER = process.env.SMTP_USER
const PASS = process.env.SMTP_PASS

/**
 * @description
 *  Signin user and return JWT Token
 */
export const signin = async (req, res) => {
    const { email, password } = req.body // Coming from formData
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid)
        return res.status(400).json(errors);

    try {
        const existingUser = await UserModel.findOne({ email })
        if (!existingUser)
            return res.status(400).json({ email: 'This email is not exist.' });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect)
            return res.status(400).json({ password: "Password is incorrect." })

        // If crednetials are valid, create a token for the user
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET, { expiresIn: "168h" })

        // Then send the token to the client/frontend
        res.status(200).json({ user: existingUser, token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

/**
 * @description
 *  Signup user and return jwt token.
 */
export const signup = async (req, res) => {
    const { email, password } = req.body
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid)
        return res.status(400).json(errors)

    try {
        const existingUser = await UserModel.findOne({ email })
        if (existingUser)
            return res.status(400).json({ email: "This email is already exist." })

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await UserModel.create({
            email: email,
            password: hashedPassword,
        });

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, SECRET, { expiresIn: "168h" })
        res.status(200).json({ user: newUser, token })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

/**
 * @description
 *  Get user information with user id
 */
export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        res.status(200).json({ user: user, token: req.header('x-auth-token') });
    } catch (err) {
        console.log(err);
        res.status(401).json({ msg: 'Incorrect User' });
    }
}

/**
 * @description
 *  Signin user with google and return jwt token.
 */
export const signinGoogle = async (req, res) => {
    const { sub, name, given_name, family_name, picture, email, email_verified, locate } = req.body;
    try {
        var existingUser = await UserModel.findOne({ email })
        if (!existingUser)
            return res.status(400).json({ email: "User does not exist." });

        if (existingUser.password && existingUser.password !== "") {
            return res.status(400).json({ logintype: "You can't signin with google with this email." });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET, { expiresIn: "168h" })

        // Then send the token to the client/frontend
        res.status(200).json({ user: existingUser, token })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

/**
 * @description
 *  Signup user with google and return jwt token. 
 */
export const signupGoogle = async (req, res) => {
    const { email, email_verified } = req.body;
    try {
        var existingUser = await UserModel.findOne({ email });
        if (existingUser)
            return res.status(400).json({ email: "This email is already exist." });

        const newUser = await UserModel.create({
            email: email,
            password: "",
        });

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, SECRET, { expiresIn: "168h" })
        res.status(200).json({ user: newUser, token })
    } catch (error) {
        res.status(500).json({ error: error });
    }
}