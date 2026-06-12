import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import QRCode from "qrcode";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All Fields are required");
    }
    const useralreadyexists = await User.findOne({ email });
    if (useralreadyexists) {
      throw new Error("user already exists");
    }

    const hashpassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      10000 + Math.random() * 90000,
    ).toString();

    const upiId = `${name.toLowerCase().replace(/\s/g, "")}@gratitudewallet`;

    const paymentUrl = `http://localhost:5173/pay/${upiId}`;

    const qrCode = await QRCode.toDataURL(paymentUrl);

    const user = new User({
      email,
      password: hashpassword,
      name,

      upiId,
      qrCode,

      verificationToken,

      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    generateTokenAndSetCookie(res, user._id);
    res.status(201).json({
      success: true,
      message: "user created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("All Fields are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("email is incorrect");
    }
    const passcheck = await bcryptjs.compare(password, user.password);
    if (!passcheck) {
      throw new Error("password is incorrect");
    }
    generateTokenAndSetCookie(res, user._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: "logged in successfull",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({ success: true, message: "logged out successfully" });
};

// export const getMe = async (req, res) => {
//   const user = await User.findOne();
//   console.log(user);
//   console.log(user.qrCode);
//   res.json({
//     success: true,
//     user,
//   });
// };

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
