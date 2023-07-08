import mongoose from "mongoose";
import UserModal from "../models/user.js";

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
  },
  userName: {
    type: String,
  }
});

var Message = mongoose.model("Message", messageSchema);

/* const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");

  // Update all messages to have a userName field 
  Message.find({}, function(err, messages) {
    if (err) {
      console.log(err);
    } else {
      messages.forEach(function(message) {
        UserModal.findById(message.author, function(err, user) {
          if (err) {
            console.log(err);
          } else {
            message.userName = user.name;
            message.save();
          }
        });
      });
    }
  }
  );
}); */


export default Message;