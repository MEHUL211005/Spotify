import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { resetPassword } from "../api/auth";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(
    () =>
      location.state?.email ||
      localStorage.getItem("resetPasswordEmail") ||
      "",
  );

  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !email.trim() ||
      !token.trim() ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // Confirm password validation
    if (newPassword !== confirmPassword) {
      setError("Password is not same.");
      return;
    }

    try {
      setLoading(true);

      const response = await resetPassword({
        email,
        token,
        newPassword,
      });

      setMessage(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-6 text-white sm:px-6">
      <div className="w-full max-w-[450px]">
        {/* Logo */}
        <div className="mb-7 text-center sm:mb-10">
          <h1 className="text-3xl font-bold">Spotify</h1>
        </div>

        {/* Card */}
        <div className="rounded-lg bg-[#121212] px-5 py-8 sm:px-8 sm:py-10">
          {/* Heading */}
          <h2 className="text-xl font-bold sm:text-2xl">
            Reset your password
          </h2>

          {/* Description */}
          <p className="mt-3 text-sm leading-5 text-[#b3b3b3] sm:leading-6">
            Enter the OTP you received in your email and choose a new password.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5 sm:mt-8"
          >
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Email address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                disabled={loading}
                className="w-full rounded-md border border-[#727272] bg-[#121212] px-4 py-3 text-sm text-white outline-none placeholder:text-[#a7a7a7] focus:border-white disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* OTP */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                OTP
              </label>

              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter OTP"
                disabled={loading}
                className="w-full rounded-md border border-[#727272] bg-[#121212] px-4 py-3 text-sm text-white outline-none placeholder:text-[#a7a7a7] focus:border-white disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                New password
              </label>

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  disabled={loading}
                  className="w-full rounded-md border border-[#727272] bg-[#121212] px-4 py-3 pr-10 text-sm text-white outline-none placeholder:text-[#a7a7a7] focus:border-white disabled:cursor-not-allowed disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b3b3b3] transition hover:text-white"
                  aria-label={
                    showNewPassword
                      ? "Hide new password"
                      : "Show new password"
                  }
                >
                  {showNewPassword ? (
                    <FaEyeSlash size={16} />
                  ) : (
                    <FaEye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Confirm password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm password"
                  disabled={loading}
                  className="w-full rounded-md border border-[#727272] bg-[#121212] px-4 py-3 pr-10 text-sm text-white outline-none placeholder:text-[#a7a7a7] focus:border-white disabled:cursor-not-allowed disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b3b3b3] transition hover:text-white"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={16} />
                  ) : (
                    <FaEye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            {/* Success */}
            {message && (
              <p className="text-sm text-[#1ed760]">
                {message}
              </p>
            )}

            {/* Reset Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#1ed760] py-3 text-sm font-bold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset password"}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 border-t border-[#2a2a2a] pt-5 text-center sm:mt-8 sm:pt-6">
            <Link
              to="/login"
              className="text-sm font-bold text-white underline hover:text-[#1ed760]"
            >
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;