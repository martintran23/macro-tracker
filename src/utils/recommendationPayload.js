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
  return {
    calories: data.calories,
    protein: data.protein,
    carbs: data.carbs,
    fats: data.fats,
    workoutIntensity: data.workoutIntensity,
    probabilities: data.probabilities ?? null,
    _meta: data._meta,
  };
}
