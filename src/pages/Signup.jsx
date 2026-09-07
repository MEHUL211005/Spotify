import React from "react";
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

  const handleNext = (e) => {
    e.preventDefault();

    dispatch(setEmail(email));

    console.log("Email saved in Redux:", email);

    navigate("/signup/password");
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex justify-center px-4">
      <div className="w-full max-w-[436px] py-8">

        {/* Spotify Logo */}
        <div className="flex justify-center mb-8">
          <FaSpotify className="text-[34px] text-white" />
        </div>

        {/* Heading */}
        <h1 className="text-center text-5xl font-extrabold leading-tight mb-10">
          Sign up to
          <br />
          start listening
        </h1>

        {/* Email Form */}
        <form
          onSubmit={handleNext}
          className="flex flex-col items-center"
        >

          {/* Email */}
          <div className="w-[324px]">
            <label className="block text-sm font-bold mb-2">
              Email address
            </label>

            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              required
              className="w-full h-12 rounded-md border border-[#727272] bg-[#121212] px-3 text-white outline-none placeholder:text-[#a7a7a7] focus:border-white"
            />
          </div>

          {/* Next */}
          <button
            type="submit"
            className="mt-4 w-[324px] h-12 rounded-full bg-[#1ed760] text-black font-extrabold hover:bg-[#1fdf64] transition"
          >
            Next
          </button>
        </form>

        {/* OR */}
        <div className="flex items-center justify-center my-5">
          <span className="text-sm font-bold">
            or
          </span>
        </div>

        {/* Phone */}
        <button
          type="button"
          className="mx-auto flex items-center justify-center gap-4 w-[324px] h-12 rounded-full border border-[#727272] font-extrabold hover:border-white transition"
        >
          <FaMobileAlt className="text-lg" />
          <span>Sign up with phone number</span>
        </button>

        {/* Google */}
        <button
          type="button"
          className="mx-auto mt-2 flex items-center justify-center gap-4 w-[324px] h-12 rounded-full border border-[#727272] font-extrabold hover:border-white transition"
        >
          <FaGoogle className="text-lg" />
          <span>Sign up with Google</span>
        </button>

        {/* Apple */}
        <button
          type="button"
          className="mx-auto mt-2 flex items-center justify-center gap-4 w-[324px] h-12 rounded-full border border-[#727272] font-extrabold hover:border-white transition"
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
            className="mt-2 text-lg font-extrabold text-white underline hover:text-[#1ed760] transition"
          >
            Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default Signup;