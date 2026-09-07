import React, { useState } from "react";
import { FaSpotify, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import api from "../api/axios";
import { setCredentials } from "../store/authSlice";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.signup.email);

  const verifyOTPMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        "/users/verify-registration-otp",
        {
          email,
          otp,
        }
      );

      return response.data;
    },

    onSuccess: (data) => {
      console.log("OTP verified successfully:", data);

      // Backend response:
      // data.data = {
      //   user,
      //   accessToken,
      //   refreshToken
      // }

      const user = data.data.user;
      const accessToken = data.data.accessToken;
      const refreshToken = data.data.refreshToken;

      // Save authentication data in Redux
      dispatch(
        setCredentials({
          user,
          accessToken,
          refreshToken,
        })
      );

      // Save tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      console.log("Auth data saved in Redux and localStorage");

      navigate("/");
    },

    onError: (error) => {
      console.error(
        "OTP verification failed:",
        error.response?.data || error.message
      );
    },
  });

  const handleVerify = (e) => {
    e.preventDefault();

    if (!otp) {
      return;
    }

    verifyOTPMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex justify-center">
      <div className="w-full max-w-[436px] px-4 pt-12">

        {/* Spotify Logo */}
        <div className="flex justify-center mb-10">
          <FaSpotify className="text-[32px] text-white" />
        </div>

        {/* Progress */}
        <div className="h-[2px] w-full bg-[#727272] mb-5">
          <div className="h-[2px] w-full bg-[#1ed760]" />
        </div>

        <div className="flex items-start gap-5">

          {/* Back */}
          <button
            type="button"
            onClick={() => navigate("/signup/terms")}
            className="mt-1 text-[#b3b3b3] hover:text-white transition"
            aria-label="Go back"
          >
            <FaArrowLeft className="text-xl" />
          </button>

          <div className="flex-1">

            <p className="text-[15px] text-[#b3b3b3] mb-2">
              Verify your email
            </p>

            <h1 className="text-[24px] font-bold mb-3">
              Enter your OTP
            </h1>

            <p className="text-[14px] text-[#b3b3b3] leading-5 mb-8">
              We sent a verification code to
              <br />
              <span className="text-white">{email}</span>
            </p>

            <form onSubmit={handleVerify}>

              {/* OTP */}
              <label className="block text-[14px] font-bold mb-2">
                OTP
              </label>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                maxLength={6}
                required
                className="w-full h-12 rounded-md border border-[#727272] bg-[#121212] px-3 text-white outline-none placeholder:text-[#727272] focus:border-white"
              />

              {/* Error */}
              {verifyOTPMutation.isError && (
                <p className="mt-3 text-sm text-red-400">
                  {verifyOTPMutation.error?.response?.data?.message ||
                    "Invalid OTP. Please try again."}
                </p>
              )}

              {/* Verify Button */}
              <button
                type="submit"
                disabled={verifyOTPMutation.isPending}
                className="mt-8 w-full h-12 rounded-full bg-[#1ed760] text-black font-bold hover:bg-[#1fdf64] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {verifyOTPMutation.isPending
                  ? "Verifying..."
                  : "Verify OTP"}
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;