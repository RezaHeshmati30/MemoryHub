import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import "dotenv/config";
import UserModel from "../models/UserModel.js"

export const postSignupController = async (req, res) => { 
    const {email, password } = req.body;

    try {
        const saltedHashedPassword = await bcrypt.hash(password, 14);
        const newUser = new UserModel({
            email, password: saltedHashedPassword
        });
        await newUser.save();
        res.status(201).send({success:true, insertedData: newUser});
    } catch (error) {
        console.error(error)
        res.status(500).send({success: false, error: error.message})
}
}

