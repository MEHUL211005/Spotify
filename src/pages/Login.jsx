import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSpotify,
  FaMobileAlt,
  FaGoogle,
  FaFacebook,
  FaApple,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setLoginEmail } from "../store/loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

 const handleContinue = (e) => {
  e.preventDefault();

  dispatch(setLoginEmail(email));

  navigate("/login/password");
};

  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-[430px]">

        {/* Spotify Logo */}
        <div className="flex justify-center mb-4">
          <FaSpotify className="text-[26px] text-white" />
        </div>

        {/* Heading */}
        <h1 className="text-center text-[32px] font-bold mb-7">
          Welcome back
        </h1>

        {/* Email Form */}
        <form onSubmit={handleContinue}>

          <label className="block text-[12px] font-bold mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[33px] bg-transparent border border-[#727272] px-2 text-sm outline-none focus:border-white"
            required
          />

          {/* Continue */}
          <button
            type="submit"
            className="w-full h-[33px] mt-[10px] rounded-full bg-[#1ed760] text-black text-[12px] font-bold hover:bg-[#1fdf64] transition"
          >
            Continue
          </button>

        </form>

        {/* OR */}
        <div className="flex justify-center my-[12px]">
          <span className="text-[12px] text-white">
            or
          </span>
        </div>

        {/* Phone */}
        <button
          type="button"
          className="w-full h-[33px] rounded-full border border-[#727272] flex items-center justify-center gap-3 text-[11px] font-bold hover:border-white transition"
        >
          <FaMobileAlt className="text-[14px]" />
          Continue with phone number
        </button>

        {/* Google */}
        <button
          type="button"
          className="w-full h-[33px] mt-[6px] rounded-full border border-[#727272] flex items-center justify-center gap-3 text-[11px] font-bold hover:border-white transition"
        >
          <FaGoogle className="text-[14px]" />
          Continue with Google
        </button>

        {/* Facebook */}
        <button
          type="button"
          className="w-full h-[33px] mt-[6px] rounded-full border border-[#727272] flex items-center justify-center gap-3 text-[11px] font-bold hover:border-white transition"
        >
          <FaFacebook className="text-[14px]" />
          Continue with Facebook
        </button>

        {/* Apple */}
        <button
          type="button"
          className="w-full h-[33px] mt-[6px] rounded-full border border-[#727272] flex items-center justify-center gap-3 text-[11px] font-bold hover:border-white transition"
        >
          <FaApple className="text-[14px]" />
          Continue with Apple
        </button>

        {/* Signup */}
        <div className="text-center mt-11">
          <p className="text-[11px] text-[#b3b3b3] mb-3">
            Don't have an account?
          </p>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-white text-[12px] font-bold hover:underline"
          >
            Sign up
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;