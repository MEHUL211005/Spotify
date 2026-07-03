import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaSpotify,
  FaHome,
  FaSearch,
  FaBook,
} from "react-icons/fa";

// Navigation data
const menuItems = [
  {
    path: "/",
    label: "Home",
    icon: FaHome,
  },
  {
    path: "/search",
    label: "Search",
    icon: FaSearch,
  },
  {
    path: "/library",
    label: "Your Library",
    icon: FaBook,
  },
];

const Sidebar = () => {
  return (
    <div className="hidden md:block h-full min-h-screen bg-black p-4 border-r border-gray-800 fixed">

      {/* Logo Section */}
      <div className="flex items-center gap-2 mb-8">
        <FaSpotify className="text-4xl text-green-500" />

        <h1 className="text-2xl font-bold">
          Spotify
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">

        {menuItems.map((item) => {
          // Store icon component in a variable
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-800 ${
                  isActive ? "bg-gray-800" : ""
                }`
              }
            >
              {/* Icon */}
              <Icon className="text-xl" />

              {/* Text */}
              <span className="font-medium">
                {item.label}
              </span>
            </NavLink>
          );
        })}

      </nav>
    </div>
  );
};

export default Sidebar;