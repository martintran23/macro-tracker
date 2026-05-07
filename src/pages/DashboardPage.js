import Card from "../components/Card";
import BayesianPieChart from "../components/BayesianPieChart";

const goalLabels = {
  fitness: "Improve Fitness",
  "maintain-weight": "Maintain Weight",
  "stay-healthy": "Stay Healthy",
};

function formatMetric(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : "-";
}

function DashboardPage({ recommendation, fitnessGoal, email }) {
  const p = recommendation.probabilities;
  const showProbabilities =
    p && typeof p === "object" && "rest" in p && "light" in p && "intense" in p;

  return (
    <div className="page dashboard-page">
      <h1 className="page-title">Your Daily Recommendations</h1>
      <p className="hero-text compact">
        Signed in as <strong>{email || "guest"}</strong>. Goal:{" "}
        <strong>{goalLabels[fitnessGoal] || "Custom Plan"}</strong>.
      </p>
      <div className="card-grid">
        <Card title="Calorie Target">
          <p className="metric-value">{formatMetric(recommendation.calories)} kcal</p>
        </Card>
        <Card title="Protein">
          <p className="metric-value">{formatMetric(recommendation.protein)} g</p>
        </Card>
        <Card title="Carbs">
          <p className="metric-value">{formatMetric(recommendation.carbs)} g</p>
        </Card>
        <Card title="Fats">
          <p className="metric-value">{formatMetric(recommendation.fats)} g</p>
        </Card>
        <Card title="Workout Intensity">
          <p className="metric-value">{recommendation.workoutIntensity || "-"}</p>
        </Card>
        {showProbabilities ? (
          <Card title="Bayesian workout probabilities" className="card-bayesian-probabilities">
            <BayesianPieChart probabilities={p} />
          </Card>
        ) : null}
        <Card title="How Recommendations Are Modeled" className="card-model-explainer">
          <p className="hero-text compact">
            The Bayesian network combines observed inputs (sleep, calories, protein, weight, height,
            and workout intensity) with hidden states such as recovery, fatigue, and metabolism to
            estimate your current fitness state and balance progress with burnout prevention.
          </p>
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage;
