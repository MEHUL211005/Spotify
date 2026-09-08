import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/auth";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim() || !token.trim() || !newPassword.trim()) {
      setError("Please fill in all fields.");
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
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-[450px]">

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold">
            Spotify
          </h1>
        </div>

        <div className="rounded-lg bg-[#121212] px-8 py-10">

          <h2 className="text-2xl font-bold">
            Reset your password
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#b3b3b3]">
            Enter the reset token you received in your
            email and choose a new password.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
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
                className="w-full rounded-md border border-[#727272] bg-[#121212] px-4 py-3 text-sm text-white outline-none placeholder:text-[#a7a7a7] focus:border-white"
              />
            </div>

            {/* Token */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Reset token
              </label>

              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter reset token"
                className="w-full rounded-md border border-[#727272] bg-[#121212] px-4 py-3 text-sm text-white outline-none placeholder:text-[#a7a7a7] focus:border-white"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                New password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="New password"
                className="w-full rounded-md border border-[#727272] bg-[#121212] px-4 py-3 text-sm text-white outline-none placeholder:text-[#a7a7a7] focus:border-white"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            {message && (
              <p className="text-sm text-[#1ed760]">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#1ed760] py-3 text-sm font-bold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Resetting..."
                : "Reset password"}
            </button>

          </form>

          <div className="mt-8 border-t border-[#2a2a2a] pt-6 text-center">
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