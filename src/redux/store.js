import { configureStore } from "@reduxjs/toolkit";
import waterSlice from "./slices/waterSlice";

export const store = configureStore({
  reducer: {
    water: waterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
