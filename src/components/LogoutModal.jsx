import React from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logoutUser } from "../api/auth";
import { clearCredentials } from "../store/authSlice";

const LogoutModal = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();

      console.log("Logout successful:", response);
    } catch (error) {
      console.error(
        "Logout API failed:",
        error.response?.data || error.message
      );
    } finally {
      dispatch(clearCredentials());

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      onClose();
      navigate("/login");
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60">

      {/* Modal */}
      <div className="w-[380px] rounded-lg bg-[#282828] p-6 text-white shadow-2xl">

        <h2 className="text-xl font-bold">
          Log out
        </h2>

        <p className="mt-3 text-sm text-[#b3b3b3]">
          Are you sure you want to log out?
        </p>

        <div className="mt-7 flex justify-end gap-3">

          {/* Cancel */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#3e3e3e]"
          >
            Cancel
          </button>

          {/* Log out */}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:scale-105"
          >
            Log out
          </button>

        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogoutModal; 