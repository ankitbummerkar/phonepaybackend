import { User } from "../models/user.model.js";
import { Transaction } from "../models/transaction.model.js";

export const addMoney = async (req, res) => {
  try {
    const { amount } = req.body;

    const user = req.user;

    user.balance += Number(amount);

    await user.save();

    res.status(200).json({
      success: true,
      balance: user.balance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendMoney = async (req, res) => {
  try {
    const { receiverUniqueId, amount } = req.body;

    const sender = req.user;

    const receiver = await User.findOne({
      uniqueId: receiverUniqueId,
    });

    if (!receiver) {
      throw new Error("Receiver not found");
    }

    if (sender.uniqueId === receiver.uniqueId) {
      throw new Error("Cannot send money to yourself");
    }

    if (sender.balance < Number(amount)) {
      throw new Error("Insufficient Balance");
    }

    sender.balance -= Number(amount);

    receiver.balance += Number(amount);

    await sender.save();

    await receiver.save();

    await Transaction.create({
      senderId: sender.uniqueId,
      receiverId: receiver.uniqueId,
      amount,
    });

    res.status(200).json({
      success: true,
      message: "Money Sent Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendMoneyByUpi = async (req, res) => {
  try {
    const { receiverUpiId, amount } = req.body;

    const sender = req.user;

    const receiver = await User.findOne({
      upiId: receiverUpiId,
    });

    if (!receiver) {
      throw new Error("Receiver not found");
    }

    if (sender._id.toString() === receiver._id.toString()) {
      throw new Error("Cannot send money to yourself");
    }

    if (sender.balance < Number(amount)) {
      throw new Error("Insufficient Balance");
    }

    sender.balance -= Number(amount);

    receiver.balance += Number(amount);

    await sender.save();

    await receiver.save();

    await Transaction.create({
      senderId: sender.upiId,
      receiverId: receiver.upiId,
      amount,
    });

    res.status(200).json({
      success: true,
      message: "Money Sent Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyTransactions = async (req, res) => {};

export const getUserByUpiId = async (req, res) => {};
