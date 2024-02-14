import mongoose from "mongoose";

const CardsSchema = new mongoose.Schema({
    title: {type: String}, 
    description: {type: String}, 
    cards: [{question: {type: String}, answer: {type: String}}]
  });
  
  const CardsModel = mongoose.model("Cards", CardsSchema);
  
  export default CardsModel;