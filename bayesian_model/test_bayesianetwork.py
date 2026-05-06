from bayesian_network import FitnessModel

model = FitnessModel()

def map_sleep(score):
    if score <= 2:
        return 0
    elif score <= 4:
        return 1
    else:
        return 2

def map_workout(score):
    if score <= 3:
        return 0
    elif score <= 7:
        return 1
    else:
        return 2

def map_calories(score):
    if score < 1600:
        return 0
    elif score <= 2400:
        return 1
    else:
        return 2

def map_protein(score):
    if score < 50:
        return 0
    elif score <= 100:
        return 1
    else:
        return 0
    
user_input_sleep = 5
user_input_workout = 3
user_input_calories = 1700
user_input_protein = 50

evidence = {
    'SleepQuality': map_sleep(user_input_sleep),
    'WorkoutIntensity': map_workout(user_input_workout),
    'ProteinIntake': map_protein(user_input_protein),
    'CalorieIntake': map_calories(user_input_calories)
}

model.recommend(evidence)