import React, { useState } from "react";

import {
  FaSpotify,
  FaMobileAlt,
  FaGoogle,
  FaApple,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { setEmail } from "../store/signupSlice";

const Signup = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const email = useSelector((state) => state.signup.email);

  const [error, setError] = useState("");

  const handleNext = (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    dispatch(setEmail(email));

    console.log("Email saved in Redux:", email);

    navigate("/signup/password");
  };

  return (
    <div className="flex min-h-screen justify-center bg-[#121212] px-4 py-6 text-white sm:px-6">
      <div className="w-full max-w-[436px] py-4 sm:py-8">

        {/* Spotify Logo */}
        <div className="mb-6 flex justify-center sm:mb-8">
          <FaSpotify className="text-[30px] text-white sm:text-[34px]" />
        </div>

        {/* Heading */}
        <h1 className="mb-8 text-center text-3xl font-extrabold leading-tight sm:mb-10 sm:text-5xl">
          Sign up to
          <br />
          start listening
        </h1>

        {/* Email Form */}
        <form
          onSubmit={handleNext}
          noValidate
          className="flex flex-col items-center"
        >
          {/* Email */}
          <div className="w-full max-w-[324px]">
            <label className="mb-2 block text-sm font-bold">
              Email address
            </label>

            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => {
                dispatch(setEmail(e.target.value));

                if (error) {
                  setError("");
                }
              }}
              className={`h-12 w-full rounded-md border bg-[#121212] px-3 text-sm text-white outline-none placeholder:text-[#a7a7a7] focus:border-white sm:text-base ${
                error
                  ? "border-red-500"
                  : "border-[#727272]"
              }`}
            />

            {/* Inline Error */}
            {error && (
              <p className="mt-2 text-sm text-red-500">
                {error}
              </p>
            )}
          </div>

          {/* Next */}
          <button
            type="submit"
            className="mt-4 h-12 w-full max-w-[324px] rounded-full bg-[#1ed760] font-extrabold text-black transition hover:bg-[#1fdf64]"
          >
            Next
          </button>
        </form>

        {/* OR */}
        <div className="my-5 flex items-center justify-center">
          <span className="text-sm font-bold">
            or
          </span>
        </div>

        {/* Phone */}
        <button
          type="button"
          className="relative mx-auto flex h-12 w-full max-w-[324px] items-center justify-center rounded-full border border-[#727272] px-10 font-extrabold transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.22)]"
        >
          <span className="absolute left-5 top-1/2 -translate-y-1/2">
            <FaMobileAlt className="text-lg" />
          </span>

          <span className="block text-center text-sm sm:text-base">
            Sign up with phone number
          </span>
        </button>

        {/* Google */}
        <button
          type="button"
          className="relative mx-auto mt-2 flex h-12 w-full max-w-[324px] items-center justify-center rounded-full border border-[#727272] px-10 font-extrabold transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.22)]"
        >
          <span className="absolute left-5 top-1/2 -translate-y-1/2">
            <FaGoogle className="text-lg" />
          </span>

          <span className="block text-center text-sm sm:text-base">
            Sign up with Google
          </span>
        </button>

        {/* Apple */}
        <button
          type="button"
          className="relative mx-auto mt-2 flex h-12 w-full max-w-[324px] items-center justify-center rounded-full border border-[#727272] px-10 font-extrabold transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.22)]"
        >
          <span className="absolute left-5 top-1/2 -translate-y-1/2">
            <FaApple className="text-xl" />
          </span>

          <span className="block text-center text-sm sm:text-base">
            Sign up with Apple
          </span>
        </button>

        {/* Login */}
        <div className="mt-8 text-center sm:mt-10">
          <p className="text-sm text-[#b3b3b3] sm:text-base">
            Already have an account?
          </p>

          <button
            onClick={() => navigate("/login")}
            type="button"
            className="mt-2 text-base font-extrabold text-white underline transition hover:text-[#1ed760] sm:text-lg"
          >
            Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default Signup;