export const fetchSongs = async () => {
  const res = await fetch(
    "https://itunes.apple.com/search?term=arijit&entity=song&limit=50"
  )

  return res.json()
}