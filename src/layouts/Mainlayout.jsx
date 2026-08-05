import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MusicPlayer from "../components/MusicPlayer";

const Mainlayout = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="flex gap-2 p-2">
        <aside className="w-[280px] shrink-0">
          <Sidebar />
        </aside>

        <main className="flex-1 min-w-0 rounded-[28px] bg-[#121212]">
          <div className="sticky top-0 z-10 rounded-t-[28px] bg-[#121212]/80 px-6 py-4 backdrop-blur-xl">
            <Navbar />
          </div>

          <div className="px-6 pb-32">
            <Outlet />
          </div>
        </main>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-[#181818] px-4 py-3 backdrop-blur-xl">
        <MusicPlayer />
      </footer>
    </div>
  );
};

export default Mainlayout;
