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
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleContinue = (e) => {
    e.preventDefault();

    // Clear previous error
    setEmailError("");

    // Empty email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Store email in Redux
    dispatch(setLoginEmail(email));

    // Toast
    toast.success("Email verified");

    // Navigate
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
            onChange={(e) => {
              setEmail(e.target.value);

              // Remove error while user starts correcting
              if (emailError) {
                setEmailError("");
              }
            }}
            className={`w-full h-[33px] bg-transparent px-2 text-sm outline-none border ${
              emailError
                ? "border-red-500"
                : "border-[#727272] focus:border-white"
            }`}
          />

          {/* Inline Error */}
          {emailError && (
            <p className="text-red-500 text-[11px] mt-1">
              {emailError}
            </p>
          )}

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
          onClick={() => toast("Phone login coming soon")}
          className="w-full h-[33px] rounded-full border border-[#727272] flex items-center justify-center gap-3 text-[11px] font-bold hover:border-white transition"
        >
          <FaMobileAlt className="text-[14px]" />
          Continue with phone number
        </button>

        {/* Google */}
        <button
          type="button"
          onClick={() => toast("Google login coming soon")}
          className="w-full h-[33px] mt-[6px] rounded-full border border-[#727272] flex items-center justify-center gap-3 text-[11px] font-bold hover:border-white transition"
        >
          <FaGoogle className="text-[14px]" />
          Continue with Google
        </button>

        {/* Facebook */}
        <button
          type="button"
          onClick={() => toast("Facebook login coming soon")}
          className="w-full h-[33px] mt-[6px] rounded-full border border-[#727272] flex items-center justify-center gap-3 text-[11px] font-bold hover:border-white transition"
        >
          <FaFacebook className="text-[14px]" />
          Continue with Facebook
        </button>

        {/* Apple */}
        <button
          type="button"
          onClick={() => toast("Apple login coming soon")}
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

