"use server";
import mongoose from "mongoose";
const uri = process.env.MONGO_URI;

export async function dbConnect() {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
  });
  console.log("models:", mongoose.models);

  console.log("Mongoose connected to MongoDB Atlas!");
  const kittySchema = new mongoose.Schema({
    name: String,
  });
  const Cat = mongoose.models.Cat || mongoose.model("Cat", kittySchema);
  console.log("Cat modeled");

  const fluffy = new Cat({ name: "fluffy" });
  fluffy.save;
}
