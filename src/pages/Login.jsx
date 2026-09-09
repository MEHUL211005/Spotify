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
    <div className="flex min-h-screen items-center justify-center bg-[#121212] px-4 py-6 text-white sm:px-6">
      <div className="w-full max-w-[330px] py-3 sm:max-w-[360px]">

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white">
            <FaSpotify className="text-[26px] text-[#121212]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="mb-6 text-center text-[32px] font-black leading-[0.94] tracking-[-0.08em] text-white sm:text-[38px]">
          Welcome back
        </h1>

        {/* Email Form */}
        <form onSubmit={handleContinue}>
          {/* Email Label */}
          <label className="mb-2 block text-[12px] font-bold text-white">
            Email
          </label>

          {/* Email Input */}
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);

              if (emailError) {
                setEmailError("");
              }
            }}
            className={`h-[40px] w-full rounded-[4px] border bg-transparent px-3 text-[13px] text-white outline-none ${
              emailError
                ? "border-red-500"
                : "border-[#585858] focus:border-white"
            }`}
          />

          {/* Email Error */}
          {emailError && (
            <p className="mt-1 text-[11px] text-red-500">
              {emailError}
            </p>
          )}

          {/* Continue */}
          <button
            type="submit"
            className="mt-4 h-[42px] w-full rounded-full bg-[#1ed760] text-[14px] font-bold text-black transition hover:bg-[#1fdf64]"
          >
            Continue
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#2a2a2a]" />

          <span className="text-[12px] font-medium text-[#d9d9d9]">
            or
          </span>

          <div className="h-px flex-1 bg-[#2a2a2a]" />
        </div>

        {/* Phone Login */}
        <button
          type="button"
          onClick={() => toast("Phone login coming soon")}
          className="relative flex h-[42px] w-full items-center justify-center rounded-full border border-[#6a6a6a] bg-transparent text-[13px] font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.22)]"
        >
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            <FaMobileAlt className="text-[14px]" />
          </span>

          <span className="block px-8 text-center text-[12px] sm:px-0 sm:text-[13px]">
            Continue with phone number
          </span>
        </button>

        {/* Google Login */}
        <button
          type="button"
          onClick={() => toast("Google login coming soon")}
          className="relative mt-2 flex h-[42px] w-full items-center justify-center rounded-full border border-[#6a6a6a] bg-transparent text-[13px] font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.22)]"
        >
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            <FaGoogle className="text-[14px] text-[#4285F4]" />
          </span>

          <span className="block text-center">
            Continue with Google
          </span>
        </button>

        {/* Facebook Login */}
        <button
          type="button"
          onClick={() => toast("Facebook login coming soon")}
          className="relative mt-2 flex h-[42px] w-full items-center justify-center rounded-full border border-[#6a6a6a] bg-transparent text-[13px] font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.22)]"
        >
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            <FaFacebook className="text-[14px] text-[#1877F2]" />
          </span>

          <span className="block text-center">
            Continue with Facebook
          </span>
        </button>

        {/* Apple Login */}
        <button
          type="button"
          onClick={() => toast("Apple login coming soon")}
          className="relative mt-2 flex h-[42px] w-full items-center justify-center rounded-full border border-[#6a6a6a] bg-transparent text-[13px] font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.22)]"
        >
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            <FaApple className="text-[14px] text-white" />
          </span>

          <span className="block text-center">
            Continue with Apple
          </span>
        </button>

        {/* Sign Up */}
        <div className="mt-5 text-center">
          <p className="mb-2 text-[12px] text-[#b3b3b3]">
            Don't have an account?
          </p>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-[13px] font-bold text-white underline decoration-white/60 underline-offset-4 hover:text-white"
          >
            Sign up
          </button>
        </div>

        {/* reCAPTCHA */}
        <div className="mt-8 px-2 text-center text-[10px] leading-[1.5] text-[#b3b3b3] sm:px-0 sm:text-[11px]">
          This site is protected by reCAPTCHA and the Google

          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="ml-1 text-white underline decoration-white/60 underline-offset-2"
          >
            Privacy Policy
          </a>

          and

          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noreferrer"
            className="ml-1 text-white underline decoration-white/60 underline-offset-2"
          >
            Terms of Service
          </a>

          apply.
        </div>
      </div>
    </div>
  );
};

export default Login;