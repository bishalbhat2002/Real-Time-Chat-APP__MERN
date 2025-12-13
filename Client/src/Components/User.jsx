

import { setSelectedUser } from "../store/features/user/user.slice"
import { useDispatch, useSelector } from "react-redux";

export const User = ({userDetails}) => {

  const { selectedUser } = useSelector(state=>state.userReducer);
  const { onlineUsers } = useSelector(state=>state.socketReducer)

  // console.log(onlineUsers)
  const isUserOnline = onlineUsers?.includes(userDetails._id);
  // const isUserOnline = true

  const dispatch = useDispatch();

  const handleUserClick = (user)=>{
    dispatch(setSelectedUser(user));
  }

  return (
    <div 
    onClick={()=>{handleUserClick(userDetails)}}
    className={`flex gap-4 p-2 border-b-1 mx-2 my-1 rounded-md border-b-gray-700 hover:bg-gray-600 active:scale-95 ease-in-out duration-200  
      ${(userDetails?._id===selectedUser?._id) ? "bg-gray-700" : ""}
    `}>
      <div className={`avatar ${isUserOnline ? "avatar-online" : ""}  w-12 rounded-full`}>
        <img
          src={userDetails.photo}
          className="size-12 rounded-full"
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-200 line-clamp-1">{userDetails?.fullName}</h2>
        <p className="text-sm font-normal text-gray-400 line-clamp-1">{userDetails?.username}</p>
      </div>
    </div>
  );
};


export default User;