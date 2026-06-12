import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    upiId: {
      type: String,
      unique: true,
    },

    balance: {
      type: Number,
      default: 1000,
    },

    qrCode: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: String,

    verificationTokenExpiresAt: Date,
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
