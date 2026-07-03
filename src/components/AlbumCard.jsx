import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { playSong } from '../store/playerSlice'

const AlbumCard = ({ album, currentSong }) => {

  const dispatch = useDispatch()

  const handlePlay = () => {
    dispatch(playSong(album))
  }

  const isActive = currentSong?.id === album.id

  return (
    <div
      onClick={handlePlay}
      className={`
        relative p-4 rounded-lg cursor-pointer transition-all duration-300 group
        ${isActive
          ? "bg-green-600/20 ring-2 ring-green-400 scale-105 shadow-lg"
          : "bg-gray-900 hover:bg-gray-800"
        }
      `}
    >

      {/* Image */}
      <div className='relative'>
        <img
          src={album.image}
          alt={album.title}
          className='h-52 w-full object-cover rounded-md'
        />

        {/* Play Button */}
        <button
          className={`
            absolute bottom-3 right-3 p-4 rounded-full text-black transition-all duration-300
            ${isActive
              ? "bg-green-500 opacity-100 translate-y-0"
              : "bg-green-500 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
            }
          `}
        >
          <FaPlay />
        </button>
      </div>

      {/* Title */}
      <h3 className={`mt-4 text-lg font-bold ${isActive ? "text-green-400" : "text-white"}`}>
        {album.title}
      </h3>

      {/* Artist */}
      <p className='text-gray-400 text-sm mt-1'>
        {album.artist}
      </p>

    </div>
  )
}

export default AlbumCard