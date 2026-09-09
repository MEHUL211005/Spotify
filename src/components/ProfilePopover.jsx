import React, { useRef, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";

const ProfilePopover = ({ onClose }) => {
  const navigate = useNavigate();

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const profileRef = useRef(null);

  const handleProfile = () => {
    onClose();
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };

  const handleLogoutModalClose = () => {
    setLogoutModalOpen(false);
  };

  return (
    <>
      <div
        ref={profileRef}
        className="absolute right-0 top-full z-[9999] mt-2 w-[calc(100vw-24px)] max-w-[325px] rounded-md bg-[#282828] p-1 text-white shadow-2xl"
      >
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

        {/* Premium */}
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
          onClose={handleLogoutModalClose}
        />
      )}
    </>
  );
};

export default ProfilePopover;