import React, { useEffect, useRef, useState } from 'react'
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
  FaHeart
} from 'react-icons/fa'

import { useSelector, useDispatch } from 'react-redux'
import {
  pauseSong,
  resumeSong,
  nextSong,
  previousSong,
  toggleShuffle,
  toggleRepeat,
  toggleLike
} from '../store/playerSlice'

const MusicPlayer = () => {

  const dispatch = useDispatch()

  const {
    currentSong,
    isPlaying,
    shuffle,
    repeat,
    likedSongs
  } = useSelector((state) => state.player)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(70)

  const audioRef = useRef(null)

  // LOAD SONG
  useEffect(() => {

    if (!currentSong) return

    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    audioRef.current.src = currentSong.preview
    audioRef.current.currentTime = 0
    setCurrentTime(0)

    audioRef.current.ontimeupdate = () => {
      setCurrentTime(audioRef.current.currentTime)
    }

    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration)
    }

    // 🚨 FIXED REPEAT + NEXT LOGIC
    audioRef.current.onended = () => {

      if (repeat) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
        return
      }

      dispatch(nextSong())
    }

  }, [currentSong, dispatch, repeat])

  // PLAY / PAUSE
  useEffect(() => {

    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }

  }, [isPlaying, currentSong])

  // VOLUME
  const handleVolumeChange = (e) => {
    const val = Number(e.target.value)
    setVolume(val)

    if (audioRef.current) {
      audioRef.current.volume = val / 100
    }
  }

  // SEEK
  const handleSeek = (e) => {

    if (!audioRef.current) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const seekTime = (clickX / rect.width) * duration

    audioRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  // TIME FORMAT
  const formatTime = (time) => {
    if (!time) return '0:00'
    const m = Math.floor(time / 60)
    const s = Math.floor(time % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const isLiked = likedSongs?.some(
    (song) => song.id === currentSong?.id
  )

  return (
    <div className='fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4'>

      {/* SONG INFO */}
      <div className='flex items-center gap-4 w-1/4'>
        <img
  src={
    currentSong?.image ||
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500'
  }
  alt='song'
  className='w-14 h-14 rounded-md object-cover bg-gray-800'
/>
        <div>
          <h4 className='font-semibold'>
            {currentSong?.title || 'No Song Selected'}
          </h4>
          <p className='text-sm text-gray-400'>
            {currentSong?.artist || '---'}
          </p>
        </div>
      </div>

      {/* CONTROLS */}
      <div className='flex flex-col items-center gap-3'>

        <div className='flex items-center gap-5'>

          {/* SHUFFLE */}
          <button
            onClick={() => dispatch(toggleShuffle())}
            className={shuffle ? 'text-green-500' : 'text-white'}
          >
            <FaRandom />
          </button>

          {/* PREV */}
          <button onClick={() => dispatch(previousSong())}>
            <FaStepBackward />
          </button>

          {/* PLAY/PAUSE */}
          <button
            className='bg-white text-black p-3 rounded-full'
            onClick={() => {
              if (!currentSong) return
              dispatch(isPlaying ? pauseSong() : resumeSong())
            }}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          {/* NEXT */}
          <button onClick={() => dispatch(nextSong())}>
            <FaStepForward />
          </button>

          {/* REPEAT */}
          <button
            onClick={() => dispatch(toggleRepeat())}
            className={repeat ? 'text-green-500' : 'text-white'}
          >
            <FaRedo />
          </button>

          {/* LIKE */}
          <button onClick={() => dispatch(toggleLike(currentSong))}>
            <FaHeart color={isLiked ? 'red' : 'white'} />
          </button>

        </div>

        {/* PROGRESS */}
        <div className='flex items-center gap-3'>

          <span className='text-xs'>{formatTime(currentTime)}</span>

          <div
            className='w-48 md:w-80 h-1 bg-gray-700 rounded-full cursor-pointer'
            onClick={handleSeek}
          >
            <div
              className='h-full bg-white rounded-full'
              style={{
                width: `${duration ? (currentTime / duration) * 100 : 0}%`
              }}
            />
          </div>

          <span className='text-xs'>{formatTime(duration)}</span>

        </div>

      </div>

      {/* VOLUME */}
      <div className='flex items-center gap-3 w-1/4 justify-end'>

        {volume === 0 ? (
          <FaVolumeMute />
        ) : volume < 50 ? (
          <FaVolumeDown />
        ) : (
          <FaVolumeUp />
        )}

        <input
          type='range'
          min='0'
          max='100'
          value={volume}
          onChange={handleVolumeChange}
        />

      </div>

    </div>
  )
}

export default MusicPlayer