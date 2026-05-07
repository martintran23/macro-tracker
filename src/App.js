import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import AuthPage from "./pages/AuthPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import GoalsPage from "./pages/GoalsPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [userAccount, setUserAccount] = useState({
    email: "",
    userId: null,
  });
  const [userProfile, setUserProfile] = useState({
    weight: "",
    height: "",
    sleepQuality: "",
    dailyCalorieIntake: "",
    proteinIntake: "",
    workoutIntensity: "",
  });
  const [fitnessGoal, setFitnessGoal] = useState("");

  const [recommendation, setRecommendation] = useState({
    calories: 2200,
    protein: 150,
    carbs: 240,
    fats: 70,
    workoutIntensity: "Moderate",
    probabilities: null,
  });

  return (
    <div className="app-shell">
      <Navbar
        isAuthenticated={isAuthenticated}
        setupComplete={setupComplete}
        onSignOut={() => {
          setIsAuthenticated(false);
          setSetupComplete(false);
          setFitnessGoal("");
          setUserAccount({ email: "", userId: null });
          setRecommendation({
            calories: 2200,
            protein: 150,
            carbs: 240,
            fats: 70,
            workoutIntensity: "Moderate",
            probabilities: null,
          });
          setUserProfile({
            weight: "",
            height: "",
            sleepQuality: "",
            dailyCalorieIntake: "",
            proteinIntake: "",
            workoutIntensity: "",
          });
        }}
      />
      <main className="page-container">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to={setupComplete ? "/dashboard" : "/setup/profile"} replace />
              ) : (
                <AuthPage setIsAuthenticated={setIsAuthenticated} setUserAccount={setUserAccount} />
              )
            }
          />
          <Route
            path="/setup/profile"
            element={
              isAuthenticated ? (
                <ProfileSetupPage
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                  nextPath="/setup/goals"
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/setup/goals"
            element={
              isAuthenticated ? (
                <GoalsPage
                  userId={userAccount.userId}
                  userProfile={userProfile}
                  fitnessGoal={fitnessGoal}
                  setFitnessGoal={setFitnessGoal}
                  setRecommendation={setRecommendation}
                  setSetupComplete={setSetupComplete}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated && setupComplete ? (
                <DashboardPage
                  recommendation={recommendation}
                  fitnessGoal={fitnessGoal}
                  email={userAccount.email}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated && setupComplete ? (
                <ProfilePage
                  userId={userAccount.userId}
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                  fitnessGoal={fitnessGoal}
                  setRecommendation={setRecommendation}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
