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
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
