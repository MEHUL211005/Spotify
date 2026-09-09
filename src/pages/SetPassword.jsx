import React, { useState } from "react";
import {
  FaSpotify,
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPassword } from "../store/signupSlice";

const SetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const password = useSelector(
    (state) => state.signup.password
  );

  // Password validations
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumberOrSpecial = /[\d\W_]/.test(password);
  const hasTenCharacters = password.length >= 10;

  const handleNext = (e) => {
    e.preventDefault();

    setError("");

    if (!hasLetter || !hasNumberOrSpecial || !hasTenCharacters) {
      setError(
        "Please fulfill the requirements mentioned above."
      );
      return;
    }

    dispatch(setPassword(password));

    console.log("Password saved in Redux:", password);

    navigate("/signup/details");
  };

  return (
    <div className="flex min-h-screen justify-center bg-[#121212] text-white">

      <div className="w-full max-w-[436px] px-4 pt-12">

        {/* Spotify Logo */}
        <div className="mb-10 flex justify-center">
          <FaSpotify className="text-[32px] text-white" />
        </div>

        {/* Progress Bar */}
        <div className="mb-5 h-[2px] w-full bg-[#727272]">
          <div className="h-[2px] w-1/3 bg-[#1ed760]"></div>
        </div>

        {/* Step + Back Arrow */}
        <div className="flex items-start gap-5">

          {/* Back Arrow */}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="mt-1 text-[#b3b3b3] transition hover:text-white"
            aria-label="Go back"
          >
            <FaArrowLeft className="text-xl" />
          </button>

          <div className="flex-1">

            {/* Step */}
            <p className="mb-2 text-[15px] text-[#b3b3b3]">
              Step 1 of 3
            </p>

            {/* Title */}
            <h1 className="mb-9 text-[16px] font-bold">
              Create a password
            </h1>

            {/* Form */}
            <form
              onSubmit={handleNext}
              noValidate
            >

              {/* Password Label */}
              <label className="mb-2 block text-[14px] font-bold">
                Password
              </label>

              {/* Password Input */}
              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) => {
                    dispatch(
                      setPassword(e.target.value)
                    );

                    if (error) {
                      setError("");
                    }
                  }}
                  className={`h-12 w-full rounded-md border bg-[#121212] px-3 pr-12 text-white outline-none focus:border-white ${
                    error
                      ? "border-red-500"
                      : "border-[#727272]"
                  }`}
                />

                {/* Eye Icon */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b3b3b3] hover:text-white"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-xl" />
                  ) : (
                    <FaEye className="text-xl" />
                  )}
                </button>

              </div>

              {/* Password Requirements */}
              <div className="mt-5">

                <p className="mb-3 text-[14px] font-bold">
                  Your password must contain at least
                </p>

                {/* Requirement 1 */}
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className={
                      hasLetter
                        ? "text-[#1ed760]"
                        : error
                        ? "text-red-500"
                        : "text-[#b3b3b3]"
                    }
                  >
                    {hasLetter ? "✓" : "○"}
                  </span>

                  <span
                    className={
                      hasLetter
                        ? "text-[#1ed760]"
                        : error
                        ? "text-red-500"
                        : "text-white"
                    }
                  >
                    1 letter
                  </span>
                </div>

                {/* Requirement 2 */}
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className={
                      hasNumberOrSpecial
                        ? "text-[#1ed760]"
                        : error
                        ? "text-red-500"
                        : "text-[#b3b3b3]"
                    }
                  >
                    {hasNumberOrSpecial ? "✓" : "○"}
                  </span>

                  <span
                    className={
                      hasNumberOrSpecial
                        ? "text-[#1ed760]"
                        : error
                        ? "text-red-500"
                        : "text-white"
                    }
                  >
                    1 number or special character
                    {" "}
                    (example: # ? ! &)
                  </span>
                </div>

                {/* Requirement 3 */}
                <div className="flex items-center gap-2">
                  <span
                    className={
                      hasTenCharacters
                        ? "text-[#1ed760]"
                        : error
                        ? "text-red-500"
                        : "text-[#b3b3b3]"
                    }
                  >
                    {hasTenCharacters ? "✓" : "○"}
                  </span>

                  <span
                    className={
                      hasTenCharacters
                        ? "text-[#1ed760]"
                        : error
                        ? "text-red-500"
                        : "text-white"
                    }
                  >
                    10 characters
                  </span>
                </div>

                {/* General Error */}
                {error && (
                  <p className="mt-3 text-sm text-red-500">
                    {error}
                  </p>
                )}

              </div>

              {/* Next Button */}
              <button
                type="submit"
                className="mt-12 h-12 w-full rounded-full bg-[#1ed760] font-bold text-black transition hover:bg-[#1fdf64]"
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