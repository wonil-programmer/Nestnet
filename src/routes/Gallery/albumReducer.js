import { createSlice } from "@reduxjs/toolkit";

const initialAlbumState = {
  photoInfo: [],
  selectedPhoto: "",
};

const albumSlice = createSlice({
  name: "albumReducer",
  initialState: initialAlbumState,
  reducers: {
    setPhotoInfo: (state, action) => {
      state.photoInfo = [...state.photoInfo, ...action.payload];
      // state.photoInfo = [...action.payload];
    },
    setSelectedPhoto: (state, action) => {
      state.selectedPhoto = action.payload;
    },
  },
});

export const { setPhotoInfo, setSelectedPhoto } = albumSlice.actions;
export default albumSlice.reducer;
