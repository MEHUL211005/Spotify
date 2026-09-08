import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaSpotify,
  FaHome,
  FaSearch,
  FaBook,
  FaPlus,
  FaHeart,
  FaGlobe,
} from "react-icons/fa";

const menuItems = [
  { path: "/", label: "Home", icon: FaHome },
  { path: "/search", label: "Search", icon: FaSearch },
  { path: "/library", label: "Your Library", icon: FaBook },
];

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);

  // --------------------------------
  // LOGGED OUT SIDEBAR
  // --------------------------------
  if (!user) {
    return (
      <div className="flex h-[calc(100vh-16px)] flex-col rounded-[8px] bg-[#121212] p-2">
        {/* Your Library Header */}
        <div className="flex items-center justify-between px-3 py-3">
          <h2 className="text-[14px] font-bold text-white">
            Your Library
          </h2>

          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#242424] text-[#b3b3b3] transition hover:scale-105 hover:text-white"
            aria-label="Create playlist"
          >
            <FaPlus className="text-sm" />
          </button>
        </div>

        {/* Create Playlist */}
        <div className="mt-8 rounded-lg bg-[#242424] p-5">
          <h3 className="text-[14px] font-bold text-white">
            Create your first playlist
          </h3>

          <p className="mt-2 text-[13px] text-white">
            It's easy, we'll help you
          </p>

          <button className="mt-5 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-black transition hover:scale-105">
            Create playlist
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 px-3">
          <div className="flex flex-wrap gap-x-4 gap-y-3 text-[11px] text-[#b3b3b3]">
            <button className="hover:text-white">
              Legal
            </button>

            <button className="hover:text-white">
              Safety & Privacy Center
            </button>

            <button className="hover:text-white">
              Privacy Policy
            </button>

            <button className="hover:text-white">
              Cookies
            </button>

            <button className="hover:text-white">
              About Ads
            </button>

            <button className="hover:text-white">
              Accessibility
            </button>

            <button className="hover:text-white">
              Cookies
            </button>
          </div>

          {/* Language */}
          <button className="mt-8 flex items-center gap-2 rounded-full border border-[#727272] px-4 py-2 text-[13px] font-bold text-white transition hover:border-white">
            <FaGlobe className="text-sm" />
            English
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------
  // LOGGED IN SIDEBAR
  // --------------------------------
  return (
    <div className="h-[calc(100vh-16px)] rounded-[8px] bg-[#121212] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
      {/* Navigation */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon className="text-lg" />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Playlists */}
      <div className="mt-8 rounded-2xl bg-white/5 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">
            Your playlists
          </h2>

          <button className="rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/15">
            <FaPlus className="text-xs" />
          </button>
        </div>

        <div className="space-y-2 text-sm text-gray-400">
          {/* Liked Songs */}
          <div className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-pink-500 text-white">
              <FaHeart className="text-xs" />
            </div>

            <span>Liked Songs</span>
          </div>

          {/* Discover Weekly */}
          <div className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#1db954] text-black">
              <FaSpotify className="text-xs" />
            </div>

            <span>Discover Weekly</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;