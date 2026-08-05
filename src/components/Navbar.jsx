import React from "react";
import { FaChevronLeft, FaChevronRight, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const canGoBack = window.history.state && window.history.length > 1;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          disabled={!canGoBack}
          className={`rounded-full p-3 transition ${
            canGoBack
              ? "bg-white/10 text-white hover:bg-white/20"
              : "cursor-not-allowed bg-white/5 text-white/35"
          }`}
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={() => navigate(1)}
          className="rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
        >
          <FaChevronRight />
        </button>
      </div>

      <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:scale-[1.02]">
        <FaUser className="text-xs" />
        <span>Mehul</span>
      </button>
    </div>
  );
};

export default Navbar;
