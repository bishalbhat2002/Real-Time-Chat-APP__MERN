import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoginUserThunk } from "../../store/features/user/user.thunk";
import { toast } from "react-toastify";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

const Login = () => {
  const buttonLoading = useSelector((state) => state.buttonLoading);
  const {isAuthenticated} = useSelector(state=>state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(isAuthenticated)
      navigate("/");
  }, [isAuthenticated])


  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!loginData.username || !loginData.password)
      return toast.error("All fields are required.");
    
    const response = await dispatch(LoginUserThunk(loginData));

    if(response?.payload?.success){
      navigate("/chat");                  // Navigate to home page on login
    }
    
  };


  useGSAP(()=>{
    gsap.from(".login", {
      opacity:0,
      y:30,
      duration:0.7,
      scale:0.99
    })
  }, [])

  return (
    <section className="h-screen w-screen flex justify-center items-center">
      <form
        action=""
        className="login min-w-[20rem] w-120 bg-zinc-700 rounded-md flex flex-col p-5 mx-2"
      >
        <h1 className="text-3xl font-bold text-center mb-3">Login</h1>

        <div className="flex flex-col w-full mb-5">
          <label htmlFor="username" className="text-lg text-zinc-300">
            Username
          </label>
          <input
            type="text"
            onChange={handleInputChange}
            name="username"
            placeholder="Username"
            className="input w-full"
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label htmlFor="password" className="text-lg text-zinc-300">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            placeholder="Password"
            className="input w-full"
          />
        </div>

        <button
          onClick={handleLogin}
          className="btn btn-soft btn-primary"
          disabled={buttonLoading}
        >
          {" "}
          Login{" "}
        </button>
        <p className="text-zinc-400 text-sm mt-3">
          Don't have an Account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-bold inline-block hover:scale-103 duration-200"
          >
            Sign up
          </Link>{" "}
        </p>
      </form>
    </section>
  );
};

export default Login;
