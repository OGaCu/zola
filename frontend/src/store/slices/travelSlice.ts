import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Plan, TravelState } from "../../types";

const initialState: TravelState = {
  currentPlan: null,
  plans: [],
  isLoading: false,
  error: null,
};

const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {
    setCurrentPlan: (state, action: PayloadAction<Plan>) => {
      state.currentPlan = action.payload;
    },
    updateCurrentPlan: (state, action: PayloadAction<Partial<Plan>>) => {
      if (state.currentPlan) {
        state.currentPlan = { ...state.currentPlan, ...action.payload };
      }
    },
    addPlan: (state, action: PayloadAction<Plan>) => {
      state.plans.push(action.payload);
    },
    removePlan: (state, action: PayloadAction<string>) => {
      state.plans = state.plans.filter(
        (plan) => plan.location !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearCurrentPlan: (state) => {
      state.currentPlan = null;
    },
    addImagesToCurrentPlan: (state, action: PayloadAction<Plan["images"]>) => {
      if (state.currentPlan) {
        state.currentPlan.images = [
          ...state.currentPlan.images,
          ...action.payload,
        ];
      } else {
        // Create a new plan if none exists
        console.log("Creating new plan with images:", action.payload);
        state.currentPlan = {
          dateFrom: undefined,
          dateTo: undefined,
          location: "",
          numberOfPeople: 1,
          budget: "",
          mood: "relaxing",
          images: action.payload,
        };
      }
    },
    removeImageFromCurrentPlan: (state, action: PayloadAction<string>) => {
      if (state.currentPlan) {
        state.currentPlan.images = state.currentPlan.images.filter(
          (image) => image.id !== action.payload
        );
      }
      // If no current plan exists, do nothing (no images to remove)
    },
  },
});

export const {
  setCurrentPlan,
  updateCurrentPlan,
  addPlan,
  removePlan,
  setLoading,
  setError,
  clearCurrentPlan,
  addImagesToCurrentPlan,
  removeImageFromCurrentPlan,
} = travelSlice.actions;

export default travelSlice.reducer;
