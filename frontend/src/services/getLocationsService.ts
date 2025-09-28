import apiCall from "./api";

// Get locations service for TripAdvisor data
export const getLocationsService = {
  // Get locations based on query strings
  getLocations: async (queries: string[]) => {
    try {
      console.log("Calling get-locations endpoint with queries:", queries);

      const data = await apiCall("/get-locations", {
        method: "POST",
        body: JSON.stringify({ queries }),
      });

      console.log("GetLocations Response:", data);

      if (data.status === "success") {
        console.log("Locations fetched successfully:", data.data.locations);
        console.log("Total locations found:", data.data.total_count);
      } else {
        console.error("Error fetching locations:", data.data.error);
      }

      return data;
    } catch (error) {
      console.error("GetLocations API call failed:", error);
      return null;
    }
  },

  // Test function with sample queries
  testGetLocations: async () => {
    const testQueries = [
      "New York attractions",
      "New York restaurants",
      "New York hotels",
    ];
    return await getLocationsService.getLocations(testQueries);
  },
};
