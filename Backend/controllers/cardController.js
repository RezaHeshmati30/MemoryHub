import CardModel from "../models/CardModel.js";
import StudySetModel from "../models/StudySetModel.js";

export const addCard = async (req, res) => {
    try {
      const newCard = new CardModel(req.body)
      await newCard.save()
      res.status(201).send('new Card added'+ newCard)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
//!just for test
  export const getAllSets= async(req,res)=>{
    try {
      const allData = await StudySetModel.find();
      res.status(200).json(allData);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };