import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../store/playerSlice";
import SignupModal from "./SignupModal";

const AlbumCard = ({ album, currentSong }) => {
  const dispatch = useDispatch();

  const [showSignupModal, setShowSignupModal] = useState(false);

  // Logged-in user
  const user = useSelector((state) => state.auth.user);

  const handlePlay = () => {
    // Logged out → don't play song
    if (!user) {
      setShowSignupModal(true);
      return;
    }

    // Logged in → existing behavior
    dispatch(playSong(album));
  };

  const isActive = currentSong?.id === album.id;

  return (
    <>
      <div
        onClick={handlePlay}
        className="group relative w-[155px] cursor-pointer"
      >
        {/* Image */}
        <div className="relative h-[155px] w-[155px] overflow-hidden rounded-[6px]">
          <img
            src={album.image}
            alt={album.title}
            className="h-full w-full object-cover"
          />

          {/* Play Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePlay();
            }}
            className={`
              absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center
              rounded-full bg-[#1ed760] text-black shadow-lg
              transition-all duration-200
              ${
                isActive
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
              }
            `}
          >
            <FaPlay className="ml-[2px] text-sm" />
          </button>
        </div>

        {/* Title */}
        <h3
          className={`mt-3 truncate text-[15px] font-medium ${
            isActive ? "text-[#1ed760]" : "text-white"
          }`}
        >
          {album.title}
        </h3>

        {/* Artist */}
        <p className="mt-1 truncate text-[13px] text-[#b3b3b3]">
          {album.artist}
        </p>
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