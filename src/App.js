import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import InputPage from "./pages/InputPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const [userInput, setUserInput] = useState({
    weight: "",
    height: "",
    sleepQuality: "",
    dailyCalorieIntake: "",
    proteinIntake: "",
    workoutIntensity: "",
  });

  const [recommendation, setRecommendation] = useState({
    calories: 2200,
    protein: 150,
    carbs: 240,
    fats: 70,
    workoutIntensity: "Moderate",
  });

  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/input"
            element={
              <InputPage
                userInput={userInput}
                setUserInput={setUserInput}
                setRecommendation={setRecommendation}
              />
            }
          />
          <Route path="/dashboard" element={<DashboardPage recommendation={recommendation} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
