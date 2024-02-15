import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js"
import jwt from "jsonwebtoken";
import "dotenv/config";

export const getUserInfo = async (req, res) => {

    try {
        
        if (!req.userId) {
            return res.status(401).send("Unauthorized"); 
        }
        const loggedUser = await UserModel.findById(req.userId);

        if (!loggedUser) {
            return res.status(404).send("User not found"); 
        }
        res.send({
            firstName: loggedUser.firstName,
            lastName: loggedUser.lastName,
            _id: loggedUser._id,
            email: loggedUser.email
          });

    } catch (error) {
        console.error("Error retrieving user information:", error);
        res.status(500).send("Internal Server Error"); 
    }
}


