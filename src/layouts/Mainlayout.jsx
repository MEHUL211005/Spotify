import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MusicPlayer from "../components/MusicPlayer";

const Mainlayout = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white">

      {/* Full Width Navbar */}
      <header className="sticky top-0 z-10 bg-[#121212]/95 px-6 py-4 backdrop-blur-xl">
        <Navbar />
      </header>

      {/* Sidebar + Main Content */}
      <div className="flex gap-2 px-2">

        {/* Sidebar */}
        <aside className="w-[280px] shrink-0">
          <Sidebar />
        </aside>

        {/* Main Screen */}
        <main className="min-w-0 flex-1 bg-[#121212]">
          <div className="px-6 pb-32">
            <Outlet />
          </div>
        </main>

      </div>

      {/* Music Player */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-[#181818] px-4 py-3 backdrop-blur-xl">
        <MusicPlayer />
      </footer>

    </div>
  );
};

export default Mainlayout;