import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPassword(email);

      setMessage(response.message);
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

        {/* Logo */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Spotify
          </h1>
        </div>

        {/* Card */}
        <div className="rounded-lg bg-[#121212] px-8 py-10">

          {/* Heading */}
          <h2 className="text-2xl font-bold">
            Reset your password
          </h2>

          {/* Description */}
          <p className="mt-3 text-sm leading-6 text-[#b3b3b3]">
            Enter the email address you used to register.
            We'll send you a password reset token.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8"
          >
            {/* Email */}
            <label className="mb-2 block text-sm font-bold">
              Email address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              disabled={loading}
              className="w-full rounded-md border border-[#727272] bg-[#121212] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#a7a7a7] focus:border-white disabled:cursor-not-allowed disabled:opacity-50"
            />

            {/* Error */}
            {error && (
              <p className="mt-3 text-sm text-red-500">
                {error}
              </p>
            )}

            {/* Success */}
            {message && (
              <p className="mt-3 text-sm leading-5 text-[#1ed760]">
                {message}
              </p>
            )}

            {/* Send Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-[#1ed760] py-3 text-sm font-bold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send reset token"}
            </button>

            {/* Continue Button */}
            {message && (
              <button
                type="button"
                onClick={() => navigate("/reset-password")}
                className="mt-4 w-full rounded-full border border-white py-3 text-sm font-bold text-white transition hover:bg-white hover:text-black"
              >
                Continue to reset password
              </button>
            )}
          </form>

          {/* Back to Login */}
          <div className="mt-8 border-t border-[#2a2a2a] pt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-bold text-white underline transition hover:text-[#1ed760]"
            >
              ← Back to login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;