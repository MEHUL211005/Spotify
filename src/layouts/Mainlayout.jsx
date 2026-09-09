import React, { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MusicPlayer from "../components/MusicPlayer";
import RightSearchPanel from "../components/RightSearchPanel";
import { FaChevronLeft } from "react-icons/fa";

const Mainlayout = () => {
  const searchInputRef = useRef(null);
  const [rightSearchOpen, setRightSearchOpen] = useState(false);

  const openSearchPanel = () => {
    setRightSearchOpen(true);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-black text-white">

      {/* ================= Navbar ================= */}
      <header className="z-[9999] h-17 shrink-0 bg-black pl-4 pr-2 sm:pl-6 sm:pr-3 md:pl-8 md:pr-4">
        <Navbar
          searchInputRef={searchInputRef}
        />
      </header>

      {/* ================= Sidebar + Main ================= */}
      <div className="flex min-h-0 flex-1 gap-2 px-1 sm:px-2">

        {/* Sidebar */}
        <aside className="hidden min-h-0 w-[280px] shrink-0 overflow-y-auto rounded-lg bg-[#121212] lg:block">
          <Sidebar />
        </aside>

        {/* Main Screen */}
        <main className="min-h-0 h-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden rounded-lg bg-gradient-to-b from-[#242424] via-[#181818] to-[#121212]">
          <div className="min-h-full px-4 pb-10 pt-4 sm:px-6 sm:pt-5 md:px-9">
            <Outlet />
          </div>
        </main>

        {/* Right Search Toggle */}
        {!rightSearchOpen && (
          <div className="hidden min-h-0 w-10 shrink-0 items-center justify-center rounded-lg bg-[#242424] lg:flex">
            <button
              type="button"
              onClick={openSearchPanel}
              className="flex h-full w-full items-center justify-center text-[#b3b3b3] transition-transform duration-200 hover:-translate-x-1 hover:text-white"
              aria-label="Open search panel"
              title="Open search panel"
            >
              <FaChevronLeft className="text-sm" />
            </button>
          </div>
        )}

        {rightSearchOpen && (
          <div className="hidden lg:block">
            <RightSearchPanel
              onClose={() => setRightSearchOpen(false)}
            />
          </div>
        )}

      </div>

      {/* ================= Music Player ================= */}
      <footer className="z-20 shrink-0 px-1 pb-1 pt-2 sm:px-2 sm:pb-2">
        <MusicPlayer />
      </footer>

    </div>
  );
};

export default Mainlayout;