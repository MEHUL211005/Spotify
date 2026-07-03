import React from 'react'
import AlbumCard from './AlbumCard'

const MusicSection = ({title,data, currentSong}) => {
  return (
    <div className='mb-10'>
        <h2 className='text-2xl font-bold mb-5'>{title}</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {data.map((album)=>(
                <AlbumCard 
                key={album.id}
                album={album}
                currentSong={currentSong}
                />
            ))}
        </div>
    </div>
  )
}

export default MusicSection