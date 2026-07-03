import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null,
  isPlaying: false,
  playlist: [],
  shuffle: false,
  repeat: false,
  likedSongs: []
};

const playerSlice = createSlice({
  name: "player",
  initialState,

  reducers: {

    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },

    playSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },

    pauseSong: (state) => {
      state.isPlaying = false;
    },

    resumeSong: (state) => {
      state.isPlaying = true;
    },

    nextSong: (state) => {

      const index = state.playlist.findIndex(
        song => song.id === state.currentSong?.id
      );

      // shuffle
      if (state.shuffle) {
        const randomIndex = Math.floor(Math.random() * state.playlist.length);
        state.currentSong = state.playlist[randomIndex];
        state.isPlaying = true;
        return;
      }

      // normal next
      if (index < state.playlist.length - 1) {
        state.currentSong = state.playlist[index + 1];
        state.isPlaying = true;
      }
    },

    previousSong: (state) => {

      const index = state.playlist.findIndex(
        song => song.id === state.currentSong?.id
      );

      if (index > 0) {
        state.currentSong = state.playlist[index - 1];
        state.isPlaying = true;
      }
    },

    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },

    toggleRepeat: (state) => {
      state.repeat = !state.repeat;
    },

    toggleLike: (state, action) => {

      const song = action.payload;

      const exists = state.likedSongs.find(s => s.id === song.id);

      if (exists) {
        state.likedSongs = state.likedSongs.filter(s => s.id !== song.id);
      } else {
        state.likedSongs.push(song);
      }
    }
  }
});

export const {
  setPlaylist,
  playSong,
  pauseSong,
  resumeSong,
  nextSong,
  previousSong,
  toggleShuffle,
  toggleRepeat,
  toggleLike
} = playerSlice.actions;

export default playerSlice.reducer;