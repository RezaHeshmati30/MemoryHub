import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import StudySetModel from "../models/StudySetModel.js"
import jwt from "jsonwebtoken";
import "dotenv/config";

export const getUserInfo = async (req, res) => {

    try {
        
        if (!req.userId) {
            return res.status(401).send("Unauthorized"); 
        }
        const loggedUser = await UserModel.findById(req.userId).populate({
            path: 'savedStudySets.studySet', // Populate the 'studySet' field within the 'savedStudySets' array
            model: 'StudySet',
        })
        .populate({
            path: 'savedStudySets.cards.card', // Populate the 'card' field within the 'cards' array
            model: 'Card'
        });

        if (!loggedUser) {
            return res.status(404).send("User not found"); 
        }
        res.send({
            firstName: loggedUser.firstName,
            lastName: loggedUser.lastName,
            _id: loggedUser._id,
            email: loggedUser.email,
            savedStudySets: loggedUser.savedStudySets
          });

    } catch (error) {
        console.error("Error retrieving user information:", error);
        res.status(500).send("Internal Server Error"); 
    }
}

export const addStudySetToUser = async (req, res) => {
    const studySetId = req.body.studySetId;
    const userId = req.params.id;

        try {
          const user = await UserModel.findById(userId);
          
          if (!user) {
            res.status(404).send('User not found');
          }
          const existingSavedStudySetIndex = user.savedStudySets.findIndex(savedStudySet => savedStudySet.studySet.equals(studySetId));
      
          if (existingSavedStudySetIndex !== -1) {
            res.status(400).send('Study set already saved by the user');
          } else {
            const studySet = await StudySetModel.findById(studySetId);
      
          if (!studySet) {
            res.status(404).send('Study set not found');
          } else {
            const savedStudySet = {
                topicTitle: req.body.topicTitle || 'Your topic',
                studySet: studySetId,
                savedAt: Date.now(),
                cards: studySet.cards.map(card => ({ card: card._id })),
              };
          
              user.savedStudySets.push(savedStudySet);
              await user.save();
              res.status(200).send(user);
              }
          }
        } catch (error) {
            console.error("Error retrieving user information:", error);
            res.status(500).send("Internal Server Error"); 
        }
      };

