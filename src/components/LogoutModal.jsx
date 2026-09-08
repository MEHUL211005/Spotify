import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logoutUser } from "../api/auth";
import { clearCredentials } from "../store/authSlice";

const LogoutModal = ({ onClose }) => {
  console.log("LogoutModal rendered");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);

    console.log("===== LOGOUT START =====");

    const refreshToken =
      localStorage.getItem("refreshToken");

    console.log("Refresh Token:", refreshToken);

    try {
      const response = await logoutUser();

      console.log(
        "LOGOUT API RESPONSE:",
        response
      );

      dispatch(clearCredentials());

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      console.log(
        "Access Token:",
        localStorage.getItem("accessToken")
      );

      console.log(
        "Refresh Token:",
        localStorage.getItem("refreshToken")
      );

      console.log(
        "User:",
        localStorage.getItem("user")
      );

      onClose();

      navigate("/");

      console.log("===== LOGOUT COMPLETE =====");
    } catch (error) {
      console.error("===== LOGOUT ERROR =====");

      console.error("Error:", error);

      console.error(
        "Response:",
        error.response?.data
      );

      console.error(
        "Status:",
        error.response?.status
      );
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="logout-modal fixed inset-0 z-[999999] flex items-center justify-center bg-black/60">

      {/* Modal */}
      <div className="w-[380px] rounded-lg bg-[#282828] p-6 text-white shadow-2xl">

        {/* Title */}
        <h2 className="text-xl font-bold">
          Log out
        </h2>

        {/* Message */}
        <p className="mt-3 text-sm text-[#b3b3b3]">
          Are you sure you want to log out?
        </p>

        {/* Buttons */}
        <div className="mt-7 flex justify-end gap-3">

          {/* Cancel */}
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-full px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#3e3e3e] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          {/* Log out */}
          <button
            type="button"
            onClick={() => {
              console.log(
                "LOGOUT BUTTON CLICKED"
              );

              handleLogout();
            }}
            disabled={loading}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Logging out..."
              : "Log out"}
          </button>

        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogoutModal;