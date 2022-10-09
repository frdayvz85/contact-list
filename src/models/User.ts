import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  phone: string;
  email: string;
  img: string;
}

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    img: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
