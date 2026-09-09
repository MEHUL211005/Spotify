import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AlbumCard from "./AlbumCard";

const MusicSection = ({ title, data, currentSong }) => {
  const scrollRef = useRef(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 0);
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -500,
        behavior: "smooth",
      });

      setTimeout(() => {
        handleScroll();
      }, 300);
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 500,
        behavior: "smooth",
      });

      setTimeout(() => {
        handleScroll();
      }, 300);
    }
  };

return (
  <div className="relative mb-10">
    
    {/* Section Header */}
    <div className="mb-4 flex items-center justify-between sm:mb-5">
      <h2 className="text-xl font-bold text-white sm:text-2xl">
        {title}
      </h2>

      <button className="text-xs font-bold text-[#b3b3b3] hover:text-white sm:text-sm">
        Show all
      </button>
    </div>

    {/* Songs Row */}
    <div className="relative">
      
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={handleScrollLeft}
          className="absolute left-1 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#181818] text-white shadow-lg transition hover:scale-105 hover:bg-[#282828] sm:left-2 sm:h-10 sm:w-10"
          aria-label="Scroll left"
        >
          <FaChevronLeft className="text-sm" />
        </button>
      )}

      {/* Scrollable Songs */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto overflow-y-hidden sm:gap-4 lg:gap-6"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {data.map((album) => (
          <div
            key={album.id}
            className="w-[140px] min-w-[140px] shrink-0 sm:w-[155px] sm:min-w-[155px]"
          >
            <AlbumCard
              album={album}
              currentSong={currentSong}
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleScrollRight}
        className="absolute right-1 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#181818] text-white shadow-lg transition hover:scale-105 hover:bg-[#282828] sm:right-2 sm:h-10 sm:w-10"
        aria-label="Scroll right"
      >
        <FaChevronRight className="text-sm" />
      </button>

    </div>
  </div>
);
};

export default MusicSection;