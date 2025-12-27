import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IoSearch, IoLogOut } from "react-icons/io5";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk } from "../store/features/user/user.thunk";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";


const ChatSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { otherUsers, userProfile, usersLoader, selectedUser } = useSelector(
    (state) => state.userReducer
  );

  const handleLoguout = async () => {
    const response = await dispatch(logoutUserThunk());
    if(response?.payload?.success){
      navigate("/login", {replace:true});
    }
  };

  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(otherUsers);
  
  // setFilteredUsers(otherUsers);

  useEffect(() => {
    if (!searchValue.trim()) {
      setFilteredUsers(otherUsers);
    } else {
      let fUsers = otherUsers?.filter((user) => {
        return user?.fullName?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
               user?.username?.toLowerCase()?.includes(searchValue.toLowerCase());
      });

      console.log(fUsers)
      setFilteredUsers(fUsers);
    }
  }, [searchValue, otherUsers]);

    useGSAP(()=>{
    gsap.from(".logo", {
      opacity:0,
      y:20,
      duration:0.7,
    });
  }, )



  return (
    <section className={`overflow-hidden bg-zinc-800 h-full w-full sm:w-[20rem] ${selectedUser ? "hidden" : "flex"} sm:flex flex-col border-r-1 border-r-gray-500`}>
      <h1 className="logo text-4xl font-extrabold bg-zinc-700 text-orange-400 text-center pb-3 pt-2 m-2 rounded-md ">
        CHAT APP
      </h1>

      <div className="px-3 mb-3">
        <label className="input w-full">
          <IoSearch />
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            type="search"
            className="grow"
            placeholder="Search"
          />
        </label>
      </div>

      <div className="h-full flex-col inline-block overflow-y-auto">
        {usersLoader && <div className="h-full w-full p-5"> loading...</div>}

        {!usersLoader && filteredUsers?.map((userDetails) => {
            return <User key={userDetails._id} userDetails={userDetails} className="user" />;
          })}
      </div>

      {userProfile && (
        <div className="user-profile h-[5rem] bg-gray-700 m-2 rounded-md flex justify-between items-center p-3">
          <div className="flex gap-3">
            <div className="avatar">
              <img
                src={userProfile?.photo}
                className="size-13 rounded-full border-3 border-green-600"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-200">
                {userProfile?.fullName}
              </h2>
              <p className="text-sm font-normal text-gray-400">
                {userProfile?.username}
              </p>
            </div>
          </div>
          <div
            onClick={handleLoguout}
            className="bg-gray-600 p-2 rounded-full ease-in-out duration-200 group hover:bg-gray-500 active:scale-95"
          >
            <IoLogOut className="text-3xl group-hover:translate-x-2 duration-200 ease-in-out" />
          </div>
        </div>
      )}
    </section>
  );
};

export default ChatSidebar;
