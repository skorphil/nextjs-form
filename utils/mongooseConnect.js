import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.info("Database connected");
  } catch (error) {
    throw ("mongooseConnect error:", error.message);
  }
}

export default connect;
