import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/mongo";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.get("/health", (_req, res) => res.json({ status: "OK", message: "Campus Stay backend running." }));

app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Campus Stay backend listening at http://localhost:${PORT}`)
  );
});