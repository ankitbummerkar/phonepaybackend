import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
    },

    receiverId: {
      type: String,
    },

    amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
