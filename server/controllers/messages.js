import express from 'express';
import mongoose from 'mongoose';

import messages from '../models/messages';

const router = express.Router();

export const getMessages = async (req, res) => {
    if (!req.userId) return res.json({ message: "Unauthenticated" });
    try{
        const messages = await messages.find();

        res.status(200).json(messages);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const sendMessage = async (req, res) => {
    if (!req.userId) return res.json({ message: "Unauthenticated" });
    const message = req.body;

    const newMessage = new messages(message);

    //save the author of the message
    newMessage.author = req.userId;

    try {
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}