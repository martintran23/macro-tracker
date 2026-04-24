import Card from "../components/Card";
import ProfileSetupPage from "./ProfileSetupPage";

function ProfilePage({ userProfile, setUserProfile }) {
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
      />
    </div>
  );
}

export default ProfilePage;
