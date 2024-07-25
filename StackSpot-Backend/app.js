import express, { json, urlencoded } from "express";
import auth from "./routes/auth.js";
import commentRoutes from "./routes/commentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import followRoutes from "./routes/followRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./data/data.js";
import dotenv from "dotenv";

dotenv.config();

export const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

const corsOptions = {
  origin: ["http://localhost:5173", "https://stack-spot.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());

connectDB();

app.use("/api/auth", auth);
app.use("/api/user", userRoutes);
app.use("/api/alluser", followRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/post", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});
