import mongoose from "mongoose";

// console.log("process.env.MONGO_URL-connect", process.env.MONGO_URL);

// export const connectMongo = async () => mongoose.connect("mongodb+srv://maximostrovskiy86:RUFsLoVfS5J9GFwJ@cluster0.ofcuk4d.mongodb.net/", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

export const connectMongo = async () => {
  // const uri = process.env.MONGO_URL;
  const uri = 'mongodb+srv://maximostrovskiy86:RUFsLoVfS5J9GFwJ@cluster0.ofcuk4d.mongodb.net/socket-chat';
  if (!uri) {
    throw new Error(
      "MONGO_URL is not defined. Ensure your .env is loaded and contains MONGO_URL."
    );
  }
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Optionally set dbName if your URI lacks one
    // dbName: process.env.MONGO_DB_NAME || 'test',
  });
};
