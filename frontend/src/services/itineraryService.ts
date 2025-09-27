import apiCall from "./api";
import { Plan } from "../types";

// Itinerary service for travel planning
export const itineraryService = {
  // Create itinerary based on plan data
  createItinerary: async (planData: Plan) => {
    try {
      console.log("Calling createItinerary endpoint with plan data:", planData);

      const data = await apiCall("/create-itinerary", {
        method: "POST",
        body: JSON.stringify(planData),
      });

      console.log("CreateItinerary Response:", data);

      if (data.status === "success") {
        console.log("Generated Itinerary:", data.data.itinerary);
      } else {
        console.error("Error creating itinerary:", data.data.error);
      }

      return data;
    } catch (error) {
      console.error("CreateItinerary API call failed:", error);
      return null;
    }
  },

  // Test function with fake data
  testCreateItinerary: async () => {
    const fakePlanData: Plan = {
      dateFrom: "2024-06-15",
      dateTo: "2024-06-22",
      location: "Paris, France",
      numPeople: 2,
      budget: "medium",
      mood: "romantic",
      images: [], // Empty images array for test
    };

    return await itineraryService.createItinerary(fakePlanData);
  },
};
