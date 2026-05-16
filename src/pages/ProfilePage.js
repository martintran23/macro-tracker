import Card from "../components/Card";
import ProfileSetupPage from "./ProfileSetupPage";
import { fetchRecommendation } from "../services/recommendationService";
import { saveDailyLog, saveProfile } from "../services/userApi";
import { buildRecommendationPayload } from "../utils/recommendationPayload";

function ProfilePage({
  userId,
  userProfile,
  setUserProfile,
  fitnessGoal,
  setRecommendation,
}) {
  const handleBeforeNavigate = async () => {
    if (userId == null) {
      throw new Error("Session expired. Please sign in again.");
    }
    await saveProfile(userId, {
      weight: userProfile.weight,
      height: userProfile.height,
    });
    await saveDailyLog(userId, userProfile);
    const payload = buildRecommendationPayload(userProfile, fitnessGoal, userId);
    const rec = await fetchRecommendation(payload);
    setRecommendation(rec);
  };

  return (
    <div className="page">
      <Card title="Profile">
        <p className="hero-text compact">
          Update your baseline profile any time. Changes influence your next recommendation cycle.
        </p>
      </Card>
      <ProfileSetupPage
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        nextPath="/dashboard"
        beforeNavigate={handleBeforeNavigate}
      />
    </div>
  );
}

export default ProfilePage;
