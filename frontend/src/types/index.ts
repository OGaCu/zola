export interface Image {
  id: string;
  url: string;
  description: string;
  altText: string;
  tags: string[];
}

export interface Plan {
  // Fields from TravelPanel
  dateFrom: string | undefined;
  dateTo: string | undefined;
  location: string;
  numPeople: number;
  budget: string;
  mood: string;
  // List of Image objects
  images: Image[];
}

export interface TravelState {
  currentPlan: Plan | null;
  plans: Plan[];
  isLoading: boolean;
  error: string | null;
}

export interface ImageState {
  images: Image[];
  selectedImages: string[]; // URLs of selected images
  isLoading: boolean;
  error: string | null;
}
