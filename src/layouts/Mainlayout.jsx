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
      <header className="z-[9999] h-17 shrink-0 bg-black pl-8 pr-4">
        <Navbar
          searchInputRef={searchInputRef}
        />
      </header>

      {/* ================= Sidebar + Main ================= */}
      <div className="flex min-h-0 flex-1 gap-2 px-2">

        {/* Sidebar */}
        <aside className="min-h-0 w-[280px] shrink-0 overflow-y-auto rounded-lg bg-[#121212]">
          <Sidebar />
        </aside>

        {/* Main Screen */}
        <main className="min-h-0 h-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden rounded-lg bg-gradient-to-b from-[#242424] via-[#181818] to-[#121212]">
          <div className="min-h-full px-9 pb-10 pt-5">
            <Outlet />
          </div>
        </main>

        {!rightSearchOpen && (
          <div className="flex min-h-0 w-10 shrink-0 items-center justify-center rounded-lg bg-[#242424]">
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
          <RightSearchPanel
            onClose={() => setRightSearchOpen(false)}
          />
        )}

      </div>

      {/* ================= Music Player ================= */}
      <footer className="z-20 shrink-0 px-2 pb-2 pt-2">
        <MusicPlayer />
      </footer>

    </div>
  );
};

export default Mainlayout;