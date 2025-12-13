import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/user.slice"
import messageReducer from "./features/message/message.slice"
import socketReducer from "./features/socket/socket.slice"


export const store = configureStore({
  reducer: {
    userReducer,
    messageReducer,
    socketReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["socketReducer.socket"], // ignore socket instance
        ignoredActions: ["socket/initalizeSocket"], // ignore socket init action
      },
    }),



});
