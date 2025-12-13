import User from "../models/user.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config"

// Encrypt password
const encryptPassword = async(plainPassword)=>{
  return await bcrypt.hash(plainPassword, 10)
}
// Compare passwords
const comparePassword = async(plainPassword, hash)=>{
  return await bcrypt.compare(plainPassword, hash)
}

// Create Token
const createToken = async(data)=>{
  return await jwt.sign(data, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRE})
  // expiresIn -> by default 300 mean 300ms. 3d -> 3 days, 2h -> 2hours
}


export const signup = asyncHandler(async (req, res, next) => {
  const { fullName, username, password, gender, photo } = req.body;

  if (!fullName || !username || !password || !gender || !photo) {
     return next(new errorHandler("All fields are required.", 400))
  }

  const user = await User.findOne({username});
  if(user){
    return next(new errorHandler("User already exists.", 400))
  }

  const encryptedPassword = await encryptPassword(password);
  const newUser = await User.create({fullName, username, password:encryptedPassword, gender, photo});
  
  const tokenData = {
    _id:newUser._id
  }

  const token = await createToken(tokenData);

  return res
  .status(200)
  .cookie("token", token, {
    expires:new Date(Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000), httpOnly:true
    , secure:process.env.NODE_ENV === "production", sameSite: 'lax'  
  })
  .json({
    success:true,
    responseData:{newUser}
  });

});




export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  console.log("login controller hit");
  

  if (!username || !password) {
     return next(new errorHandler("All fields are required.", 400))
  }

  const user = await User.findOne({username});
  if(!user){
    return next(new errorHandler("Invalid Login Credentials.", 400))
  }

  const isValidUser = comparePassword(password, user.password)
  if(!isValidUser){
    return next(new errorHandler("Invalid Login Credentials.", 400))
  }

  const tokenData = {
    _id:user._id
  }

  const token = await createToken(tokenData);

  return res
  .status(200)
  .cookie("token", token, {
    expires:new Date(Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000), httpOnly:true
    , secure:process.env.NODE_ENV === "production", sameSite: 'lax'  
  }).json({
    success:true,
    responseData:{user}
  });

});



export const logout = asyncHandler(async (req, res, next) => {

  return res
  .status(200)
  .cookie("token", "", {
    expires:new Date(Date.now()),
    httpOnly:true  
  })
  .json({
    success:true,
    message:"Logout Successful..."
  });

});



export const getProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  
  console.log("get Profile route hit");

  const profile = await User.findById(userId);
  if(!profile){
    return next(new errorHandler("No profile exists for that ID.", 400))
  }

  return res
  .status(200)
  .json({success:true, responseData:profile});

});


export const getOtherUsers = asyncHandler(async (req, res, next) => {

  const userId = req.user._id;

  console.log("get Profile route hit");

  const otherUsers = await User.find({_id:{$ne:userId}});

  return res
  .status(200)
  .json({success:true, responseData: otherUsers});

});

