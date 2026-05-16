import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Card from "../components/Card";
import { fetchRecommendation } from "../services/recommendationService";

function InputPage({ userInput, setUserInput, setRecommendation }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetchRecommendation(userInput);
      setRecommendation({
        calories: response.calories,
        protein: response.protein,
        carbs: response.carbs,
        fats: response.fats,
        workoutIntensity: response.workoutIntensity,
      });
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Unable to fetch recommendation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page input-page">
      <Card title="Tell us about your routine">
        <form className="input-form" onSubmit={handleSubmit}>
          <InputField
            id="weight"
            label="Weight (kg)"
            value={userInput.weight}
            onChange={handleChange}
            min="20"
            max="300"
            placeholder="e.g. 72"
          />
          <InputField
            id="height"
            label="Height (cm)"
            value={userInput.height}
            onChange={handleChange}
            min="100"
            max="250"
            placeholder="e.g. 175"
          />
          <InputField
            id="sleepQuality"
            label="Sleep Quality (1-5)"
            value={userInput.sleepQuality}
            onChange={handleChange}
            min="1"
            max="5"
            step="1"
            placeholder="e.g. 4"
          />
          <InputField
            id="dailyCalorieIntake"
            label="Daily Calorie Intake"
            value={userInput.dailyCalorieIntake}
            onChange={handleChange}
            min="800"
            max="7000"
            placeholder="e.g. 2200"
          />
          <InputField
            id="proteinIntake"
            label="Protein Intake (g)"
            value={userInput.proteinIntake}
            onChange={handleChange}
            min="20"
            max="400"
            placeholder="e.g. 140"
          />
          <InputField
            id="workoutIntensity"
            label="Workout Intensity (1-10)"
            value={userInput.workoutIntensity}
            onChange={handleChange}
            min="1"
            max="10"
            step="1"
            placeholder="e.g. 7"
          />

          {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Generating..." : "Submit"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default InputPage;
