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
    <div className="flex min-h-screen justify-center bg-[#121212] px-4 text-white">
      <div className="w-full max-w-[436px] py-8">

        {/* Spotify Logo */}
        <div className="mb-8 flex justify-center">
          <FaSpotify className="text-[34px] text-white" />
        </div>

        {/* Heading */}
        <h1 className="mb-10 text-center text-5xl font-extrabold leading-tight">
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
          <div className="w-[324px]">
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
              className={`h-12 w-full rounded-md border bg-[#121212] px-3 text-white outline-none placeholder:text-[#a7a7a7] focus:border-white ${
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
            className="mt-4 h-12 w-[324px] rounded-full bg-[#1ed760] font-extrabold text-black transition hover:bg-[#1fdf64]"
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
          className="mx-auto flex h-12 w-[324px] items-center justify-center gap-4 rounded-full border border-[#727272] font-extrabold transition hover:border-white"
        >
          <FaMobileAlt className="text-lg" />
          <span>Sign up with phone number</span>
        </button>

        {/* Google */}
        <button
          type="button"
          className="mx-auto mt-2 flex h-12 w-[324px] items-center justify-center gap-4 rounded-full border border-[#727272] font-extrabold transition hover:border-white"
        >
          <FaGoogle className="text-lg" />
          <span>Sign up with Google</span>
        </button>

        {/* Apple */}
        <button
          type="button"
          className="mx-auto mt-2 flex h-12 w-[324px] items-center justify-center gap-4 rounded-full border border-[#727272] font-extrabold transition hover:border-white"
        >
          <FaApple className="text-xl" />
          <span>Sign up with Apple</span>
        </button>

        {/* Login */}
        <div className="mt-10 text-center">
          <p className="text-base text-[#b3b3b3]">
            Already have an account?
          </p>

          <button
            onClick={() => navigate("/login")}
            type="button"
            className="mt-2 text-lg font-extrabold text-white underline transition hover:text-[#1ed760]"
          >
            Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default Signup;