import React, { useEffect, useRef, useState } from "react";
import {
  FaSpotify,
  FaHome,
  FaSearch,
  FaCompass,
  FaDownload,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilePopover from "./ProfilePopover";

const Navbar = ({ searchInputRef }) => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // Outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".logout-modal")) {
        return;
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="relative z-[9999] flex h-17 w-full items-center gap-5">

      {/* ================= Spotify Logo ================= */}

      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex h-8 w-8 shrink-0 items-center justify-center"
        aria-label="Spotify"
      >
        <FaSpotify className="text-[32px] text-white" />
      </button>

      {/* ================= Home ================= */}

      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1f1f1f] text-white transition hover:scale-105 hover:bg-[#2a2a2a]"
        aria-label="Home"
      >
        <FaHome className="text-[20px]" />
      </button>

      {/* ================= Search ================= */}

      <div className="flex h-12 w-full max-w-[475px] items-center rounded-full bg-[#242424] px-4 transition hover:bg-[#2a2a2a]">

        <FaSearch className="mr-4 shrink-0 text-[20px] text-[#b3b3b3]" />

        <input
          ref={searchInputRef}
          type="text"
          placeholder="What do you want to play?"
          className="min-w-0 flex-1 bg-transparent text-[16px] font-medium text-white outline-none placeholder:text-[#a7a7a7]"
        />

        {/* Browse */}

        <div className="ml-4 flex items-center border-l border-[#777] pl-4">
          <button
            type="button"
            className="text-[#a7a7a7] transition hover:text-white"
            aria-label="Browse"
          >
            <FaCompass className="text-[20px]" />
          </button>
        </div>

      </div>

      {/* ================= Right Navigation ================= */}

      <div className="ml-auto flex shrink-0 items-center gap-3">

        {/* Premium */}

        <button
          type="button"
          className="whitespace-nowrap text-[16px] font-black text-[#b3b3b3] transition hover:text-white"
        >
          Premium
        </button>

        {/* Support */}

        <button
          type="button"
          className="whitespace-nowrap text-[16px] font-black text-[#b3b3b3] transition hover:text-white"
        >
          Support
        </button>

        {/* Download */}

        <button
          type="button"
          className="whitespace-nowrap text-[16px] font-black text-[#b3b3b3] transition hover:text-white"
        >
          Download
        </button>

        {/* Separator */}

        <div className="mx-3 h-6 w-px bg-[#777]" />

        {/* Install App */}

        <button
          type="button"
          className="flex items-center gap-2 whitespace-nowrap text-[14px] font-semibold text-[#b3b3b3] transition hover:text-white"
        >
          <FaDownload className="text-[15px]" />
          <span>Install App</span>
        </button>

        {/* ================= Logged Out ================= */}

        {!user && (
          <>
            {/* Sign Up */}

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="ml-2 whitespace-nowrap text-[14px] font-semibold text-[#b3b3b3] transition hover:text-white"
            >
              Sign up
            </button>

            {/* Log In */}

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="h-12 rounded-full bg-white px-8 text-[16px] font-black text-black transition hover:scale-105"
            >
              Log in
            </button>
          </>
        )}

        {/* ================= Logged In ================= */}

        {user && (
          <div
            ref={profileRef}
            className="relative z-[10000]"
          >
            {/* Profile Button */}

            <button
              type="button"
              onClick={() =>
                setProfileOpen((prev) => !prev)
              }
              className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-[#242424]"
            >
              {/* Avatar */}

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1ed760] text-sm font-bold text-black">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* Name */}

              <span className="max-w-[110px] truncate text-sm font-bold text-white">
                {user.name}
              </span>
            </button>

            {/* Profile Popover */}

            {profileOpen && (
              <ProfilePopover
                onClose={() => setProfileOpen(false)}
              />
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;