from bayesian_fitness import *


model = FitnessModelPGM()

result = model.recommend(
    sleep=5,
    workout=5,
    calories="high",
    protein="high",
    goal="improve",
    weight="high",
    height="short"
)

print(result)