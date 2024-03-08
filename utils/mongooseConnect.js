import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected!");
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;
