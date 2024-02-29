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
  role: {
    type: String,
    default: "user",
  },
  photo: {type: "String", default:"https://i.pinimg.com/564x/7c/1d/d5/7c1dd518dfc889c7b5d10bff14cc54e6.jpg"},
  firstName: {type: String},
  lastName: {type: String},
  photo: {type: String, default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"},
  nickName: {type: String, unique: true},

  savedStudySets: [{
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
    studySet: { type: mongoose.Schema.Types.ObjectId, ref: "StudySet" },
    savedAt: { type: Date, default: Date.now },
    cards: [{
      card: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
      status: { type: String, enum: ["not studied", "need practice", "mastered"], default: "not studied" }
    }],
    edit: {type: String, default: "yes" }
  }]
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;