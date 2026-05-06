# MacroTracker — Backend

**Mike Altamirano** | Backend development, API design, database management, Bayesian integration

---

## Project structure

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

## Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The server starts on **http://localhost:5000**.

### Connect the React frontend

Add one line to `package.json` (in the project root) so the React dev server
proxies `/api` calls to Flask:

```json
"proxy": "http://localhost:5000"
```

---

## Database

SQLite file `macrotracker.db` is created automatically on first run.

| Table | Purpose |
|---|---|
| `users` | Email-based accounts |
| `profiles` | Weight and height per user |
| `goals` | Active fitness goal per user |
| `daily_logs` | Raw lifestyle inputs logged each day |
| `recommendations` | Bayesian output + macro targets, one per session |

---

## API Reference

### Auth
| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/api/auth/register` | `{ email }` | Create account (returns userId) |
| POST | `/api/auth/login` | `{ email }` | Look up existing user |

### Profile
| Method | Endpoint | Body | Description |
|---|---|---|---|
| GET | `/api/profile/:userId` | — | Fetch saved profile |
| POST | `/api/profile/:userId` | `{ weight, height }` | Save / update profile |

### Goals
| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/api/goals/:userId` | `{ goal }` | Save fitness goal |

### Daily log
| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/api/log/:userId` | `{ sleepQuality, dailyCalorieIntake, proteinIntake, workoutIntensity }` | Save today's inputs |
| GET | `/api/log/:userId` | — | Last 30 days of logs |

### Recommendation (main pipeline)
| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/api/recommendation` | See below | Run full pipeline, return macros |
| GET | `/api/recommendation/:userId/history` | — | Last 30 recommendations |

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

## Data processing pipeline

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
