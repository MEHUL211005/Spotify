import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logoutUser } from "../api/auth";
import { clearCredentials } from "../store/authSlice";

const LogoutModal = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await logoutUser();

      dispatch(clearCredentials());

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      onClose();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
      console.error("Response:", error.response?.data);
      console.error("Status:", error.response?.status);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="logout-modal fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 px-4">
      {/* Modal */}
      <div
        ref={modalRef}
        className="w-[calc(100vw-32px)] max-w-[380px] rounded-lg bg-[#282828] p-5 text-white shadow-2xl sm:p-6"
      >
        {/* Title */}
        <h2 className="text-lg font-bold sm:text-xl">
          Log out
        </h2>

        {/* Message */}
        <p className="mt-3 text-sm text-[#b3b3b3]">
          Are you sure you want to log out?
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col-reverse gap-2 sm:mt-7 sm:flex-row sm:justify-end sm:gap-3">
          {/* Cancel */}
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-full rounded-full px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#3e3e3e] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Cancel
          </button>

          {/* Log out */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="w-full rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {loading ? "Logging out..." : "Log out"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default LogoutModal;