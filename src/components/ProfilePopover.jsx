import React, { useState } from "react";
import {
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import LogoutModal from "./LogoutModal";

const ProfilePopover = ({ onClose }) => {
  const navigate = useNavigate();

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleProfile = () => {
    onClose();
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };

  return (
    <>
      <div className="absolute right-0 top-full z-50 mt-2 w-[325px] rounded-md bg-[#282828] p-1 text-white shadow-2xl">

        {/* Account */}
        <div className="flex items-center justify-between px-3 py-3 text-sm">
          <span>Account</span>

          <FaExternalLinkAlt className="text-sm text-[#b3b3b3]" />
        </div>

        {/* Profile */}
        <button
          onClick={handleProfile}
          className="flex w-full items-center px-3 py-3 text-left text-sm hover:bg-[#3e3e3e]"
        >
          Profile
        </button>

        {/* Recents */}
        <button
          className="flex w-full items-center px-3 py-3 text-left text-sm hover:bg-[#3e3e3e]"
        >
          Recents
        </button>

        {/* Upgrade to Premium */}
        <button
          className="flex w-full items-center justify-between px-3 py-3 text-left text-sm hover:bg-[#3e3e3e]"
        >
          <span>Upgrade to Premium</span>

          <FaExternalLinkAlt className="text-sm text-[#b3b3b3]" />
        </button>

        {/* Support */}
        <button
          className="flex w-full items-center justify-between px-3 py-3 text-left text-sm hover:bg-[#3e3e3e]"
        >
          <span>Support</span>

          <FaExternalLinkAlt className="text-sm text-[#b3b3b3]" />
        </button>

        {/* Download */}
        <button
          className="flex w-full items-center justify-between px-3 py-3 text-left text-sm hover:bg-[#3e3e3e]"
        >
          <span>Download</span>

          <FaExternalLinkAlt className="text-sm text-[#b3b3b3]" />
        </button>

        {/* Settings */}
        <button
          className="flex w-full items-center px-3 py-3 text-left text-sm hover:bg-[#3e3e3e]"
        >
          Settings
        </button>

        {/* Logout */}
        <button
          onClick={handleLogoutClick}
          className="flex w-full items-center px-3 py-3 text-left text-sm hover:bg-[#3e3e3e]"
        >
          Log out
        </button>
      </div>

      {/* Logout Modal */}
      {logoutModalOpen && (
        <LogoutModal
          onClose={() => setLogoutModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProfilePopover;