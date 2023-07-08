import express from 'express';
import mongoose from 'mongoose';

import Message from '../models/messages.js';
import UserModal from '../models/user.js';

const router = express.Router();
/*
const messageSchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  }, 
  content: {
    type: String,
  },
  date: {
    type: Date,
  }
});
*/
export const getMessages = async (req, res) => {
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  try{
    //load 10 messages
      const fetchedmessages = await Message.find()
      res.status(200).json(fetchedmessages);
  }
  catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const sendMessage = async (req, res) => {
    if (!req.userId) return res.json({ message: "Unauthenticated" });
    const message = req.body;
    const output = Object.values(message).join('');
    const user = await UserModal.findById(req.userId);
    const newMessage = new Message({...message,  content: output, author: req.userId, date: new Date().toISOString(), userName: user.name});
    try {
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getUsers = async (req, res) => {
  //return all user profile
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  try {
    const users = await UserModal.find();
    //remove the password and email from the user profile
    users.forEach((user) => {
      user.password = undefined;
      user.email = undefined;
      user.friends = undefined;
      if(user._id == req.userId) {
        //remove the user from the list of users
        users.splice(users.indexOf(user), 1);
      }
    });
    res.status(200).json(users);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default router;