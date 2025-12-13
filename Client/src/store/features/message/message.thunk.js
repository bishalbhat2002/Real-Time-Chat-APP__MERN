import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utilities/axiosInstance";
import { toast } from 'react-toastify';

export const sendMessageThunk = createAsyncThunk("SendMessage", async ({receiverId, message}) => {
     try {

          const response = await axiosInstance.post(`/message/send/${receiverId}`, {message})
          // console.log("response data", response?.data?.responseData);
          return response?.data?.responseData;

     } catch (error) {
          console.error(error);
          const errorMessage = error?.response?.data?.errMessage;
          return returnWithValue(errorMessage);
     }
     
});


export const getMessageThunk = createAsyncThunk("getMessage", async ({receiverId}) => {
     try {
          // console.log("hey", receiverId);
          const response = await axiosInstance.post(`/message/get/${receiverId}`)
          // console.log(response);
          return response?.data?.responseData?.messages || [];

     } catch (error) {
          console.error(error);
          const errorMessage = error?.response?.data?.errMessage;
          return returnWithValue(errorMessage);
     }
     
});

