import { apiClient } from "./apiClient";

export async function registerUser(email) {
  const { data } = await apiClient.post("/auth/register", { email });
  return data;
}

export async function loginUser(email) {
  const { data } = await apiClient.post("/auth/login", { email });
  return data;
}

export async function saveProfile(userId, { weight, height }) {
  await apiClient.post(`/profile/${userId}`, {
    weight: Number(weight),
    height: Number(height),
  });
}

export async function saveGoal(userId, goal) {
  await apiClient.post(`/goals/${userId}`, { goal });
}

export async function saveDailyLog(userId, payload) {
  await apiClient.post(`/log/${userId}`, {
    sleepQuality: Number(payload.sleepQuality),
    dailyCalorieIntake: Number(payload.dailyCalorieIntake),
    proteinIntake: Number(payload.proteinIntake),
    workoutIntensity: Number(payload.workoutIntensity),
  });
}
