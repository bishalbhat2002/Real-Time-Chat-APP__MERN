import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({messageDetails}) => {

  const {userProfile, selectedUser} = useSelector(state=>state.userReducer);

  const messageRef = useRef(null)

  let msgBoxdirection;
  let photo;


  if(messageDetails?.senderId === userProfile?._id){
    msgBoxdirection = "chat-end";
    photo = userProfile.photo;
  }else{
      msgBoxdirection = "chat-start";
      photo = selectedUser.photo;
  }

  useEffect(()=>{
    if(messageRef.current){
      messageRef.current.scrollIntoView({behavior:"smooth"});
    }
  }, [])



  return (
    <>
      <div ref={messageRef} className={`chat ${msgBoxdirection} `}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={photo}
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">{new Date(messageDetails.createdAt).toLocaleString("en-US", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true})}</time>
        </div>
        <div className="chat-bubble">{messageDetails.message}</div>
      </div>
    </>
  );
};

export default Message;
