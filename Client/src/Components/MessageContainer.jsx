import { useState, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessageThunk,
  sendMessageThunk,
} from "../store/features/message/message.thunk";
import { RxCross2 } from "react-icons/rx";
import { setSelectedUserNull } from "../store/features/user/user.slice";


const MessageContainer = () => {
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);
  const { onlineUsers } = useSelector((state) => state.socketReducer);
  const isUserOnline = onlineUsers?.includes(selectedUser?._id) 


  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUser?._id }));
    }
  }, [selectedUser]);

  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      // console.log({receiverId:selectedUser._id, message})
      dispatch(sendMessageThunk({ receiverId: selectedUser._id, message }));
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(e);
    }
  };

  const handleUnselectUser = ()=>{
    dispatch(setSelectedUserNull());
    // alert("user unselected");
  }


  return (
    <section className={`bg-zinc-800 h-full w-full ${selectedUser?"":"hidden"} sm:flex flex-col`}>
    {
      !selectedUser &&
            <div className={`h-full w-full ${selectedUser ? "" : "hidden"} sm:flex flex-col justify-center text-center items-center px-5`}>  
              <h1 className="text-4xl font-extrabold text-slate-400">
                Welcome to CHAT APP
              </h1>
              <p className="text-lg font-bold text-slate-500">
                Please Select User to Chat...
              </p>
            </div>
    }

    {
      selectedUser && <>
      <div className=" w-full border-b-1 border-b-gray-700 flex justify-between items-center px-5">
      <div className="flex gap-4 py-2 ease-in-out duration-200">
        <div className={`avatar ${isUserOnline ? "avatar-online" : ""} w-12 rounded-full`}>
          <img src={selectedUser?.photo} className="size-12 rounded-full" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-200">
            {selectedUser?.fullName}
          </h2>
          <p className="text-sm font-normal text-gray-400">
            {selectedUser?.username}
          </p>
        </div>
      </div>
        <RxCross2 onClick={handleUnselectUser} className="text-4xl bg-zinc-500 p-2 rounded-full hover:scale-103 hover:bg-zinc-400 active:scale-95" />
      </div>

      <div className="h-8/10 sm:h-full flex-col inline-block px-5 py-3 overflow-y-auto w-full">
        {messages?.length > 0 ? (
          messages?.map((messageDetails) => (
            <Message key={messageDetails._id} messageDetails={messageDetails} />
          ))
        ) : (
          <div className="h-full w-full flex justify-center items-center text-gray-400 text-center">
            No messages yet
          </div>
        )}
      </div>

      <div className="bg-gray-600 m-2 p-2 rounded-md flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your Message Here..."
          className="input w-full"
          />
        <button
          onClick={handleSendMessage}
          className="bg-gray-700 group hover:bg-gray-500 px-2 rounded-md inline-block active:scale-90 ease-in-out duration-200"
          >
          <BsSend className="text-xl" />
        </button>
      </div>
      </>

}


    </section>
  );
};

export default MessageContainer;
