import mongoose from "mongoose";

export const connectMongo = async () => {
  const uri = process.env.MONGO_URL;
  if (!uri) {
    throw new Error(
      "MONGO_URL is not defined. Ensure your .env is loaded and contains MONGO_URL.",
    );
  }
  return mongoose.connect(uri);
};
