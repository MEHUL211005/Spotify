import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { playSong } from '../store/playerSlice'

const Library = () => {

  const dispatch = useDispatch()

  const { playlist, likedSongs, currentSong } = useSelector(
    (state) => state.player
  )

  return (
    <div>
      <h1 className='text-4xl font-bold mb-8'>
        Your Library
      </h1>

      {/* ALL SONGS */}
      <h2 className='text-xl font-semibold mb-3'>All Songs</h2>

      <div className='space-y-4 mb-8'>

        {playlist.map((song) => (

          <div
            key={song.id}
            onClick={() => dispatch(playSong(song))}
            className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition
              ${currentSong?.id === song.id
                ? 'bg-green-700'
                : 'bg-gray-900 hover:bg-gray-800'
              }`}
          >

            <img
              src={song.image}
              className='w-16 h-16 rounded-md object-cover'
            />

            <div>
              <h3 className='font-semibold'>{song.title}</h3>
              <p className='text-gray-400 text-sm'>{song.artist}</p>
            </div>

          </div>

        ))}

      </div>

      {/* LIKED SONGS */}
      <h2 className='text-xl font-semibold mb-3'>Liked Songs</h2>

      <div className='space-y-4'>

        {likedSongs.length === 0 ? (
          <p className='text-gray-500'>No liked songs yet</p>
        ) : (

          likedSongs.map((song) => (

            <div
              key={song.id}
              onClick={() => dispatch(playSong(song))}
              className='flex items-center gap-4 bg-gray-900 p-4 rounded-lg hover:bg-gray-800 cursor-pointer'
            >

              <img
                src={song.image}
                className='w-16 h-16 rounded-md object-cover'
              />

              <div>
                <h3 className='font-semibold'>{song.title}</h3>
                <p className='text-gray-400 text-sm'>{song.artist}</p>
              </div>

            </div>

          ))
        )}

      </div>

    </div>
  )
}

export default Library