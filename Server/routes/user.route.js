import express from "express";
import { login, signup, getProfile, logout, getOtherUsers } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const route = express.Router();


route.post('/signup', signup)
route.post('/login', login)
route.post('/logout', isAuthenticated, logout)
route.get('/get-profile', isAuthenticated, getProfile)
route.get('/get-other-users', isAuthenticated, getOtherUsers)


export default route;