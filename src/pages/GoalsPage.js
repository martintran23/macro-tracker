import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import { fetchRecommendation } from "../services/recommendationService";

const goals = [
  { id: "fitness", label: "Improve Fitness" },
  { id: "maintain-weight", label: "Maintain Weight" },
  { id: "stay-healthy", label: "Stay Healthy" },
];

function GoalsPage({
  userProfile,
  fitnessGoal,
  setFitnessGoal,
  setRecommendation,
  setSetupComplete,
}) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGoalSubmit = async (event) => {
    event.preventDefault();
    if (!fitnessGoal) {
      setErrorMessage("Please select a goal to continue.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetchRecommendation({
        ...userProfile,
        goal: fitnessGoal,
      });

      setRecommendation({
        calories: response.calories,
        protein: response.protein,
        carbs: response.carbs,
        fats: response.fats,
        workoutIntensity: response.workoutIntensity,
      });
      setSetupComplete(true);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Unable to generate recommendations. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page goals-page">
      <Card title="Choose Your Primary Goal">
        <p className="hero-text compact">
          We combine visible lifestyle inputs with hidden states like recovery and fatigue to tune
          your recommendations.
        </p>
        <form className="input-form" onSubmit={handleGoalSubmit}>
          <div className="goal-options">
            {goals.map((goal) => (
              <button
                key={goal.id}
                type="button"
                className={fitnessGoal === goal.id ? "goal-option active" : "goal-option"}
                onClick={() => setFitnessGoal(goal.id)}
              >
                {goal.label}
              </button>
            ))}
          </div>
          {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Building Plan..." : "Complete Setup"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default GoalsPage;
