import React, { useEffect, useRef, useState } from "react";
import {
  FaSpotify,
  FaHome,
  FaSearch,
  FaCompass,
  FaDownload,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilePopover from "./ProfilePopover";

const Navbar = ({ searchInputRef }) => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profileRef = useRef(null);
  const mobileProfileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".logout-modal")) {
        return;
      }

      const clickedInsideDesktopProfile =
        profileRef.current && profileRef.current.contains(event.target);
      const clickedInsideMobileProfile =
        mobileProfileRef.current && mobileProfileRef.current.contains(event.target);

      if (!clickedInsideDesktopProfile && !clickedInsideMobileProfile) {
        setProfileOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMobileNavigate = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="relative z-[9999] flex h-17 w-full items-center gap-2 sm:gap-3 lg:gap-5">
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
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f1f1f] text-white transition hover:scale-105 hover:bg-[#2a2a2a] sm:h-12 sm:w-12"
        aria-label="Home"
      >
        <FaHome className="text-[18px] sm:text-[20px]" />
      </button>

      {/* ================= Search ================= */}

      <div className="flex h-10 min-w-0 flex-1 items-center rounded-full bg-[#242424] px-3 transition hover:bg-[#2a2a2a] sm:h-12 sm:max-w-[475px] sm:px-4">
        <FaSearch className="mr-2 shrink-0 text-[18px] text-[#b3b3b3] sm:mr-4 sm:text-[20px]" />

        <input
          ref={searchInputRef}
          type="text"
          placeholder="What do you want to play?"
          className="min-w-0 flex-1 bg-transparent text-[14px] font-medium text-white outline-none placeholder:text-transparent sm:text-[16px] sm:placeholder:text-[#a7a7a7]"
        />

        {/* Browse */}

        <div className="ml-2 flex items-center border-l border-[#777] pl-2 sm:ml-4 sm:pl-4">
          <button
            type="button"
            className="text-[#a7a7a7] transition hover:text-white"
            aria-label="Browse"
          >
            <FaCompass className="text-[18px] sm:text-[20px]" />
          </button>
        </div>
      </div>

      {/* ================= Desktop Right Navigation ================= */}

      <div className="ml-auto hidden shrink-0 items-center gap-2 sm:gap-3 lg:flex">
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

        <div className="mx-1 h-6 w-px bg-[#777]" />

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
              className="h-10 rounded-full bg-white px-4 text-[14px] font-black text-black transition hover:scale-105 sm:h-12 sm:px-8 sm:text-[16px]"
            >
              Log in
            </button>
          </>
        )}

        {/* ================= Logged In ================= */}

        {user && (
          <div ref={profileRef} className="relative z-[10000]">
            {/* Profile Button */}

            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
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

      {/* ================= Mobile Right Side ================= */}

      <div
        ref={mobileMenuRef}
        className="relative ml-auto flex items-center lg:hidden"
      >
        {/* Hamburger */}

        <button
          type="button"
          onClick={() =>
            setMobileMenuOpen((prev) => !prev)
          }
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#242424] text-white transition hover:bg-[#2a2a2a] sm:h-12 sm:w-12"
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <FaTimes className="text-[18px] sm:text-[20px]" />
          ) : (
            <FaBars className="text-[18px] sm:text-[20px]" />
          )}
        </button>

        {/* ================= Mobile Menu ================= */}

        {mobileMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-[220px] overflow-hidden rounded-lg bg-[#282828] p-2 shadow-2xl">
            {/* Premium */}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-md px-4 py-3 text-left text-sm font-bold text-white transition hover:bg-[#3e3e3e]"
            >
              Premium
            </button>

            {/* Support */}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-md px-4 py-3 text-left text-sm font-bold text-white transition hover:bg-[#3e3e3e]"
            >
              Support
            </button>

            {/* Download */}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-md px-4 py-3 text-left text-sm font-bold text-white transition hover:bg-[#3e3e3e]"
            >
              Download
            </button>

            {/* Install App */}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-bold text-white transition hover:bg-[#3e3e3e]"
            >
              <FaDownload className="text-sm" />
              <span>Install App</span>
            </button>

            {/* Divider */}

            <div className="my-2 h-px bg-[#444]" />

            {/* Logged Out */}

            {!user && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    handleMobileNavigate("/signup")
                  }
                  className="w-full rounded-md px-4 py-3 text-left text-sm font-bold text-white transition hover:bg-[#3e3e3e]"
                >
                  Sign up
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleMobileNavigate("/login")
                  }
                  className="mt-1 w-full rounded-full bg-white px-4 py-3 text-sm font-black text-black transition hover:scale-[1.02]"
                >
                  Log in
                </button>
              </>
            )}

            {/* Logged In */}

            {user && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-left transition hover:bg-[#3e3e3e]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1ed760] text-sm font-bold text-black">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">
                      {user.name}
                    </p>

                    <p className="text-xs text-[#b3b3b3]">
                      Profile
                    </p>
                  </div>
                </button>

                {profileOpen && (
                  <div ref={mobileProfileRef} className="relative z-[10001] mt-2">
                    <ProfilePopover onClose={() => setProfileOpen(false)} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;