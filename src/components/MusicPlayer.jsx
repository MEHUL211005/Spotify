import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  FaDesktop,
  FaList,
  FaExpand,
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
  const navigate = useNavigate();

  // ==============================
  // PLAYER STATE
  // ==============================

  const { currentSong, isPlaying, shuffle, repeat, likedSongs } = useSelector(
    (state) => state.player,
  );

  // ==============================
  // AUTH STATE
  // ==============================

  const { accessToken } = useSelector((state) => state.auth);

  const isLoggedIn = !!accessToken;

  // ==============================
  // LOCAL STATE
  // ==============================

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);

  const audioRef = useRef(null);

  // ==============================
  // AUDIO SETUP
  // ==============================

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

  // ==============================
  // PLAY / PAUSE
  // ==============================

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  // ==============================
  // VOLUME
  // ==============================

  const handleVolumeChange = (e) => {
    const val = Number(e.target.value);

    setVolume(val);

    if (audioRef.current) {
      audioRef.current.volume = val / 100;
    }
  };

  // ==============================
  // SEEK
  // ==============================

  const handleSeek = (e) => {
    if (!currentSong || !audioRef.current || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const clickX = e.clientX - rect.left;

    const seekTime = (clickX / rect.width) * duration;

    audioRef.current.currentTime = seekTime;

    setCurrentTime(seekTime);
  };

  // ==============================
  // FORMAT TIME
  // ==============================

  const formatTime = (time) => {
    if (!time) return "0:00";

    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);

    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // ==============================
  // LIKE CHECK
  // ==============================

  const isLiked = likedSongs?.some((song) => song.id === currentSong?.id);

  // =====================================================
  // LOGGED OUT
  // =====================================================

  if (!isLoggedIn) {
    return (
      <div className="w-full bg-gradient-to-r from-[#af2896] to-[#509bf5] px-4 py-3 text-white sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Text */}
          <div className="min-w-0">
            <p className="text-xs font-bold sm:text-sm">Preview of Spotify</p>

            <p className="mt-1 text-xs leading-4 sm:text-sm sm:leading-normal">
              Sign up to get unlimited songs and podcasts with occasional ads.
              No credit card needed.
            </p>
          </div>

          {/* Signup Button */}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="w-full shrink-0 rounded-full bg-white px-5 py-2 text-xs font-bold text-black transition hover:scale-105 sm:w-auto sm:px-8 sm:py-3 sm:text-sm"
          >
            Sign up for free
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // LOGGED IN
  // =====================================================

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 px-2 py-1 sm:px-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
      {/* ================================================= */}
      {/* SONG INFO */}
      {/* ================================================= */}

      <div className="hidden min-w-0 lg:flex lg:w-[30%] lg:items-center lg:gap-3">
        {currentSong && (
          <>
            <img
              src={currentSong.image}
              alt={currentSong.title}
              className="h-14 w-14 shrink-0 rounded-md object-cover"
            />

            <div className="min-w-0">
              <h4 className="truncate text-sm font-semibold text-white">
                {currentSong.title}
              </h4>

              <p className="truncate text-xs text-gray-400">
                {currentSong.artist}
              </p>
            </div>
          </>
        )}
      </div>

      {/* ================================================= */}
      {/* CENTER CONTROLS */}
      {/* ================================================= */}

      <div className="flex w-full min-w-0 flex-col items-center gap-2 sm:gap-3 lg:w-[40%]">
        {/* Controls */}
        <div className="flex w-full items-center justify-center gap-3 text-white/90 sm:gap-4 lg:gap-5">
          {/* Shuffle */}
          <button
            type="button"
            disabled={!currentSong}
            onClick={() => dispatch(toggleShuffle())}
            className={`flex h-5 w-5 items-center justify-center transition ${
              !currentSong
                ? "cursor-not-allowed opacity-40"
                : shuffle
                  ? "text-[#1ed760]"
                  : "hover:text-white"
            }`}
            aria-label="Shuffle"
          >
            <FaRandom className="text-[14px]" />
          </button>

          {/* Previous */}
          <button
            type="button"
            disabled={!currentSong}
            onClick={() => dispatch(previousSong())}
            className={`flex h-5 w-5 items-center justify-center transition ${
              !currentSong
                ? "cursor-not-allowed opacity-40"
                : "hover:text-white"
            }`}
            aria-label="Previous"
          >
            <FaStepBackward className="text-[14px]" />
          </button>

          {/* Play / Pause */}
          <button
            type="button"
            disabled={!currentSong}
            onClick={() => {
              if (!currentSong) return;

              dispatch(isPlaying ? pauseSong() : resumeSong());
            }}
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition sm:h-11 sm:w-11 ${
              !currentSong ? "cursor-not-allowed opacity-40" : "hover:scale-105"
            }`}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause className="text-[14px]" /> : <FaPlay className="ml-0.5 text-[14px]" />}
          </button>

          {/* Next */}
          <button
            type="button"
            disabled={!currentSong}
            onClick={() => dispatch(nextSong())}
            className={`flex h-5 w-5 items-center justify-center transition ${
              !currentSong
                ? "cursor-not-allowed opacity-40"
                : "hover:text-white"
            }`}
            aria-label="Next"
          >
            <FaStepForward className="text-[14px]" />
          </button>

          {/* Repeat */}
          <button
            type="button"
            disabled={!currentSong}
            onClick={() => dispatch(toggleRepeat())}
            className={`flex h-5 w-5 items-center justify-center transition ${
              !currentSong
                ? "cursor-not-allowed opacity-40"
                : repeat
                  ? "text-[#1ed760]"
                  : "hover:text-white"
            }`}
            aria-label="Repeat"
          >
            <FaRedo className="text-[14px]" />
          </button>

          {/* Like */}
          <button
            type="button"
            disabled={!currentSong}
            onClick={() => {
              if (currentSong) {
                dispatch(toggleLike(currentSong));
              }
            }}
            className={`flex h-5 w-5 items-center justify-center transition ${
              !currentSong
                ? "cursor-not-allowed opacity-40"
                : "hover:text-white"
            }`}
            aria-label="Like"
          >
            <FaHeart className="text-[14px]" color={isLiked ? "#1ed760" : "currentColor"} />
          </button>
        </div>

        {/* ================================================= */}
        {/* PROGRESS BAR */}
        {/* ================================================= */}

        <div
          className={`flex w-full max-w-xl items-center gap-2 text-[10px] text-gray-400 sm:gap-3 sm:text-[11px] ${
            !currentSong ? "opacity-40" : ""
          }`}
        >
          <span>{formatTime(currentTime)}</span>

          <div
            className={`h-1 flex-1 rounded-full bg-white/15 ${
              currentSong ? "cursor-pointer" : "cursor-not-allowed"
            }`}
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

      {/* ================================================= */}
      {/* RIGHT CONTROLS - desktop */}
      {/* ================================================= */}

      <div className="hidden w-full items-center justify-end gap-3 text-white lg:flex lg:w-[30%]">
        {/* Queue */}
        <button
          type="button"
          className="text-[#b3b3b3] transition hover:text-white"
          aria-label="Queue"
          title="Queue"
        >
          <FaList className="text-sm sm:text-base" />
        </button>
        {/* Connect to Device */}
        <button
          type="button"
          className="text-[#b3b3b3] transition hover:text-white"
          aria-label="Connect to device"
          title="Connect to device"
        >
          <FaDesktop className="text-sm sm:text-base" />
        </button>

        {/* Volume */}
        {volume === 0 ? (
          <FaVolumeMute className="text-sm sm:text-base" />
        ) : volume < 50 ? (
          <FaVolumeDown className="text-sm sm:text-base" />
        ) : (
          <FaVolumeUp className="text-sm sm:text-base" />
        )}

        {/* Volume Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 accent-[#1ed760] sm:w-24"
          aria-label="Volume"
        />

        {/* Maximize */}
        <button
          type="button"
          className="text-[#b3b3b3] transition hover:text-white"
          aria-label="Maximize"
          title="Maximize"
        >
          <FaExpand className="text-sm sm:text-base" />
        </button>
      </div>

      {/* ================================================= */}
      {/* RIGHT CONTROLS - mobile */}
      {/* ================================================= */}

      <div className="flex w-full items-center justify-between gap-2 text-white lg:hidden">
        <div className="flex shrink-0 items-center gap-3 text-[#b3b3b3]">
          <button
            type="button"
            className="flex h-5 w-5 items-center justify-center transition hover:text-white"
            aria-label="Queue"
            title="Queue"
          >
            <FaList className="text-[14px]" />
          </button>

          <button
            type="button"
            className="flex h-5 w-5 items-center justify-center transition hover:text-white"
            aria-label="Connect to device"
            title="Connect to device"
          >
            <FaDesktop className="text-[14px]" />
          </button>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-2 text-[#b3b3b3]">
          {volume === 0 ? (
            <FaVolumeMute className="text-[14px]" />
          ) : volume < 50 ? (
            <FaVolumeDown className="text-[14px]" />
          ) : (
            <FaVolumeUp className="text-[14px]" />
          )}

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="h-1.5 w-20 accent-[#1ed760]"
            aria-label="Volume"
          />
        </div>

        <button
          type="button"
          className="flex h-5 w-5 shrink-0 items-center justify-center text-[#b3b3b3] transition hover:text-white"
          aria-label="Maximize"
          title="Maximize"
        >
          <FaExpand className="text-[14px]" />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
