import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     fullName:{
          type:String,
          required:true,
     },
     username:{
          type:String,
          required:true,
          unique:true,
     },
     password:{
          type:String,
          required:true,
     },
     gender:{
          type:String,
          required:true,
     },
     photo:{
          type:String,
          required:true,
          default:"https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?semt=ais_hybrid&w=740&q=80"
     }
}, {timestamps:true})


const User = mongoose.model('User', userSchema);
export default User;