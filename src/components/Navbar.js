import { NavLink } from "react-router-dom";
import Button from "./Button";

function Navbar({ isAuthenticated, setupComplete, onSignOut }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to={isAuthenticated && setupComplete ? "/dashboard" : "/"} className="brand">
          <span className="brand-name">MacroTracker</span>
          <span className="brand-sub">Titan health · Cal State Fullerton</span>
        </NavLink>
        {isAuthenticated ? (
          <nav className="nav-links">
            {setupComplete ? (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  Profile
                </NavLink>
              </>
            ) : (
              <span className="nav-status">Setup in progress</span>
            )}
            <Button variant="secondary" onClick={onSignOut}>
              Sign Out
            </Button>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

export default Navbar;
