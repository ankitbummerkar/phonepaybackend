import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./db/connectdb.js";
import authRoutes from "./routes/auth.route.js";
import payRoutes from "./routes/payment.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use("/auth", authRoutes);
app.use("/payment", payRoutes);
app.listen(5000, () => {
  connectdb();
  console.log("server is running at port 5000");
});
