import UserModal from "../models/user.js";
import mongoose from "mongoose";
import express from "express";
import DirectMessage from "../models/directmessages.js";
const router = express.Router();

export const getDirectMessages = async (req, res) => {
    if (!req.userId) return res.json({ message: "Unauthenticated" });
    const receiverId = req.userId;
    try {
        const messages = await DirectMessage.find({
            recipient: receiverId
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export const createDirectMessage = async (req, res) => {
    if (!req.userId) return res.json({ message: "Unauthenticated" });
    const text = req.body;
    const receiverId = req.params.receiverId;
    const output = Object.values(text).join('');
    const receiver = await UserModal.findById(receiverId);
    const author1 = await UserModal.findById(req.userId);
    try {
        const newMessage = new DirectMessage({
            author: author1,
            recipient: receiver,
            content: output,
            userName: author1.name,
        });

        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};


export default router;