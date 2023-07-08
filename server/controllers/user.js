import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";
const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid credentials" });

    else if (!oldUser.verified) return res.status(402).json({ message: "User not verified" });

    else if (!oldUser.registered) return res.status(403).json({ message: "User not registered" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

export const verify = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const User = await UserModal.findOne({ email });

    if (!User) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, User.password);

    if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid credentials" });

    //send mongodb query to update user.verified to true

    await UserModal.findByIdAndUpdate(User._id, { verified: true });

    return res.status(200).json({ message: "User verified" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

