import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import "dotenv/config";
import UserModel from "../models/UserModel.js"
import bodyParser from 'body-parser';
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'the.memory.hub2024@gmail.com',
      pass: 'snut hvii ygld mbvy'
    }
  });

export const postSignupController = async (req, res) => { 
    const {email, password, firstName, lastName, nickName } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const saltedHashedPassword = await bcrypt.hash(password, 14);
        const verificationToken = Math.random().toString(36).substring(7);
        const newUser = new UserModel({
            email, password: saltedHashedPassword, firstName, lastName, nickName, verificationToken
        });
        await newUser.save();

        const mailOptions = {
            from: 'the.memory.hub2024@gmail.com',
            to: email,
            subject: 'Email Verification',
            html: `<p>Click <a href="http://localhost:3001/api/verify/${verificationToken}">here</a> to verify your email.</p>`
          };
      
          await transporter.sendMail(mailOptions);

        // res.status(201).send({success:true, insertedData: newUser});
        res.status(200).json({ message: 'User created. Verification email sent.', insertedData: newUser });
    } catch (error) {
        console.error(error)
        res.status(500).send({success: false, error: error.message})
}
}

export const verifyToken = async (req, res) => {
    const token = req.params.token;
    try {
        const user = await UserModel.findOne({ verificationToken: token });
        if (!user) {
          return res.status(404).json({ message: 'Invalid verification token' });
        }
    
        // Update user's verification status
        user.verified = true;
        user.verificationToken = null;
        await user.save();
    
        res.redirect('http://localhost:5173'); // Redirect to a success page

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}