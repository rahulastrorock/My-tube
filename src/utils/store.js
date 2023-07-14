import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import searchPageSlice from "./searchPageSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    search: searchSlice,
    searchResults: searchPageSlice,
  },
});
export default store;
