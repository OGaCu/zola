import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Image, ImageState } from "../../types";

const initialState: ImageState = {
  images: [],
  selectedImages: [],
  isLoading: false,
  error: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<Image[]>) => {
      state.images = action.payload;
    },
    addImages: (state, action: PayloadAction<Image[]>) => {
      state.images = [...state.images, ...action.payload];
    },
    removeImage: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter((img) => img.url !== action.payload);
      state.selectedImages = state.selectedImages.filter(
        (url) => url !== action.payload
      );
    },
    selectImage: (state, action: PayloadAction<string>) => {
      if (!state.selectedImages.includes(action.payload)) {
        state.selectedImages.push(action.payload);
      }
    },
    deselectImage: (state, action: PayloadAction<string>) => {
      state.selectedImages = state.selectedImages.filter(
        (url) => url !== action.payload
      );
    },
    clearSelectedImages: (state) => {
      state.selectedImages = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearImages: (state) => {
      state.images = [];
      state.selectedImages = [];
    },
  },
});

export const {
  setImages,
  addImages,
  removeImage,
  selectImage,
  deselectImage,
  clearSelectedImages,
  setLoading,
  setError,
  clearImages,
} = imageSlice.actions;

export default imageSlice.reducer;
