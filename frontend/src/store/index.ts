import { configureStore } from "@reduxjs/toolkit";
import travelReducer from "./slices/travelSlice";
import imageReducer from "./slices/imageSlice";

export const store = configureStore({
  reducer: {
    travel: travelReducer,
    image: imageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
