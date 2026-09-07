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

const Navbar = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [profileOpen, setProfileOpen] = useState(false);

  // Profile button + popover ko track karega
  const profileRef = useRef(null);

  // Screen par kahin bhi click karne par popup close
  useEffect(() => {
    const handleClickOutside = (event) => {
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
    <nav className="relative z-[9999] flex h-11 w-full items-center gap-3 px-2">

      {/* Spotify Logo */}
      <div className="flex shrink-0 items-center">
        <FaSpotify className="text-2xl text-white" />
      </div>

      {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1f1f1f] text-white transition hover:scale-105 hover:bg-[#2a2a2a]"
        aria-label="Home"
      >
        <FaHome className="text-base" />
      </button>

      {/* Search Bar */}
      <div className="flex h-9 w-full max-w-[470px] items-center rounded-full bg-[#242424] px-3 transition hover:bg-[#2a2a2a]">

        <FaSearch className="mr-3 shrink-0 text-sm text-[#b3b3b3]" />

        <input
          type="text"
          placeholder="What do you want to play?"
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#b3b3b3]"
        />

        {/* Browse */}
        <div className="ml-3 flex items-center border-l border-[#7c7c7c] pl-3">
          <button
            className="text-[#b3b3b3] transition hover:text-white"
            aria-label="Browse"
          >
            <FaCompass className="text-sm" />
          </button>
        </div>
      </div>

      {/* Right Navigation */}
      <div className="ml-auto flex shrink-0 items-center gap-4">

        {/* Premium */}
        <button className="text-sm font-extrabold text-[#b3b3b3] transition hover:scale-105 hover:text-white">
          Premium
        </button>

        {/* Support */}
        <button className="text-sm font-extrabold text-[#b3b3b3] transition hover:scale-105 hover:text-white">
          Support
        </button>

        {/* Download */}
        <button className="text-sm font-extrabold text-[#b3b3b3] transition hover:scale-105 hover:text-white">
          Download
        </button>

        {/* Separator */}
        <div className="h-5 w-px bg-[#7c7c7c]" />

        {/* Install App */}
        <button className="flex items-center gap-2 text-sm font-extrabold text-[#b3b3b3] transition hover:scale-105 hover:text-white">
          <FaDownload className="text-sm" />
          <span>Install App</span>
        </button>

        {/* Logged Out */}
        {!user && (
          <>
            {/* Sign Up */}
            <button
              onClick={() => navigate("/signup")}
              className="text-sm font-extrabold text-[#b3b3b3] transition hover:scale-105 hover:text-white"
            >
              Sign up
            </button>

            {/* Log In */}
            <button
              onClick={() => navigate("/login")}
              className="rounded-full bg-white px-6 py-2 text-sm font-bold text-black transition hover:scale-105"
            >
              Log in
            </button>
          </>
        )}

        {/* Logged In */}
        {user && (
          <div
            ref={profileRef}
            className="relative"
          >
            {/* Profile Button */}
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-[#242424]"
            >
              {/* Avatar */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1ed760] text-sm font-bold text-black">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* User Name */}
              <span className="max-w-[130px] truncate text-sm font-bold text-white">
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