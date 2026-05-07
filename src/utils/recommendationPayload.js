export function buildRecommendationPayload(userProfile, fitnessGoal, userId) {
  const {
    weight,
    height,
    sleepQuality,
    dailyCalorieIntake,
    proteinIntake,
    workoutIntensity,
  } = userProfile;

  const payload = {
    weight: Number(weight),
    height: Number(height),
    sleepQuality: Number(sleepQuality),
    dailyCalorieIntake: Number(dailyCalorieIntake),
    proteinIntake: Number(proteinIntake),
    workoutIntensity: Number(workoutIntensity),
    goal: fitnessGoal || "stay-healthy",
  };

  if (userId != null && userId !== "") {
    payload.userId = Number(userId);
  }

  return payload;
}

export function mapRecommendationToState(data) {
  const toNum = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : v;
  };

  return {
    calories: toNum(data.calories),
    protein: toNum(data.protein),
    carbs: toNum(data.carbs),
    fats: toNum(data.fats),
    workoutIntensity: data.workoutIntensity,
    probabilities: data.probabilities ?? null,
    ...(data._meta !== undefined ? { _meta: data._meta } : {}),
  };
}
