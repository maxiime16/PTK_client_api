import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { connectDB } from "./config/mongoose";
import clientsRouter from "./routes/clients.routes";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

// Routes
app.use("/clients", clientsRouter);

// Server start
const PORT = process.env.PORT || 3001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Clients API running on port ${PORT}`);
  });
});
