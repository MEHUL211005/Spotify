import React, { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeMute,
  FaRandom,
  FaRedo,
  FaHeart,
} from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import {
  pauseSong,
  resumeSong,
  nextSong,
  previousSong,
  toggleShuffle,
  toggleRepeat,
  toggleLike,
} from "../store/playerSlice";

const MusicPlayer = () => {
  const dispatch = useDispatch();

  const { currentSong, isPlaying, shuffle, repeat, likedSongs } = useSelector(
    (state) => state.player,
  );

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);

  const audioRef = useRef(null);

  useEffect(() => {
    if (!currentSong) return;

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    audioRef.current.src = currentSong.preview;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);

    audioRef.current.ontimeupdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration);
    };

    audioRef.current.onended = () => {
      if (repeat) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        return;
      }

      dispatch(nextSong());
    };
  }, [currentSong, dispatch, repeat]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  const handleVolumeChange = (e) => {
    const val = Number(e.target.value);
    setVolume(val);

    if (audioRef.current) {
      audioRef.current.volume = val / 100;
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const seekTime = (clickX / rect.width) * duration;

    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const isLiked = likedSongs?.some((song) => song.id === currentSong?.id);

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 lg:flex-row">
      <div className="flex w-full items-center gap-3 lg:w-[30%]">
        <img
          src={
            currentSong?.image ||
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500"
          }
          alt="song"
          className="h-14 w-14 rounded-md object-cover"
        />
        <div className="min-w-0">
          <h4 className="truncate text-sm font-semibold text-white">
            {currentSong?.title || "No Song Selected"}
          </h4>
          <p className="truncate text-xs text-gray-400">
            {currentSong?.artist || "---"}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-3 lg:w-[40%]">
        <div className="flex items-center gap-5 text-white/90">
          <button
            onClick={() => dispatch(toggleShuffle())}
            className={shuffle ? "text-[#1ed760]" : "hover:text-white"}
          >
            <FaRandom />
          </button>

          <button
            onClick={() => dispatch(previousSong())}
            className="hover:text-white"
          >
            <FaStepBackward />
          </button>

          <button
            className="rounded-full bg-white p-3 text-black transition hover:scale-105"
            onClick={() => {
              if (!currentSong) return;
              dispatch(isPlaying ? pauseSong() : resumeSong());
            }}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button
            onClick={() => dispatch(nextSong())}
            className="hover:text-white"
          >
            <FaStepForward />
          </button>

          <button
            onClick={() => dispatch(toggleRepeat())}
            className={repeat ? "text-[#1ed760]" : "hover:text-white"}
          >
            <FaRedo />
          </button>

          <button
            onClick={() => dispatch(toggleLike(currentSong))}
            className="hover:text-white"
          >
            <FaHeart color={isLiked ? "#1ed760" : "currentColor"} />
          </button>
        </div>

        <div className="flex w-full max-w-xl items-center gap-3 text-[11px] text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <div
            className="h-1 flex-1 cursor-pointer rounded-full bg-white/15"
            onClick={handleSeek}
          >
            <div
              className="h-full rounded-full bg-[#1ed760]"
              style={{
                width: `${duration ? (currentTime / duration) * 100 : 0}%`,
              }}
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex w-full items-center justify-end gap-3 lg:w-[30%]">
        {volume === 0 ? (
          <FaVolumeMute />
        ) : volume < 50 ? (
          <FaVolumeDown />
        ) : (
          <FaVolumeUp />
        )}

        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 accent-[#1ed760]"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
