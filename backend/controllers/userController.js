import User from '../modals/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const saltRounds = 10;

export const signup = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(422).json({ error: "All fields are required" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(422).json({ error: "User already exists" });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.error("Error hashing password:", error);
    return res.status(500).json({ error: "Error hashing password" });
  }

  const newUser = new User({ username, password: hashedPassword, email });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Error saving user", details: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(422).json({ error: "All fields are required" });
  }

  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    return res.status(404).json({ error: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "JWT secret is not configured" });
  }

  const token = jwt.sign(
    { id: existingUser._id, username: existingUser.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  console.log(`User ${username} successfully logged in. Token generated.`);

  res.status(200).json({ message: "Login successful", token });
};

export async function updateuserpoints(username, points) {
  try {
    const user = await User.findOneAndUpdate(
      { username },
      { $inc: { gems: points } },
      { new: true }
    );

    if (!user) {
      console.log("User not found");
      return;
    }
    
    console.log("Updated gems:", user.gems);
  } catch (error) {
    console.error("Error updating user points:", error);
  }
}
