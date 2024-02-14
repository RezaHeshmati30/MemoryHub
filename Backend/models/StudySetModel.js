import mongoose from "mongoose";

const StudySetSchema = new mongoose.Schema({
    title: {
      type: String,
      unique: true,
    },
    topics: [
        {title: {type: String}, studySets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cards" }]}
        ],
  });
  
  const StudySetModel = mongoose.model("StudySet", StudySetSchema);
  
  export default StudySetModel;