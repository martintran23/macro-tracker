import { apiClient } from "./apiClient";
import { mapRecommendationToState } from "../utils/recommendationPayload";

function mockRecommendation() {
  return mapRecommendationToState({
    calories: 2300,
    protein: 165,
    carbs: 240,
    fats: 70,
    workoutIntensity: "Moderate",
    probabilities: null,
    _meta: { mocked: true },
  });
}

export async function fetchRecommendation(payload) {
  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    return mockRecommendation();
  }

  try {
    const { data } = await apiClient.post("/recommendation", payload);
    return mapRecommendationToState(data);
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.message ||
      "Unable to reach recommendation service.";
    throw new Error(message);
  }
}
