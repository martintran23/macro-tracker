import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 7000,
});

export async function fetchRecommendation(payload) {
  try {
    const response = await apiClient.post("/recommendation", payload);
    return response.data;
  } catch (error) {
    // Fallback mock response for local/frontend-only development.
    return {
      calories: 2300,
      protein: 165,
      carbs: 240,
      fats: 70,
      workoutIntensity: "Moderate",
      _meta: {
        mocked: true,
        message: error?.message || "Using mock data.",
      },
    };
  }
}
