import mongoose from "mongoose";

const StudySetSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  description: { type: String },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  savedAt: { type: Date, default: Date.now },
});

const StudySetModel = mongoose.model("StudySet", StudySetSchema);
//having error during adding title:
StudySetModel.collection.dropIndexes((err, result) => {
  if (err) {
    console.error("Error dropping indexes:", err);
  } else {
    console.log("Indexes dropped successfully:", result);
  }
});

export default StudySetModel;
