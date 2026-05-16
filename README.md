# MacroTracker

MacroTracker is an AI-powered fitness and nutrition application designed to simplify healthy living by providing personalized dietary and workout recommendations. Using a Bayesian network, the system analyzes user behavior, physical condition, and lifestyle factors-such as sleep, calorie intake, and workout intensity-to estimate the user’s current state.

Based on this probabilistic inference, MacroTracker generates tailored daily calorie targets, macronutrient distributions, and exercise recommendations aligned with fitness goals like muscle gain, fat loss, and long-term consistency, while helping minimize burnout.

## Files/Folders

---

**Cesar Carrillo** | Bayesian network model

---
### bayesian_model

bayesian_network.py - Defines Bayesian Network Model for fitness recommendations. It takes user inputs as evidence like sleep, workout intensity, protein intake, and calories. It infers fatigue level, recovery, and the best workout recommendation such as Rest, Light workout, Intense workout.

test_bayesianetwork.py - Tests the model by creating sample user data and converting it into the model's expected format. Then it prints the recommendations.


---

**Mike Altamirano** | Backend development, API design, database management, Bayesian integration

---
### backend
### Project structure

```
macro-tracker/
├── bayesian_model/
│   └── bayesian_network.py    ← Cesar's model (imported by app.py)
├── backend/
│   ├── app.py                 ← Flask server (this file)
│   ├── requirements.txt
│   ├── macrotracker.db        ← SQLite DB (auto-created on first run)
│   └── README.md
└── src/                       ← Martin's React frontend
```

---

**Martin Tran** | Frontend development: React app in `src/`, including the auth page, dashboard, goals page, homepage, daily input and related pages, and shared UI components.

---
### Frontend Setup

```bash
npm install
npm start
```

### src (frontend)

```
src/
├── App.js                      ← App shell, routing, and shared state
├── index.js                    ← React DOM entry point
├── components/
│   ├── BayesianPieChart.js     ← Pie chart for rest / light / intense workout odds
│   ├── Button.js               ← Reusable styled button
│   ├── Card.js                 ← Reusable card layout wrapper
│   ├── InputField.js           ← Labeled form input
│   └── Navbar.js               ← Top navigation and sign-out
├── pages/
│   ├── AuthPage.js             ← Login and registration by email
│   ├── DashboardPage.js        ← Daily macros, workout tip, and probability chart
│   ├── GoalsPage.js            ← Fitness goal selection and save to API
│   ├── HomePage.js             ← Landing page and get-started CTA
│   ├── InputPage.js            ← Daily lifestyle inputs (sleep, calories, protein, workout)
│   ├── ProfilePage.js          ← Edit profile and refresh recommendations
│   └── ProfileSetupPage.js     ← Initial weight and height setup
├── services/
│   ├── apiClient.js            ← Axios client for Flask `/api` routes
│   ├── recommendationService.js ← Fetch macro and workout recommendations
│   └── userApi.js              ← Auth, profile, goals, and daily log API calls
└── styles/
    └── global.css              ← Global layout, typography, and theme styles
```

---

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app (OR python app.py)
```

The server starts on **http://localhost:5000**.

### Connect the React frontend

Add one line to `package.json` (in the project root) so the React dev server
proxies `/api` calls to Flask:

```json
"proxy": "http://localhost:5000"
```

---

### Database

SQLite file `macrotracker.db` is created automatically on first run.

| Table | Purpose |
|---|---|
| `users` | Email-based accounts |
| `profiles` | Weight and height per user |
| `goals` | Active fitness goal per user |
| `daily_logs` | Raw lifestyle inputs logged each day |
| `recommendations` | Bayesian output + macro targets, one per session |

---

### API Reference

### Auth
| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/api/auth/register` | `{ email }` | Create account (returns userId) |
| POST | `/api/auth/login` | `{ email }` | Look up existing user |

### Profile
| Method | Endpoint | Body | Description |
|---|---|---|---|
| GET | `/api/profile/:userId` | - | Fetch saved profile |
| POST | `/api/profile/:userId` | `{ weight, height }` | Save / update profile |

### Goals
| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/api/goals/:userId` | `{ goal }` | Save fitness goal |

### Daily log
| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/api/log/:userId` | `{ sleepQuality, dailyCalorieIntake, proteinIntake, workoutIntensity }` | Save today's inputs |
| GET | `/api/log/:userId` | - | Last 30 days of logs |

### Recommendation (main pipeline)
| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/api/recommendation` | See below | Run full pipeline, return macros |
| GET | `/api/recommendation/:userId/history` | - | Last 30 recommendations |

**POST `/api/recommendation` payload:**
```json
{
  "weight": 75,
  "height": 178,
  "sleepQuality": 4,
  "dailyCalorieIntake": 2100,
  "proteinIntake": 130,
  "workoutIntensity": 6,
  "goal": "fitness",
  "userId": 1
}
```

**Response:**
```json
{
  "calories": 2800,
  "protein": 135,
  "carbs": 310,
  "fats": 78,
  "workoutIntensity": "Intense Workout",
  "probabilities": {
    "rest": 0.04,
    "light": 0.21,
    "intense": 0.75
  }
}
```

### Health check
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Confirms server + model are running |

---

### Data processing pipeline

```
Raw user input
     │
     ▼
estimate_bmr(weight, height)          ← Mifflin-St Jeor (sex-neutral)
     │
     ▼
Discretize all inputs                 ← thresholds match Cesar's test file
  sleep 1-5      → 0=Poor / 1=Avg / 2=Good
  workout 1-10   → 0=Light / 1=Avg / 2=Intense
  calories (raw) → 0=Low / 1=Avg / 2=High  (<1600 / 1600-2400 / >2400)
  protein (raw)  → 0=Low / 1=Avg / 2=High  (<50g / 50-100g / >100g)
     │
     ▼
FitnessModel.recommend(evidence)      ← Cesar's Bayesian network (pgmpy)
  → workout_label: Rest / Light Workout / Intense Workout
     │
     ▼
compute_macros(bmr, weight, label, goal)
  calories = BMR × TDEE multiplier
  protein  = goal-driven g/kg bodyweight
  fat      = 25% of calories
  carbs    = remaining calories
     │
     ▼
JSON response → Martin's frontend
```
