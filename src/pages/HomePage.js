import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page home-page">
      <Card>
        <h1 className="hero-title">Train smarter with personalized macro coaching.</h1>
        <p className="hero-text">
          MacroTracker helps you balance calories, protein, carbs, and fats while recommending
          workout intensity based on your lifestyle and recovery signals.
        </p>
        <Button onClick={() => navigate("/input")}>Get Started</Button>
      </Card>
    </div>
  );
}

export default HomePage;
