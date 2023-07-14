import { createSlice } from "@reduxjs/toolkit";

const searchPageSlice = createSlice({
  name: "searchResults",
  initialState: [],
  reducers: {
    setSearchVideos: (state, action) => {
      return [...action.payload];
    },
  },
});

export const { setSearchVideos } = searchPageSlice.actions;
export default searchPageSlice.reducer;
