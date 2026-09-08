import React, { useState } from "react";
import { FaSpotify, FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { setCredentials } from "../store/authSlice";
import toast from "react-hot-toast";

const LoginPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const email = useSelector((state) => state.login.email);

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

      dispatch(
        setCredentials({
          user,
          accessToken,
          refreshToken,
        }),
      );

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");

      navigate("/");
    },

    onError: (error) => {
      console.error(
        "Login failed:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setPasswordError("");

    // Password validation
    if (!password.trim()) {
      setPasswordError("Password is required");
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
            onChange={(e) => {
              setPassword(e.target.value);

              if (passwordError) {
                setPasswordError("");
              }
            }}
            placeholder="Password"
            className={`w-full h-[33px] bg-transparent px-2 text-[12px] text-white outline-none placeholder:text-[#727272] border ${
              passwordError
                ? "border-red-500"
                : "border-[#727272] focus:border-white"
            }`}
          />

          {/* Inline Validation */}
          {passwordError && (
            <p className="mt-1 text-[11px] text-red-500">
              {passwordError}
            </p>
          )}

          {/* Forgot Password */}
          <Link
            to="/forgot-password"
            className="inline-block mt-3 text-[12px] font-bold text-white underline hover:text-[#1ed760]"
          >
            Forgot password?
          </Link>

          {/* Login */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full h-[33px] mt-7 rounded-full bg-[#1ed760] text-black text-[12px] font-bold hover:bg-[#1fdf64] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending
              ? "Logging in..."
              : "Log in"}
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