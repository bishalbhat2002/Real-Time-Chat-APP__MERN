
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { signupUserThunk } from "../../store/features/user/user.thunk";
import { toast } from "react-toastify";
import { useGSAP } from "@gsap/react";
import {gsap} from "gsap"

const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    cPassword: "",
    gender: "",
    photo: "",
  });

  const handleInputChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if(!signupData.username || !signupData.password ||!signupData.cPassword ||!signupData.gender ||!signupData.photo){
      return toast.error("All fields are required.");
    }

    if(signupData.password !== signupData.cPassword){
      return toast.error("Login Failed. Password and Confirm Password didnt matched.");
    }
    const response = await dispatch(signupUserThunk(signupData));
    if(response?.payload?.success){
      navigate("/chat");                      // Navigate to home page when signed up successfully.
    }
  };

// useEffect(() => {
//   console.log(signupData);
// }, [signupData]);


  useGSAP(()=>{
    gsap.from(".signup", {
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
        className="signup min-w-[20rem] w-120 bg-zinc-700 rounded-md flex flex-col p-5"
      >
        <h1 className="text-3xl font-bold text-center mb-3">Signup</h1>

        <div className="flex flex-col w-full mb-5">
          <label htmlFor="fullName" className="text-lg text-zinc-300">
            fullName
          </label>
          <input
            type="text"
            onChange={handleInputChange}
            name="fullName"
            placeholder="fullName"
            className="input w-full"
          />
        </div>

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

        <div className="flex flex-col w-full mb-5">
          <label htmlFor="password" className="text-lg text-zinc-300">
            Confirm Password
          </label>
          <input
            type="password"
            name="cPassword"
            onChange={handleInputChange}
            placeholder="Confirm Password"
            className="input w-full"
          />
        </div>
        
        <div className="flex flex-col w-full mb-5">
          <label htmlFor="password" className="text-lg text-zinc-300">
            Profile Pic Link:
          </label>
          <input
            type="text"
            name="photo"
            onChange={handleInputChange}
            placeholder="Profile Pic Link here..."
            className="input w-full"
          />
        </div> 
        
        <div className="flex flex-col w-full mb-5">
          <label htmlFor="gender" className="text-lg text-zinc-300">
            Gender:
          </label>
          <div className="flex gap-8 pl-5">
            <div className="flex gap-2">
              <input type="radio" onChange={handleInputChange} id="male" name="gender" value="male" className="radio" /> <span>Male</span>
            </div>
          <div className="flex gap-2">
            <input type="radio" onChange={handleInputChange} id="female" name="gender" value="female" className="radio" /><span>Female</span>
          </div>
          </div>
        </div>

        <button onClick={handleSignup} className="btn btn-soft btn-primary">Sign up</button>
        <p className="text-zinc-400 text-sm mt-3">
          Don't have an Account?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-bold inline-block hover:scale-103 duration-200"
          >
            Login up
          </Link>{" "}
        </p>
      </form>
    </section>
  );
};

export default Signup;
