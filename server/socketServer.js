import authSocket from "./middleware/authSocket.js";
import serverStore from "./serverStore.js";
import newConnectionHandler from "./socketHandlers/newConnectionHandler";
import directMessageHandler from "./socketHandlers/directMessageHandler";

const registerSocketServer = (server) => {
    const io = require("socket.io")(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
  
    serverStore.setSocketServerInstance(io);
  
    io.use((socket, next) => {
      authSocket(socket, next);
    });
  
    const emitOnlineUsers = () => {
      const onlineUsers = serverStore.getOnlineUsers();
      io.emit("online-users", { onlineUsers });
    };
  
    io.on("connection", (socket) => {
     
  
      newConnectionHandler(socket, io);
      emitOnlineUsers();
  
      socket.on("direct-message", (data) => {
        directMessageHandler(socket, data);
      });
  
      socket.on("direct-chat-history", (data) => {
        directChatHistoryHandler(socket, data);
      });
    });
  
    setInterval(() => {
      emitOnlineUsers();
    }, [1000 * 8]);
  };
  
  module.exports = {
    registerSocketServer,
  };