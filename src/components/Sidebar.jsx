import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaSpotify,
  FaHome,
  FaSearch,
  FaBook,
  FaPlus,
  FaHeart,
} from "react-icons/fa";

const menuItems = [
  { path: "/", label: "Home", icon: FaHome },
  { path: "/search", label: "Search", icon: FaSearch },
  { path: "/library", label: "Your Library", icon: FaBook },
];

const Sidebar = () => {
  return (
    <div className="h-[calc(100vh-16px)] rounded-[28px] bg-[#121212] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
      <div className="mb-8 flex items-center gap-3">
        <FaSpotify className="text-3xl text-[#1ed760]" />
        <h1 className="text-2xl font-bold tracking-tight">Spotify</h1>
      </div>

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

      <div className="mt-8 rounded-2xl bg-white/5 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Your playlists</h2>
          <button className="rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/15">
            <FaPlus className="text-xs" />
          </button>
        </div>

        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-pink-500 text-white">
              <FaHeart className="text-xs" />
            </div>
            <span>Liked Songs</span>
          </div>
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
