import React, { useState } from "react";
import { FaSpotify, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
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
  const [showPassword, setShowPassword] = useState(false);
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
        error.response?.data || error.message,
      );

      toast.error(
        error.response?.data?.message ||
          "Invalid email or password. Please try again.",
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setPasswordError("");

    if (!password.trim()) {
      setPasswordError("Password is required");
      return;
    }

    loginMutation.mutate();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121212] px-4 py-6 text-white sm:px-6">
      <div className="w-full max-w-[330px] py-3 sm:max-w-[360px]">

        {/* Logo */}
        <div className="mb-3 flex justify-center">
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white">
            <FaSpotify className="text-[26px] text-[#121212]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="mb-4 text-center text-[32px] font-black leading-[0.94] tracking-[-0.08em] text-white sm:text-[38px]">
          Welcome back
        </h1>

        {/* Email */}
        <div className="mb-5">
          <label className="mb-2 block text-[12px] font-bold text-white">
            Email
          </label>

          <div className="flex h-[40px] w-full items-center justify-between border border-[#585858] bg-transparent px-3">
            <span className="min-w-0 truncate text-[13px] text-white">
              {email}
            </span>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="ml-2 shrink-0 text-[12px] font-bold text-white underline decoration-white/60 underline-offset-4 hover:text-white"
            >
              Change
            </button>
          </div>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit}>
          <label className="mb-2 block text-[12px] font-bold text-white">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                if (passwordError) {
                  setPasswordError("");
                }
              }}
              placeholder="Password"
              className={`h-[40px] w-full border bg-transparent px-3 pr-10 text-[13px] text-white outline-none placeholder:text-[#727272] ${
                passwordError
                  ? "border-red-500"
                  : "border-[#585858] focus:border-white"
              }`}
            />

            {/* Show / Hide Password */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b3b3b3] transition hover:text-white"
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
            >
              {showPassword ? (
                <FaEyeSlash size={16} />
              ) : (
                <FaEye size={16} />
              )}
            </button>
          </div>

          {/* Password Error */}
          {passwordError && (
            <p className="mt-1 text-[11px] text-red-500">
              {passwordError}
            </p>
          )}

          {/* Forgot Password */}
          <Link
            to="/forgot-password"
            className="mt-3 inline-block text-[12px] font-bold text-white underline decoration-white/60 underline-offset-4 hover:text-white"
          >
            Forgot password?
          </Link>

          {/* Login */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="mt-5 h-[42px] w-full rounded-full bg-[#1ed760] text-[14px] font-bold text-black transition hover:bg-[#1fdf64] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loginMutation.isPending ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* Back */}
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-[12px] text-[#b3b3b3] transition hover:text-white"
          >
            <FaArrowLeft />
            Back
          </button>
        </div>

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
      </div>
    </div>
  );
};

export default LoginPassword;