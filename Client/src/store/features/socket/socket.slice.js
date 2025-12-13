import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client"
export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
    onlineUsers: null,
  },
  reducers: {
    initalizeSocket:(state, action)=>{
      const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
        query: {userId:action.payload}
      })
      state.socket = socket;
    },

    setOnlineUsers: (state, action)=>{
      // console.log("active users: ",action.payload)
      state.onlineUsers = action.payload;
      // console.log(state.onlineUsers)
    }

  },

});

export const { initalizeSocket, setOnlineUsers } = socketSlice.actions;
export default socketSlice.reducer;
