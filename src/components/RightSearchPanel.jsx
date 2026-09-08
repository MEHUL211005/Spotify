import React from "react";
import { FaChevronLeft } from "react-icons/fa";

const RightSearchPanel = ({ onClose }) => {
  return (
    <aside className="relative flex min-h-0 w-[380px] shrink-0 flex-col overflow-hidden rounded-lg bg-[#121212]">
      <button
        type="button"
        onClick={onClose}
        className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center text-[#b3b3b3] transition-transform duration-200 hover:-translate-x-1 hover:text-white"
        aria-label="Close search panel"
      >
        <FaChevronLeft className="text-sm" />
      </button>

      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
        <h2 className="text-[22px] font-bold text-white">
          Find something to play
        </h2>

        <button
          type="button"
          className="rounded-full bg-[#1ed760] px-5 py-2 text-sm font-bold text-black transition hover:scale-105"
        >
          Search
        </button>
      </div>
    </aside>
  );
};

export default RightSearchPanel;
