import mongoose from "mongoose";

const StudySetSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  shared: { type: Number, default: 0 },
  cards: [ { type: mongoose.Schema.Types.ObjectId, ref: "Card" } ],
});

const StudySetModel = mongoose.model("StudySet", StudySetSchema);


export default StudySetModel;
