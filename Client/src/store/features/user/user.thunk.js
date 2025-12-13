import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utilities/axiosInstance";
import { toast } from 'react-toastify';


export const signupUserThunk = createAsyncThunk("/user/Register", async ({fullName, username, password, gender, photo}) => {
     try {
          const response = await axiosInstance.post("/user/signup", {fullName, username, password, gender, photo})
          // console.log(response);
          toast.success("User created successfully.")
          return response.data;

     } catch (error) {
          console.error(error);
          const errorMessage = error?.response?.data?.errMessage;
          toast.error(`login failed: ${errorMessage}.`)
          return returnWithValue(errorMessage);
     }  
});



export const LoginUserThunk = createAsyncThunk("/user/login", async ({username, password}) => {
     try {

          const response = await axiosInstance.post("/user/login", {username, password})
          // console.log(response);
          toast.success("login successful")
          return response.data;

     } catch (error) {
          console.error(error);
          const errorMessage = error?.response?.data?.errMessage;
          toast.error(`login failed: ${errorMessage}.`)
          return returnWithValue(errorMessage);
     }
     
});



export const logoutUserThunk = createAsyncThunk("/user/Logout", async () => {
     try {
          const response = await axiosInstance.post("/user/logout")
          // console.log(response);
          toast.success("User Logged Out successfully.")
          return response?.data;

     } catch (error) {
          console.error(error);
          const errorMessage = error?.response?.data?.errMessage;
          toast.error(`Logout failed: ${errorMessage}.`)
          return returnWithValue(errorMessage);
     }  
});



export const getUserProfileThunk = createAsyncThunk("/user/get-profile", async () => {
     try {
          const response = await axiosInstance.get("/user/get-profile")
          // console.log(response);
          return response.data;

     } catch (error) {
          console.error(error);
          const errorMessage = error?.response?.data?.errMessage;
          // toast.error(`Logout failed: ${errorMessage}.`)
          return returnWithValue(errorMessage);
     }  
});


export const getOtherUsersThunk = createAsyncThunk("/user/getOtherUsers", async () => {
     try {
          const response = await axiosInstance.get("/user/get-other-users")
          // console.log(response);
          return response.data;

     } catch (error) {
          console.error(error);
          const errorMessage = error?.response?.data?.errMessage;
          // toast.error(`Logout failed: ${errorMessage}.`)
          return returnWithValue(errorMessage);
     }  
});
