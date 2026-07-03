import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import categories from '../data/categories'
import MusicSection from '../components/MusicSection'
import { FaSearch } from 'react-icons/fa'

const Search = () => {

  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  const { playlist } = useSelector((state) => state.player)

  // debounce
  useEffect(() => {

    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

    return () => clearTimeout(timer)

  }, [query])

  // filter songs
  const filteredSongs = playlist.filter((song) =>
    song.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(debouncedQuery.toLowerCase())
  )

  const hasResults = filteredSongs.length > 0

  return (
    <div className="p-6">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6">Search</h1>

      {/* SEARCH BOX */}
      <div className="relative mb-10">
        <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-800 text-white pl-12 pr-4 py-4 rounded-full outline-none focus:ring-2 focus:ring-gray-500 transition"
        />
      </div>

      {/* RESULTS */}
      {debouncedQuery ? (
        <>
          {hasResults ? (
            <MusicSection
              title="Search Results"
              data={filteredSongs}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center mt-20 text-gray-400">
              <h2 className="text-2xl font-bold text-white mb-2">
                No results found
              </h2>
              <p>
                Try searching for songs, artists, or albums
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          {/* CATEGORIES */}
          <h2 className="text-xl font-semibold mb-4 text-gray-300">
            Browse all
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`${category.color} h-32 p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg`}
              >
                <h2 className="text-lg font-bold">
                  {category.title}
                </h2>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  )
}

export default Search