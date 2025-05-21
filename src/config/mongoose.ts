import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_CLIENT_URI = process.env.MONGODB_CLIENT_URI;

// Configuration de la connexion
export async function connectDB() {
  try {
    console.log("🛠 MONGODB_CLIENT_URI used:", MONGODB_CLIENT_URI);
    if (!MONGODB_CLIENT_URI) {
      throw new Error(
        "MONGODB_URI_CLIENT is not defined in the environment variables."
      );
    }
    await mongoose.connect(MONGODB_CLIENT_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // Les options peuvent varier selon la version de mongoose
    });
    console.log("🟢 1/2 - Connected to MongoDB (clients-db)");
  } catch (error) {
    console.error("❌ Failed to connect MongoDB", error);
    process.exit(1);
  }
}
