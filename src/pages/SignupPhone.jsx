import React, { useEffect, useRef, useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { FaArrowLeft, FaMobileAlt, FaSpotify } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { socialLogin } from "../api/auth";
import { firebaseAuth } from "../firebase/firebase";
import { setCredentials } from "../store/authSlice";

const SignupPhone = ({ mode = "signup" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const recaptchaVerifier = useRef(null);

  const isLoginFlow = mode === "login";
  const pageTitle = isLoginFlow
    ? "Log in with phone number"
    : "Sign up with phone number";
  const buttonText = isLoginFlow ? "Log in" : "Create account";

  useEffect(() => {
    recaptchaVerifier.current = new RecaptchaVerifier(
      firebaseAuth,
      "recaptcha-container",
      {
        size: "normal",
      }
    );

    return () => {
      recaptchaVerifier.current?.clear();
    };
  }, []);

  const normalizePhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "");

    if (!digits) {
      return "";
    }

    if (digits.length === 10) {
      return `+91${digits}`;
    }

    if (digits.length > 10 && !value.startsWith("+")) {
      return `+${digits}`;
    }

    return value.startsWith("+") ? value : `+${digits}`;
  };

  const handleSendOTP = async () => {
    try {
      setError("");

      const normalizedPhone = normalizePhoneNumber(phone);

      if (!normalizedPhone || !/^\+[1-9]\d{8,14}$/.test(normalizedPhone)) {
        setError("Please enter a valid mobile number.");
        return;
      }

      setLoading(true);

      const confirmation = await signInWithPhoneNumber(
        firebaseAuth,
        normalizedPhone,
        recaptchaVerifier.current
      );

      setConfirmationResult(confirmation);
      setOtp("");
      toast.success("OTP sent successfully");
    } catch (err) {
      console.error("Phone OTP send error:", err);
      setError(err.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setError("");

      if (!otp.trim()) {
        setError("Please enter the OTP.");
        return;
      }

      if (!confirmationResult) {
        setError("Please request an OTP first.");
        return;
      }

      setLoading(true);

      const result = await confirmationResult.confirm(otp);
      const firebaseUser = result.user;
      const firebaseIdToken = await firebaseUser.getIdToken();

      const response = await socialLogin({
        firebaseIdToken,
      });

      const { user, accessToken, refreshToken } = response.data;

      dispatch(
        setCredentials({
          user,
          accessToken,
          refreshToken,
        })
      );

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(
        isLoginFlow ? "Phone login successful!" : "Phone signup successful!"
      );
      navigate("/");
    } catch (err) {
      console.error("Phone verification error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Phone verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(isLoginFlow ? "/login" : "/signup");
  };

  return (
    <div className="flex min-h-screen justify-center bg-[#121212] px-4 py-6 text-white sm:px-6">
      <div className="w-full max-w-[436px] py-4 sm:py-8">
        <div className="mb-6 flex justify-center sm:mb-8">
          <FaSpotify className="text-[30px] text-white sm:text-[34px]" />
        </div>

        <div className="mb-5 flex items-center gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="text-[#b3b3b3] transition hover:text-white"
            aria-label="Go back"
          >
            <FaArrowLeft className="text-xl" />
          </button>
        </div>

        <div className="mb-5 h-[2px] w-full bg-[#727272]">
          <div className="h-[2px] w-full bg-[#1ed760]" />
        </div>

        {!confirmationResult ? (
          <>
            <p className="mb-2 text-[14px] text-[#b3b3b3]">Continue</p>
            <h1 className="mb-6 text-[26px] font-bold leading-tight sm:text-[32px]">
              {pageTitle}
            </h1>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-[12px] font-bold text-white">
                  Mobile number
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#b3b3b3]">
                    <FaMobileAlt className="text-sm" />
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your mobile number"
                    inputMode="numeric"
                    className="h-12 w-full rounded-md border border-[#727272] bg-[#121212] pl-10 pr-3 text-sm text-white outline-none placeholder:text-[#a7a7a7] focus:border-white"
                  />
                </div>
              </div>

              <div id="recaptcha-container" className="flex justify-center" />

              <button
                type="button"
                onClick={handleSendOTP}
                disabled={loading}
                className="h-12 w-full rounded-full bg-[#1ed760] font-extrabold text-black transition hover:bg-[#1fdf64] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mb-2 text-[14px] text-[#b3b3b3]">Verify your phone</p>
            <h1 className="mb-3 text-[26px] font-bold leading-tight sm:text-[32px]">
              Enter your OTP
            </h1>

            <p className="mb-7 text-[14px] leading-5 text-[#b3b3b3]">
              We sent a 6-digit code to
              <br />
              <span className="text-white">{normalizePhoneNumber(phone)}</span>
            </p>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-[12px] font-bold text-white">
                  OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter OTP"
                  maxLength={6}
                  className="h-12 w-full rounded-md border border-[#727272] bg-[#121212] px-3 text-sm text-white outline-none placeholder:text-[#a7a7a7] focus:border-white"
                />
              </div>

              <button
                type="button"
                onClick={handleVerifyOTP}
                disabled={loading}
                className="h-12 w-full rounded-full bg-[#1ed760] font-extrabold text-black transition hover:bg-[#1fdf64] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Verifying..." : buttonText}
              </button>

              <button
                type="button"
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full text-center text-[13px] font-bold text-white underline decoration-white/60 underline-offset-4"
              >
                Resend OTP
              </button>
            </div>
          </>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default SignupPhone;