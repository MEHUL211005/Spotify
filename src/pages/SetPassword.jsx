import React, { useState } from "react";
import { FaSpotify, FaArrowLeft, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPassword } from "../store/signupSlice";

const SetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const password = useSelector((state) => state.signup.password);

  const handleNext = (e) => {
    e.preventDefault();

    dispatch(setPassword(password));

    console.log("Password saved in Redux:", password);

    navigate("/signup/details");
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex justify-center">

      <div className="w-full max-w-[436px] px-4 pt-12">

        {/* Spotify Logo */}
        <div className="flex justify-center mb-10">
          <FaSpotify className="text-[32px] text-white" />
        </div>

        {/* Progress Bar */}
        <div className="h-[2px] w-full bg-[#727272] mb-5">
          <div className="h-[2px] w-1/3 bg-[#1ed760]"></div>
        </div>

        {/* Step + Back Arrow */}
        <div className="flex items-start gap-5">

          {/* Back Arrow */}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="mt-1 text-[#b3b3b3] hover:text-white transition"
            aria-label="Go back"
          >
            <FaArrowLeft className="text-xl" />
          </button>

          <div className="flex-1">

            {/* Step */}
            <p className="text-[15px] text-[#b3b3b3] mb-2">
              Step 1 of 3
            </p>

            {/* Title */}
            <h1 className="text-[16px] font-bold mb-9">
              Create a password
            </h1>

            {/* Form */}
            <form onSubmit={handleNext}>

              {/* Password Label */}
              <label className="block text-[14px] font-bold mb-2">
                Password
              </label>

              {/* Password Input */}
              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => dispatch(setPassword(e.target.value))}
                  required
                  className="w-full h-12 rounded-md border border-[#727272] bg-[#121212] px-3 pr-12 text-white outline-none focus:border-white"
                />

                {/* Eye Icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b3b3b3] hover:text-white"
                  aria-label="Show password"
                >
                  <FaEyeSlash className="text-xl" />
                </button>

              </div>

              {/* Password Requirements */}
              <div className="mt-5">

                <p className="text-[14px] font-bold mb-3">
                  Your password must contain at least
                </p>

                {/* Requirement 1 */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[14px]">
                    1 letter
                  </span>
                </div>

                {/* Requirement 2 */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[14px]">
                    1 number or special character (example: # ? ! &)
                  </span>
                </div>

                {/* Requirement 3 */}
                <div className="flex items-center gap-2">
                  <span className="text-[14px]">
                    10 characters
                  </span>
                </div>

              </div>

              {/* Next Button */}
              <button
                type="submit"
                className="mt-12 w-full h-12 rounded-full bg-[#1ed760] text-black font-bold hover:bg-[#1fdf64] transition"
              >
                Next
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SetPassword;