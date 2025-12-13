import { asyncHandler } from "../utilities/asyncHandler.utility.js"
import { errorHandler } from "../utilities/errorHandler.utility.js";
import jwt from "jsonwebtoken"
import "dotenv/config";

// Verify Token
const verifyToken = async(token)=>{
  return await jwt.verify(token, process.env.JWT_SECRET);
}


export const isAuthenticated = asyncHandler(async (req, res, next)=>{
     const token = req.cookies.token;
     // console.log(token);
     
     if(!token){
          return next(new errorHandler("Invalid Token.", 404));
     }
     
     const tokenData = await verifyToken(token);
     // console.log(tokenData);
     

     req.user = {
          _id:tokenData._id
     }
     next();
})