import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import messageRouter from "./routes/messages.js";
import directMessageRouter from "./routes/directMessages.js";
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import { WebSocketServer } from 'ws';

import http from "http";

// Create a new WebSocket server
const app = express();
const server = http.createServer(app);
dotenv.config({path:'.env'});

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use('/posts', postRoutes);
app.use("/user", userRouter);
app.use("/messages", messageRouter);
app.use("/directmessages", directMessageRouter);
app.get('/', (req, res) => {
  res.send('APP IS RUNNING');
})

// const server = http.createServer(app);
// socketServer.registerSocketServer(server);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  // Handle WebSocket connection
  ws.on('message', (message) => {
    // Handle incoming WebSocket message
  });

  // Send a WebSocket message
  ws.send('WebSocket connection established.');
  console.log('WebSocket connection established.');
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server Running on Port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });

mongoose.set('useFindAndModify', false);
