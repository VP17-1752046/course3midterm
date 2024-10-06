import express from "express";
import cors from "cors";
import connectDB from "./mongoDBConfig/db.js";
import authRoutes from "./routes/authRoute.js";
import profileRoutes from "./routes/profileRoute.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
