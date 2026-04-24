import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import InputField from "../components/InputField";

function ProfileSetupPage({ userProfile, setUserProfile, nextPath = "/setup/goals" }) {
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(nextPath);
  };

  return (
    <div className="page profile-setup-page">
      <Card title="Profile Personalization">
        <p className="hero-text compact">
          These factors are inputs to your Bayesian model and can be edited any time in Profile.
        </p>
        <form className="input-form" onSubmit={handleSubmit}>
          <InputField
            id="weight"
            label="Weight (kg)"
            value={userProfile.weight}
            onChange={handleChange}
            min="20"
            max="300"
            placeholder="e.g. 72"
          />
          <InputField
            id="height"
            label="Height (cm)"
            value={userProfile.height}
            onChange={handleChange}
            min="100"
            max="250"
            placeholder="e.g. 175"
          />
          <InputField
            id="sleepQuality"
            label="Sleep Quality (1-5)"
            value={userProfile.sleepQuality}
            onChange={handleChange}
            min="1"
            max="5"
            step="1"
            placeholder="e.g. 4"
          />
          <InputField
            id="dailyCalorieIntake"
            label="Daily Calorie Intake"
            value={userProfile.dailyCalorieIntake}
            onChange={handleChange}
            min="800"
            max="7000"
            placeholder="e.g. 2200"
          />
          <InputField
            id="proteinIntake"
            label="Protein Intake (g)"
            value={userProfile.proteinIntake}
            onChange={handleChange}
            min="20"
            max="400"
            placeholder="e.g. 140"
          />
          <InputField
            id="workoutIntensity"
            label="Workout Intensity (1-10)"
            value={userProfile.workoutIntensity}
            onChange={handleChange}
            min="1"
            max="10"
            step="1"
            placeholder="e.g. 7"
          />
          <Button type="submit">Continue to Goals</Button>
        </form>
      </Card>
    </div>
  );
}

export default ProfileSetupPage;
