import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {type: String},
  lastName: {type: String},
  savedStudySets: [{
    topicTitle: { type: String, default: "Your topic" },
    studySet: { type: mongoose.Schema.Types.ObjectId, ref: "StudySet" },
    savedAt: { type: Date, default: Date.now },
    cards: [{
      card: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
      status: { type: String, enum: ["not studied", "need practice", "mastered"], default: "not studied" }
    }]
  }]
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;