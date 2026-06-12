import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addMoney,
  sendMoney,
  sendMoneyByUpi,
} from "../controller/payment.controller.js";

const router = express.Router();

router.post("/add-money", verifyToken, addMoney);

router.post("/send-money-upi", verifyToken, sendMoneyByUpi);

export default router;
