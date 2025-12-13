import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";


const route = express.Router();


route.post('/send/:receiverId', isAuthenticated, sendMessage)
route.post('/get/:otherParticipantId', isAuthenticated, getMessage)


export default route;