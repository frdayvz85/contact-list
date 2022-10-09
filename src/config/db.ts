import mongoose from "mongoose";

// connection function
export const connectDB = async () => {
  mongoose.connect(process.env.DATABASE_URL as string, (err: any) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Mongoose Successfully Connected!");
    }
  });
};
