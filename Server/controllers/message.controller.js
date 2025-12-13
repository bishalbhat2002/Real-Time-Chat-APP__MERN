import Message from "../models/message.model.js";
import ConversationModel from "../models/conversation.model.js"
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import { getSocketID, io } from "../socket/socket.js"


export const sendMessage = asyncHandler(async (req, res, next) => {

     const senderId = req.user._id;
     const {receiverId} = req.params;
     const {message} = req.body;

     // console.log(senderId, receiverId, message)

      if (!senderId || !receiverId || !message) {
          return next(new errorHandler("All fields are required.", 400))
     }

     let conversation = await ConversationModel.findOne({
          participants: {$all: [senderId, receiverId]},
     })

     if(!conversation){
          conversation = await ConversationModel.create({
               participants: [senderId, receiverId],
          })
     }

     const newMessage = await Message.create({senderId, receiverId, message});

     if(newMessage){
          conversation.messages.push(newMessage._id);
          await conversation.save();
     }

     // socket.io code here...
     const socketId = getSocketID(receiverId);
     io.to(socketId).emit("newMessage", newMessage);

  return res
     .status(200)
     .json({
          success:true,
          responseData:newMessage
     });

});



export const getMessage = asyncHandler(async (req, res, next) => {

     const myId = req.user._id;
     const {otherParticipantId} = req.params;

     if (!myId || !otherParticipantId) {
          return next(new errorHandler("Invalid User selected.", 400))
     }

     let conversation = await ConversationModel.findOne({
          participants: {$all: [myId, otherParticipantId]},
     }).populate("messages")


  return res
     .status(200)
     .json({
          success:true,
          responseData:conversation
     });

});