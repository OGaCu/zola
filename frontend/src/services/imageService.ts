import apiCall from "./api";
import { Image } from "../types";

// Image service for Unsplash API calls
export const imageService = {
  // Search for images using Unsplash API
  searchImages: async (query: string) => {
    try {
      console.log("Calling searchImages endpoint with query:", query);

      const data = await apiCall(`/get-images?query=${encodeURIComponent(query)}`, {
        method: "GET",
      });

      console.log("Search Images Response:", data);

      if (data.status === "success") {
        console.log(`✅ Found ${data.data.images?.length || 0} images for "${query}"`);
        return data.data.images || [];
      } else {
        console.error("Error searching images:", data.data.error);
        return [];
      }
    } catch (error) {
      console.error("Search Images API call failed:", error);
      return [];
    }
  },

  // Get random images from Unsplash API
  getRandomImages: async () => {
    try {
      console.log("Calling getRandomImages endpoint");

      const data = await apiCall("/get-random-images", {
        method: "GET",
      });

      console.log("Random Images Response:", data);

      if (data.status === "success") {
        console.log(`✅ Found ${data.data.images?.length || 0} random images`);
        return data.data.images || [];
      } else {
        console.error("Error getting random images:", data.data.error);
        return [];
      }
    } catch (error) {
      console.error("Get Random Images API call failed:", error);
      return [];
    }
  },

  // Test function with sample search query
  testSearchImages: async () => {
    return await imageService.searchImages("nature");
  },

  // Test function for random images
  testGetRandomImages: async () => {
    return await imageService.getRandomImages();
  },
};
