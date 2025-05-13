const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../utils/emailService");

// Generate verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with verification details
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken: verificationCode,
      verificationTokenExpires: Date.now() + 3600000, // 1 hour
    });
    await newUser.save();

    // Send verification email
    try {
      const emailSent = await sendVerificationEmail(email, verificationCode);
      if (!emailSent) {
        // If email fails, delete the user and return error
        await User.findByIdAndDelete(newUser._id);
        return res
          .status(500)
          .json({ message: "Error sending verification email" });
      }
    } catch (emailError) {
      // If email fails, delete the user and return error
      await User.findByIdAndDelete(newUser._id);
      return res
        .status(500)
        .json({ message: "Error sending verification email" });
    }

    res.status(201).json({
      message: "User registered successfully. Please verify your email.",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error signing up", error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    if (user.verificationToken !== code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    if (Date.now() > user.verificationTokenExpires) {
      return res.status(400).json({ message: "Verification code has expired" });
    }

    // Update user verification status
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying email", error: error.message });
  }
};

const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();

    // Update user with new verification code
    user.verificationToken = verificationCode;
    user.verificationTokenExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send new verification email
    const emailSent = await sendVerificationEmail(email, verificationCode);
    if (!emailSent) {
      return res
        .status(500)
        .json({ message: "Error sending verification email" });
    }

    res.json({ message: "Verification email sent" });
  } catch (error) {
    res.status(500).json({
      message: "Error resending verification email",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        message: "Please verify your email first",
        isVerified: false,
        email: user.email,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

module.exports = {
  signup,
  login,
  verifyEmail,
  resendVerification,
};
