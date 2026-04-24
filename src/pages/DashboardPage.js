import Card from "../components/Card";

const goalLabels = {
  fitness: "Improve Fitness",
  "maintain-weight": "Maintain Weight",
  "stay-healthy": "Stay Healthy",
};

function DashboardPage({ recommendation, fitnessGoal, email }) {
  return (
    <div className="page dashboard-page">
      <h1 className="page-title">Your Daily Recommendations</h1>
      <p className="hero-text compact">
        Signed in as <strong>{email || "guest"}</strong>. Goal:{" "}
        <strong>{goalLabels[fitnessGoal] || "Custom Plan"}</strong>.
      </p>
      <div className="card-grid">
        <Card title="Calorie Target">
          <p className="metric-value">{recommendation.calories} kcal</p>
        </Card>
        <Card title="Protein">
          <p className="metric-value">{recommendation.protein} g</p>
        </Card>
        <Card title="Carbs">
          <p className="metric-value">{recommendation.carbs} g</p>
        </Card>
        <Card title="Fats">
          <p className="metric-value">{recommendation.fats} g</p>
        </Card>
        <Card title="Workout Intensity">
          <p className="metric-value">{recommendation.workoutIntensity}</p>
        </Card>
      </div>
      <Card title="How Recommendations Are Modeled">
        <p className="hero-text compact">
          The Bayesian network combines observed inputs (sleep, calories, protein, weight, height,
          and workout intensity) with hidden states such as recovery, fatigue, and metabolism to
          estimate your current fitness state and balance progress with burnout prevention.
        </p>
      </Card>
    </div>
  );
}

export default DashboardPage;
