import { createSlice } from "@reduxjs/toolkit";

// this is for caching the search value so that when we type backspace in search, the
//search value is still there
const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    cacheResult: (state, action) => {
      state = Object.assign(state, action.payload);
    },
  },
});
export const { cacheResult } = searchSlice.actions;
export default searchSlice.reducer;
