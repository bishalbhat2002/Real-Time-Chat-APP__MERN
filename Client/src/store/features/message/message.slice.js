import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./message.thunk";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
     screenLoading:false,
     buttonLoading:false,
     messages:[],
  },
  reducers: {
    appendMessages:(state, action)=>{
      state.messages = [...state.messages, action.payload];
    }
  },

  extraReducers: (builder) => {
    // send Message 
    builder.addCase(sendMessageThunk.pending, (state, action) => {
     state.buttonLoading=true;
    });

    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
     state.buttonLoading=false;
    //  console.log(action.payload)
     state.messages.push(action.payload);
    //  state.messages = [...state.messages, action.payload];
    });

    builder.addCase(sendMessageThunk.rejected, (state, action) => {
     state.buttonLoading=false;
    });  
    
    
    // get Messages 
    builder.addCase(getMessageThunk.pending, (state, action) => {
     state.screenLoading=true;
    });

    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      state.screenLoading=false;
      state.messages = action.payload;
    });

    builder.addCase(getMessageThunk.rejected, (state, action) => {
      state.screenLoading=false;
    });


  },
});

export const { appendMessages } = messageSlice.actions;
export default messageSlice.reducer;
