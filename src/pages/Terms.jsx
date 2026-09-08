import React, { useState } from "react";
import { FaSpotify, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/auth";
import toast from "react-hot-toast";

const Terms = () => {
  const [marketing, setMarketing] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);

  const navigate = useNavigate();

  // Redux se signup data
  const { email, password, name, phone } = useSelector(
    (state) => state.signup
  );

  // TanStack Query mutation
 const registerMutation = useMutation({
  mutationFn: registerUser,

  onSuccess: (data) => {
    console.log("Registration successful:", data);

    toast.success(
      data?.message || "User registered successfully!"
    );

    navigate("/signup/verify-otp");
  },

  onError: (error) => {
    console.error("Registration failed:", error);

    toast.error(
      error.response?.data?.message ||
        "Registration failed. Please try again."
    );
  },
});

  const handleSignup = (e) => {
    e.preventDefault();

    if (!marketing || !dataSharing) {
      return;
    }

    const userData = {
      name,
      email,
      phone,
      password,
    };

    console.log("Signup Data:", userData);

    // API call
    registerMutation.mutate(userData);
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
          <div className="h-[2px] w-full bg-[#1ed760]"></div>
        </div>

        {/* Back + Content */}
        <div className="flex items-start gap-5">

          {/* Back Arrow */}
          <button
            type="button"
            onClick={() => navigate("/signup/details")}
            className="mt-1 text-[#b3b3b3] hover:text-white transition"
            aria-label="Go back"
          >
            <FaArrowLeft className="text-xl" />
          </button>

          <div className="flex-1">

            {/* Step */}
            <p className="text-[15px] text-[#b3b3b3] mb-2">
              Step 3 of 3
            </p>

            {/* Heading */}
            <h1 className="text-[16px] font-bold mb-9">
              Terms & Conditions
            </h1>

            <form onSubmit={handleSignup}>

              {/* Checkbox 1 */}
              <label className="flex items-start gap-3 rounded-md bg-[#2a2a2a] p-4 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#1ed760]"
                />

                <span className="text-[14px] leading-5">
                  I would prefer not to receive marketing
                  emails from Spotify.
                </span>
              </label>

              {/* Checkbox 2 */}
              <label className="flex items-start gap-3 rounded-md bg-[#2a2a2a] p-4 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dataSharing}
                  onChange={(e) => setDataSharing(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#1ed760]"
                />

                <span className="text-[14px] leading-5">
                  Share my registration data with Spotify's
                  content providers for marketing purposes.
                </span>
              </label>

              {/* Information */}
              <div className="text-[14px] leading-5">

                <p className="mb-4">
                  Spotify is a personalised service.
                </p>

                <p className="mb-4">
                  By clicking on ‘Sign up’, you agree to
                  Spotify's{" "}
                  <span className="text-[#1ed760] underline cursor-pointer">
                    Terms and Conditions of Use
                  </span>
                  .
                </p>

                <p>
                  By clicking on Sign Up, you confirm that you
                  have read how we process your personal data in
                  our{" "}
                  <span className="text-[#1ed760] underline cursor-pointer">
                    Privacy Policy
                  </span>
                  .
                </p>

              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={
                  !marketing ||
                  !dataSharing ||
                  registerMutation.isPending
                }
                className="mt-12 w-full h-12 rounded-full bg-[#1ed760] text-black font-bold transition hover:bg-[#1fdf64] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {registerMutation.isPending ? "Signing up..." : "Sign up"}
              </button>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Terms;