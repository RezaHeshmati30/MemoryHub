import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import StudySetModel from "../models/StudySetModel.js"
import jwt from "jsonwebtoken";
import "dotenv/config";
import mongoose from "mongoose";

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

export const getUserStudySets = async(req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId)
      .populate({
        path: 'savedStudySets',
        populate: [
          { path: 'topic', model: 'Topic' },
          { path: 'studySet', model: 'StudySet' },
          { path: 'cards.card', model: 'Card' }
        ]
      });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ savedStudySets: user.savedStudySets });
  } catch (error) {
    console.error('Error fetching saved study sets:', error);
    res.status(500).json({ error: 'Internal server error' });
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
                  edit: req.body.edit
                };

                await StudySetModel.findOneAndUpdate(
                  { _id: studySetId },
                  { $inc: { shared: 1 } }
              );  
            
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

      
      export const deleteSavedStudySet = async (req, res) => {
        const userId = req.params.userId;
        const studySetId = req.params.setId;

        try {
          const user = await UserModel.findById(userId);
      
          if (!user) {
           res.status(404).send("User not found");
          }
      
          const studySetIndex = user.savedStudySets.findIndex(set => set._id.toString() === studySetId);
      
          if (studySetIndex === -1) {
            res.status(404).send("Study set not found in saved study sets");
          }
      
          user.savedStudySets.splice(studySetIndex, 1); 
      
          await user.save();
          
          res.status(200).send("Study set deleted successfully" );
        } catch (error) {
          console.error("Error retrieving user information:", error);
          res.status(500).send("Internal Server Error"); 
        }
      }
      
      export const updateCardStatus = async(req, res) => {
        const userId = req.params.userId;
        const studySetId = req.params.studySetId;
        const cardId = req.params.cardId;
        const newStatus = req.body.newStatus;
        console.log("USERId:", userId)
        console.log("StudySet:", studySetId)
        console.log("CardId:", cardId)
        console.log("Nes Status:", newStatus)

        try {
          // Find the user by userId and update the card
          const user = await UserModel.findById(userId);
          console.log("User:", user)
          const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId, "savedStudySets._id": studySetId, "savedStudySets.cards._id": cardId },
            { 
              $set: {
                "savedStudySets.$[set].cards.$[card].status": newStatus 
              }
            },
            { 
              new: true, 
              arrayFilters: [ 
                { "set._id": studySetId }, 
                { "card._id": cardId } 
              ] 
            }
          );
          console.log("User:", updatedUser)
          res.status(200).send(updatedUser);
        } catch (error) {
          console.error("Error retrieving user information:", error);
          res.status(500).send("Internal Server Error"); 
        }
      }

      export const getUserShortData = async (req, res) => {
        const userId = req.params.id;

        try {
          const user = await UserModel.findById(userId);
  
          if (!user) {
              return res.status(404).send("User not found"); 
          }
          res.send({
              nickName: user.nickName,
              photo: user.photo
            });
  
      } catch (error) {
          console.error("Error retrieving user information:", error);
          res.status(500).send("Internal Server Error"); 
      }
      }