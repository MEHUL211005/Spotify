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
    <nav className="relative z-[9999] flex h-10 w-full items-center gap-2 px-1">

      {/* ================= Spotify Logo ================= */}

      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex h-9 w-9 shrink-0 items-center justify-center"
        aria-label="Spotify"
      >
        <FaSpotify className="text-[30px] text-white" />
      </button>

      {/* ================= Home ================= */}

      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1f1f1f] text-white transition hover:scale-105 hover:bg-[#2a2a2a]"
        aria-label="Home"
      >
        <FaHome className="text-[16px]" />
      </button>

      {/* ================= Search ================= */}

      <div className="flex h-9 w-full max-w-[470px] items-center rounded-full bg-[#242424] px-3 transition hover:bg-[#2a2a2a]">

        <FaSearch className="mr-3 shrink-0 text-[15px] text-[#b3b3b3]" />

        <input
          type="text"
          placeholder="What do you want to play?"
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#b3b3b3]"
        />

        {/* Browse */}

        <div className="ml-2 flex items-center border-l border-[#555] pl-3">
          <button
            type="button"
            className="text-[#b3b3b3] transition hover:text-white"
            aria-label="Browse"
          >
            <FaCompass className="text-[15px]" />
          </button>
        </div>

      </div>

      {/* ================= Right Navigation ================= */}

      <div className="ml-auto flex shrink-0 items-center gap-3">

        {/* Premium */}

        <button
          type="button"
          className="whitespace-nowrap text-sm font-bold text-[#b3b3b3] transition hover:text-white"
        >
          Premium
        </button>

        {/* Support */}

        <button
          type="button"
          className="whitespace-nowrap text-sm font-bold text-[#b3b3b3] transition hover:text-white"
        >
          Support
        </button>

        {/* Download */}

        <button
          type="button"
          className="whitespace-nowrap text-sm font-bold text-[#b3b3b3] transition hover:text-white"
        >
          Download
        </button>

        {/* Separator */}

        <div className="mx-1 h-5 w-px bg-[#555]" />

        {/* Install App */}

        <button
          type="button"
          className="flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-[#b3b3b3] transition hover:text-white"
        >
          <FaDownload className="text-[13px]" />
          <span>Install App</span>
        </button>

        {/* ================= Logged Out ================= */}

        {!user && (
          <>
            {/* Sign Up */}

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="whitespace-nowrap text-sm font-bold text-[#b3b3b3] transition hover:text-white"
            >
              Sign up
            </button>

            {/* Log In */}

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="rounded-full bg-white px-6 py-2 text-sm font-bold text-black transition hover:scale-105"
            >
              Log in
            </button>
          </>
        )}

        {/* ================= Logged In ================= */}

        {user && (
          <div
            ref={profileRef}
            className="relative"
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