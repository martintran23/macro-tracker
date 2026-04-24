import Card from "../components/Card";

function DashboardPage({ recommendation }) {
  return (
    <div className="page dashboard-page">
      <h1 className="page-title">Your Daily Recommendations</h1>
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
    </div>
  );
}

export default DashboardPage;
