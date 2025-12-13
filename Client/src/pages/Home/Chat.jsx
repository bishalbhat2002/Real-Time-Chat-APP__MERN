import { useEffect } from "react";
import ChatSidebar from "../../Components/ChatSidebar";
import MessageContainer from "../../Components/MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  initalizeSocket,
  setOnlineUsers,
} from "../../store/features/socket/socket.slice";
import { appendMessages } from "../../store/features/message/message.slice";
import { toast } from "react-toastify";
import {
  getOtherUsersThunk,
  getUserProfileThunk,
} from "../../store/features/user/user.thunk";

const Chat = () => {
  const { userProfile, selectedUser, otherUsers, isAuthenticated } =
    useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const { socket, onlineUsers } = useSelector((state) => state.socketReducer);

  useEffect(() => {
    dispatch(getUserProfileThunk());
    dispatch(getOtherUsersThunk());
  }, [dispatch, isAuthenticated]);
   
  
  useEffect(() => {
    dispatch(initalizeSocket(userProfile?._id));
  }, [isAuthenticated]);
  

  useEffect(() => {
    if (!socket) return;
    console.log("socket is set")
    socket.on("onlineUsers", (onlineUsers) => {
      if(onlineUsers){
        dispatch(setOnlineUsers(onlineUsers));
        // console.log("onlineUsers", onlineUsers)
      }
    }).on("newMessage", async (newMessage) => {
      if (selectedUser?._id === newMessage?.senderId) {
        console.log("if part")
        dispatch(appendMessages(newMessage));
      } else {
        console.log("else part")
        const msgSendername = await getName(newMessage?.senderId);
        if(msgSendername){
          toast.success(`${msgSendername} send a New Message`);
        }
      }
    });

  }, [socket, selectedUser]);

  const getName = async (userId)=>{
    console.log(otherUsers)
    const name =  await otherUsers?.find(user=>user?._id===userId).fullName;
    // console.log(name);
    return name;
  }


  return (
    <div className="flex h-screen w-screen">
      <ChatSidebar />
      <MessageContainer />
    </div>
  );
};

export default Chat;
