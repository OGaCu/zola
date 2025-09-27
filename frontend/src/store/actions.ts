import { useAppDispatch } from "./hooks";
import {
  setCurrentPlan,
  updateCurrentPlan,
  addPlan,
  removePlan,
  setLoading,
  setError,
  clearCurrentPlan,
  addImagesToCurrentPlan,
  removeImageFromCurrentPlan,
} from "./slices/travelSlice";
import {
  setImages,
  addImages,
  removeImage,
  selectImage,
  deselectImage,
  clearSelectedImages,
  clearImages,
} from "./slices/imageSlice";
import { Plan, Image } from "../types";

// Travel actions
export const useTravelActions = () => {
  const dispatch = useAppDispatch();

  return {
    setCurrentPlan: (plan: Plan) => dispatch(setCurrentPlan(plan)),
    updateCurrentPlan: (updates: Partial<Plan>) =>
      dispatch(updateCurrentPlan(updates)),
    addPlan: (plan: Plan) => dispatch(addPlan(plan)),
    removePlan: (location: string) => dispatch(removePlan(location)),
    setLoading: (loading: boolean) => dispatch(setLoading(loading)),
    setError: (error: string | null) => dispatch(setError(error)),
    clearCurrentPlan: () => dispatch(clearCurrentPlan()),
    addImagesToCurrentPlan: (images: Image[]) =>
      dispatch(addImagesToCurrentPlan(images)),
    removeImageFromCurrentPlan: (imageId: string) =>
      dispatch(removeImageFromCurrentPlan(imageId)),
  };
};

// Image actions
export const useImageActions = () => {
  const dispatch = useAppDispatch();

  return {
    setImages: (images: Image[]) => dispatch(setImages(images)),
    addImages: (images: Image[]) => dispatch(addImages(images)),
    removeImage: (url: string) => dispatch(removeImage(url)),
    selectImage: (url: string) => dispatch(selectImage(url)),
    deselectImage: (url: string) => dispatch(deselectImage(url)),
    clearSelectedImages: () => dispatch(clearSelectedImages()),
    clearImages: () => dispatch(clearImages()),
  };
};
