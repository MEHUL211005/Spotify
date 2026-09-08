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
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        <button className="text-sm font-bold text-[#b3b3b3] hover:text-white">
          Show all
        </button>
      </div>

      {/* Songs Row */}
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={handleScrollLeft}
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#181818] text-white shadow-lg transition hover:scale-105 hover:bg-[#282828]"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-sm" />
          </button>
        )}

        {/* Scrollable Songs */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto overflow-y-hidden"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {data.map((album) => (
            <div
              key={album.id}
              className="w-[155px] min-w-[155px] shrink-0"
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
          className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#181818] text-white shadow-lg transition hover:scale-105 hover:bg-[#282828]"
          aria-label="Scroll right"
        >
          <FaChevronRight className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default MusicSection;