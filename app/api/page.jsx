import { dbConnect } from "../../serverActions/appendRecord";

export default async function handler(req, res) {
  //the rest of your code here
}

await dbConnect();
// dbConnect().catch((err) => console.error("MongoDB connection error:", err));
