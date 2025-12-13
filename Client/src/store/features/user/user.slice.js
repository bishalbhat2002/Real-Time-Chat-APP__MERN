import { createSlice } from "@reduxjs/toolkit";
import { getOtherUsersThunk, getUserProfileThunk, LoginUserThunk, logoutUserThunk, signupUserThunk } from "./user.thunk";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    // isAuthenticated: JSON.parse(localStorage.getItem("selectedUser")) ?? false,
    isAuthenticated: false,
    screenLoading: true,
    userProfile: null,
    otherUsers: null,
    buttonLoading: false,
    selectedUser: JSON.parse(localStorage.getItem("selectedUser")) ?? null,
    usersLoader: false,
  },
  reducers: {
    setSelectedUser:(state, action)=>{
      state.selectedUser = action.payload;
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      // console.log("selected: ", state.selectedUser)
    },

    setSelectedUserNull:(state, action)=>{
      state.selectedUser = null;
      localStorage.removeItem("selectedUser") 
    }

  },

  extraReducers: (builder) => {
    // Login User
    builder.addCase(LoginUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });

    builder.addCase(LoginUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user;
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", true);
      state.buttonLoading = false;
    });

    builder.addCase(LoginUserThunk.rejected, (state, action) => {
      console.log("rejected");
      state.buttonLoading = false;
    });

    // Signup User
    builder.addCase(signupUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });

    builder.addCase(signupUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user;
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", true);
      state.buttonLoading = false;
    });

    builder.addCase(signupUserThunk.rejected, (state, action) => {
      console.log("rejected");
      state.buttonLoading = false;
    });

    // Logout User
    builder.addCase(logoutUserThunk.pending, (state, action) => {
      state.buttonLoading = false;
      state.selectedUser = null;
    });

    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      state.userProfile = null;
      state.isAuthenticated = false;
      state.otherUsers = null;
      state.selectedUser = null;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("selectedUser")
      console.log("fulfilled");
    });

    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      console.log("rejected");
    });


    // get User Profile
    builder.addCase(getUserProfileThunk.pending, (state, action) => {
      // console.log("pending");
      state.screenLoading = true;
    });

    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.screenLoading = false;
      // console.log(action?.payload?.responseData)
      state.userProfile = action?.payload?.responseData;
    });

    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      console.log("rejected");
      state.screenLoading = false;
    });
    
    
    // get Other Users
    builder.addCase(getOtherUsersThunk.pending, (state, action) => {
      state.usersLoader = true;
    });

    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.usersLoader = false;
      // console.log("Other users",action?.payload?.responseData)
      state.otherUsers = action?.payload?.responseData;
    });

    builder.addCase(getOtherUsersThunk.rejected, (state, action) => {
      // console.log("rejected");
      state.usersLoader = false;
    });
  },
});

export const { setSelectedUser, setSelectedUserNull } = userSlice.actions;
export default userSlice.reducer;
