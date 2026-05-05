import numpy as np
from pgmpy.models import DiscreteBayesianNetwork
from pgmpy.factors.discrete import TabularCPD
from pgmpy.inference import VariableElimination


class FitnessModelPGM:
    def __init__(self):

        # Structure
        self.model = DiscreteBayesianNetwork([
            ('Weight', 'Metabolism'),
            ('Height', 'Metabolism'),
            ('WorkoutInput', 'Metabolism'),

            ('Sleep', 'Recovery'),
            ('Calories', 'Recovery'),
            ('Protein', 'Recovery'),

            ('Recovery', 'Fatigue'),

            ('Fatigue', 'WorkoutPlan'),
            ('Goal', 'WorkoutPlan'),

            ('Metabolism', 'CaloriePlan'),
            ('Goal', 'CaloriePlan'),

            ('Fatigue', 'Adherence'),
            ('WorkoutPlan', 'Adherence'),
        ])

        # Parent Nodes
        cpd_weight = TabularCPD(
            'Weight', 2,
            np.array([[0.5], [0.5]]),
            state_names={'Weight': ['low', 'high']}
        )

        cpd_height = TabularCPD(
            'Height', 2,
            np.array([[0.5], [0.5]]),
            state_names={'Height': ['short', 'tall']}
        )

        cpd_workout_input = TabularCPD(
            'WorkoutInput', 3,
            np.array([[0.3], [0.4], [0.3]]),
            state_names={'WorkoutInput': ['light', 'moderate', 'intense']}
        )

        cpd_sleep = TabularCPD(
            'Sleep', 3,
            np.array([[0.3], [0.5], [0.2]]),
            state_names={'Sleep': ['low', 'medium', 'high']}
        )

        cpd_calories = TabularCPD(
            'Calories', 3,
            np.array([[0.3], [0.4], [0.3]]),
            state_names={'Calories': ['low', 'medium', 'high']}
        )

        cpd_protein = TabularCPD(
            'Protein', 3,
            np.array([[0.3], [0.4], [0.3]]),
            state_names={'Protein': ['low', 'medium', 'high']}
        )

        cpd_goal = TabularCPD(
            'Goal', 3,
            np.array([[0.4], [0.3], [0.3]]),
            state_names={'Goal': ['improve', 'maintain', 'healthy']}
        )

        # Metabolism Node
        cpd_metabolism = TabularCPD(
            'Metabolism', 2,
            np.array([
                [0.8, 0.7, 0.6, 0.5, 0.6, 0.5, 0.4, 0.3, 0.5, 0.4, 0.3, 0.2],
                [0.2, 0.3, 0.4, 0.5, 0.4, 0.5, 0.6, 0.7, 0.5, 0.6, 0.7, 0.8]
            ]),
            evidence=['Weight', 'Height', 'WorkoutInput'],
            evidence_card=[2, 2, 3],
            state_names={
                'Metabolism': ['low', 'high'],
                'Weight': ['low', 'high'],
                'Height': ['short', 'tall'],
                'WorkoutInput': ['light', 'moderate', 'intense']
            }
        )

        # Recovery Node
        cpd_recovery = TabularCPD(
            'Recovery', 3,
            np.array([
                [0.6]*27,
                [0.3]*27,
                [0.1]*27
            ]),
            evidence=['Sleep', 'Calories', 'Protein'],
            evidence_card=[3, 3, 3],
            state_names={
                'Recovery': ['poor', 'ok', 'good'],
                'Sleep': ['low', 'medium', 'high'],
                'Calories': ['low', 'medium', 'high'],
                'Protein': ['low', 'medium', 'high']
            }
        )

        # Fatigue Node
        cpd_fatigue = TabularCPD(
            'Fatigue', 3,
            np.array([
                [0.7, 0.4, 0.2],
                [0.2, 0.4, 0.3],
                [0.1, 0.2, 0.5]
            ]),
            evidence=['Recovery'],
            evidence_card=[3],
            state_names={
                'Fatigue': ['high', 'medium', 'low'],
                'Recovery': ['poor', 'ok', 'good']
            }
        )

        # Workout Plan
        cpd_workout_plan = TabularCPD(
            'WorkoutPlan', 3,
            np.array([
            [
                0.7, 0.6, 0.5,      # high fatigue
                0.5, 0.4, 0.3,      # medium fatigue
                0.3, 0.2, 0.1       # low fatigue
            ],

            [
                0.2, 0.3, 0.3,
                0.3, 0.4, 0.4,
                0.4, 0.5, 0.4
             ],

             [
                 0.1, 0.1, 0.2,
                 0.2, 0.2, 0.3,
                 0.3, 0.3, 0.5
              ]
            ]),
            evidence=['Fatigue', 'Goal'],
            evidence_card=[3, 3],
            state_names={
                'WorkoutPlan': ['light', 'moderate', 'intense'],
                'Fatigue': ['high', 'medium', 'low'],
                'Goal': ['improve', 'maintain', 'healthy']
            }
        )

        # Calorie Plan
        cpd_calorie = TabularCPD(
            'CaloriePlan', 3,
            np.array([
                [
                    0.6, 0.4, 0.3,      # high metabolism
                    0.4, 0.3, 0.2       # low metabolism
                ],
                [
                    0.3, 0.4, 0.4,
                    0.4, 0.4, 0.4
                ],
                [
                    0.1, 0.2, 0.3,
                    0.2, 0.3, 0.4
                ]
            ]),
            evidence=['Metabolism', 'Goal'],
            evidence_card=[2, 3],
            state_names={
                'CaloriePlan': ['decrease', 'maintain', 'increase'],
                'Metabolism': ['low', 'high'],
                'Goal': ['improve', 'maintain', 'healthy']
            }
        )

        # Adherence
        cpd_adherence = TabularCPD(
            'Adherence', 3,
            np.array([
                [
                    0.7, 0.5, 0.3,      # high fatigue
                    0.5, 0.3, 0.2,      # medium fatigue
                    0.3, 0.2, 0.1       # low fatigue
                ],
                [
                    0.2, 0.3, 0.4,
                    0.3, 0.4, 0.5,
                    0.4, 0.5, 0.4
                ],
                [
                    0.1, 0.2, 0.3,
                    0.2, 0.3, 0.3,
                    0.3, 0.3, 0.5
                ]
            ]),
            evidence=['Fatigue', 'WorkoutPlan'],
            evidence_card=[3, 3],
            state_names={
                'Adherence': ['low', 'medium', 'high'],
                'Fatigue': ['high', 'medium', 'low'],
                'WorkoutPlan': ['light', 'moderate', 'intense']
            }
        )

        # CPDs
        self.model.add_cpds(
            cpd_weight, cpd_height, cpd_workout_input,
            cpd_sleep, cpd_calories, cpd_protein,
            cpd_goal, cpd_metabolism,
            cpd_recovery, cpd_fatigue,
            cpd_workout_plan, cpd_calorie,
            cpd_adherence
        )

        assert self.model.check_model()

        self.infer = VariableElimination(self.model)

    # Helper function for labeling results
    def get_label(self, probs, labels):
        return labels[int(np.argmax(probs))]
    
    # Generates reasonings based on evidence
    def generate_reasoning(self, evidence, result):
        reasons = []

    # Sleep influence
        if evidence['Sleep'] == 'low':
            reasons.append("Low sleep is reducing your recovery capacity.")
        elif evidence['Sleep'] == 'high':
            reasons.append("Good sleep is improving recovery and performance.")

    # Workout input influence
        if evidence['WorkoutInput'] == 'intense':
            reasons.append("High workout intensity increases fatigue risk.")
        elif evidence['WorkoutInput'] == 'light':
            reasons.append("Low training load supports recovery.")

    # Goal influence
        if evidence['Goal'] == 'improve':
            reasons.append("Your goal prioritizes performance improvement.")
        elif evidence['Goal'] == 'healthy':
            reasons.append("Your goal focuses on long-term sustainability.")

    # Interpreted outcome
        workout = result["WorkoutPlan"]
        best_idx = int(np.argmax(workout))
        best_workout = ["light", "moderate", "intense"][best_idx]
        reasons.append(f"Based on your current state, a {best_workout} workout plan is recommended.")

        adherence_prob = result["Adherence"]
        adherence_states = ["low", "medium", "high"]
        best_adherence_idx = int(np.argmax(adherence_prob))
        best_adherence = adherence_states[best_adherence_idx]
        reasons.append(f"You are most likely to have {best_adherence} adherence to this plan.")

        confidence = float(workout[best_idx])
        reasons.append(f"The confidence in this workout recommendation is {confidence:.2f}.")
        return reasons

    # Mappings
    def map_sleep(self, v):
        if v <= 2:
            return "low"
        elif v <= 4:
            return "medium"
        return "high"

    def map_workout(self, v):
        if v <= 3:
            return "light"
        elif v <= 7:
            return "moderate"
        return "intense"

    
    # Inference
    def recommend(self, sleep, workout, calories, protein, goal, weight, height):

        evidence = {
            'Sleep': self.map_sleep(sleep),
            'WorkoutInput': self.map_workout(workout),
            'Calories': calories,
            'Protein': protein,
            'Goal': goal,
            'Weight': weight,
            'Height': height
        }

        workout_res = self.infer.query(['WorkoutPlan'], evidence=evidence).values
        calorie_res = self.infer.query(['CaloriePlan'], evidence=evidence).values
        adherence_res = self.infer.query(['Adherence'], evidence=evidence).values

        final_result = {
            "WorkoutPlan": self.get_label(workout_res, ["light", "moderate", "intense"]),
            "CaloriePlan": self.get_label(calorie_res, ["decrease", "maintain", "increase"]),
            "Adherence": self.get_label(adherence_res, ["low", "medium", "high"])
        }


        result = {
            "WorkoutPlan": workout_res,
            "CaloriePlan": calorie_res,
            "Adherence": adherence_res
        }
        
        reasoning = self.generate_reasoning(evidence, result)

        return {
            "result": final_result,
            "reasoning": reasoning
        }