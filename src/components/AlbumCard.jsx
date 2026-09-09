import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../store/playerSlice";
import SignupModal from "./SignupModal";

const AlbumCard = ({ album, currentSong }) => {
  const dispatch = useDispatch();

  const [showSignupModal, setShowSignupModal] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const handlePlay = () => {
    if (!user) {
      setShowSignupModal(true);
      return;
    }

    dispatch(playSong(album));
  };

  const isActive = currentSong?.id === album.id;

  return (
    <>
      <div
        onClick={handlePlay}
       className={`
  group relative w-[140px] cursor-pointer
  sm:w-[155px]
  transition-transform duration-200 ease-out
  hover:-translate-y-1
`}
      >
        {/* Card Background */}
        <div
          className={`
            pointer-events-none absolute -inset-2 rounded-md
            ${isActive ? "bg-[#1f3a28]" : "bg-transparent group-hover:bg-[#181818]"}
          `}
        />

        {/* Card Content */}
        <div className="relative">
          {/* Image */}
<div className="relative h-[140px] w-[140px] overflow-hidden rounded-[6px] sm:h-[155px] sm:w-[155px]">            <img
              src={album.image}
              alt={album.title}
              className="
                h-full w-full object-cover
                transition-transform duration-200 ease-out
                group-hover:scale-[1.02]
              "
            />

            {/* Play Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePlay();
              }}
            className={`
  absolute bottom-2 right-2
  flex h-9 w-9 items-center justify-center
  rounded-full bg-[#1ed760] text-black shadow-lg
  transition-all duration-200
  sm:h-11 sm:w-11
  ${
    isActive
      ? "translate-y-0 opacity-100"
      : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
  }
  hover:scale-105
`}
            >
              <FaPlay className="ml-[2px] text-sm" />
            </button>
          </div>

          {/* Title */}
          <h3
            className={`
mt-2 truncate text-[14px] font-medium sm:mt-3 sm:text-[15px]         
     ${isActive ? "text-[#1ed760]" : "text-white"}
            `}
          >
            {album.title}
          </h3>

          {/* Artist */}
          <p className="mt-1 truncate text-[12px] text-[#b3b3b3] sm:text-[13px]">
            {album.artist}
          </p>
        </div>
      </div>

      {/* Signup Modal */}
      {showSignupModal && (
        <SignupModal
          song={album}
          onClose={() => setShowSignupModal(false)}
        />
      )}
    </>
  );
};

export default AlbumCard;