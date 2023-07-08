import mongoose from "mongoose";
import UserModal from "../models/user.js";

const directMessageSchema = new mongoose.Schema({
    author : {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    content : {
        type: String,
    },
    date : {
        type: Date,
    },
    recipient : {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    userName : {
        type: String,
    }
});

var DirectMessage = mongoose.model("DirectMessage", directMessageSchema);

// const db = mongoose.connection;
//update every message to have a userName field
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//     console.log("Connected to MongoDB");

//     DirectMessage.find({}, function(err, messages) {
//         if (err) {
//             console.log(err);
//         } else {
//             messages.forEach(function(message) {
//                 UserModal.findById(message.author, function(err, user) {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         user = user.toObject();
//                         message.userName = user.name;
//                         message.save();
//                     }
//                 });
//             });
//         }
//     }
// );
// });

export default DirectMessage;
