import { createSlice } from "@reduxjs/toolkit";

const initialAlbumState = {
  photoInfo: [],
  selectedPhoto: "",
  title: "",
  bodyContent: "",
  viewCount: "",
  likeCount: "",
  isMemberLiked: false,
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
    setMetadata: (state, action) => {
      state.title = action.payload.title;
      state.bodyContent = action.payload.bodyContent;
      state.viewCount = action.payload.viewCount;
      state.likeCount = action.payload.likeCount;
    },
    setIsMemberLiked: (state, action) => {
      state.isMemberLiked = action.payload;
    },
  },
});

export const { setPhotoInfo, setSelectedPhoto, setMetadata, setIsMemberLiked } =
  albumSlice.actions;
export default albumSlice.reducer;
