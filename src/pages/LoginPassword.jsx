import React, { useState } from "react";
import { FaSpotify, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import { loginUser } from "../api/auth";
import { setCredentials } from "../store/authSlice";

const LoginPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");

  // Email Redux se aa raha hai
  const email = useSelector((state) => state.login.email);

  // Login API
  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await loginUser({
        email,
        password,
      });

      return response;
    },

    onSuccess: (data) => {
      console.log("Login successful:", data);

      const user = data.data.user;
      const accessToken = data.data.accessToken;
      const refreshToken = data.data.refreshToken;

      // Redux me auth data save
      dispatch(
        setCredentials({
          user,
          accessToken,
          refreshToken,
        })
      );

      // LocalStorage me tokens save
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Auth data saved successfully");

      // Home page
      navigate("/");
    },

    onError: (error) => {
      console.error(
        "Login failed:",
        error.response?.data || error.message
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    loginMutation.mutate();
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

        {/* Email */}
        <div className="mb-5">
          <label className="block text-[12px] font-bold mb-2">
            Email
          </label>

          <div className="flex items-center justify-between w-full h-[33px] border border-[#727272] px-2">
            <span className="text-[12px] text-white truncate">
              {email}
            </span>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-[12px] font-bold underline hover:text-[#1ed760]"
            >
              Change
            </button>
          </div>
        </div>

        {/* Password */}
        <form onSubmit={handleSubmit}>
          <label className="block text-[12px] font-bold mb-2">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full h-[33px] bg-transparent border border-[#727272] px-2 text-[12px] text-white outline-none placeholder:text-[#727272] focus:border-white"
          />

          {/* Error Message */}
          {loginMutation.isError && (
            <p className="mt-3 text-[12px] text-red-400">
              {loginMutation.error?.response?.data?.message ||
                "Invalid email or password. Please try again."}
            </p>
          )}

          {/* Forgot Password */}
          <button
            type="button"
            className="mt-3 text-[12px] text-white underline hover:text-[#1ed760]"
          >
            Forgot password?
          </button>

          {/* Login */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full h-[33px] mt-7 rounded-full bg-[#1ed760] text-black text-[12px] font-bold hover:bg-[#1fdf64] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* Back */}
        <div className="flex justify-center mt-7">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-[12px] text-[#b3b3b3] hover:text-white transition"
          >
            <FaArrowLeft />
            Back
          </button>
        </div>

        {/* Signup */}
        <div className="text-center mt-9">
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

export default LoginPassword;