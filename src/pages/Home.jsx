import React, { useEffect, useMemo } from "react";
import MusicSection from "../components/MusicSection";
import { useQuery } from "@tanstack/react-query";
import { fetchSongs } from "../api/music";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylist } from "../store/playerSlice";

const Home = () => {
  const { currentSong } = useSelector((state) => state.player);

  const dispatch = useDispatch();

  const { data, isLoading, error } = useQuery({
    queryKey: ["songs"],
    queryFn: fetchSongs,
  });

  const songs = useMemo(() => {
    return (
      data?.results?.map((item) => ({
        id: item.trackId,
        title: item.trackName,
        image: item.artworkUrl100,
        artist: item.artistName,
        preview: item.previewUrl,
      })) || []
    );
  }, [data]);

  useEffect(() => {
    if (songs.length > 0) {
      dispatch(setPlaylist(songs));
    }
  }, [dispatch, songs]);

  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-white">{error.message}</p>;
  }

  return (
    <div>
      <MusicSection
        title="Trending songs"
        data={songs}
        currentSong={currentSong}
      />
    </div>
  );
};

export default Home;