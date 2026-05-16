import numpy as np
from pgmpy.models import DiscreteBayesianNetwork
from pgmpy.factors.discrete import TabularCPD
from pgmpy.inference import VariableElimination


class FitnessModel:
    def __init__(self):

        # Structure
        self.model = DiscreteBayesianNetwork([
            ('SleepQuality', 'Fatigue'),
            ('WorkoutIntensity', 'Fatigue'),
            ('Fatigue', 'Recovery'),
            ('ProteinIntake', 'Recovery'),
            ('Fatigue', 'Recommendation'),
            ('Recovery', 'Recommendation'),
            ('CalorieIntake', 'Recommendation')
        ])

        cpd_sleep = TabularCPD(
        variable='SleepQuality',
        variable_card=3,
        values=[[0.3], [0.4], [0.3]]  # Poor, Avg, Good
        )

        cpd_workout = TabularCPD(
        variable='WorkoutIntensity',
        variable_card=3,
        values=[[0.3], [0.4], [0.3]]  # Light, Avg, Intense
        )

        cpd_protein = TabularCPD(
        variable='ProteinIntake',
        variable_card=3,
        values=[[0.3], [0.5], [0.2]]  # Low, Avg, High
        )

        cpd_calories = TabularCPD(
        variable='CalorieIntake',
        variable_card=3,
        values=[[0.3], [0.4], [0.3]]  # Low, Avg, High
        )

        cpd_fatigue = TabularCPD(
        variable='Fatigue',
        variable_card=3,
        values=[
            # Low
            [0.7, 0.5, 0.3, 0.6, 0.4, 0.2, 0.5, 0.3, 0.1],
            # Medium
            [0.2, 0.3, 0.4, 0.3, 0.4, 0.4, 0.3, 0.4, 0.3],
            # High
            [0.1, 0.2, 0.3, 0.1, 0.2, 0.4, 0.2, 0.3, 0.6]
        ],
        evidence=['SleepQuality', 'WorkoutIntensity'],
        evidence_card=[3, 3]
        )

        cpd_recovery = TabularCPD(
        variable='Recovery',
        variable_card=3,
        values=[
            # Poor
            [0.7, 0.5, 0.3, 0.6, 0.4, 0.2, 0.5, 0.3, 0.1],
            # Moderate
            [0.2, 0.3, 0.4, 0.3, 0.4, 0.4, 0.3, 0.4, 0.3],
            # Good
            [0.1, 0.2, 0.3, 0.1, 0.2, 0.4, 0.2, 0.3, 0.6]
        ],
        evidence=['Fatigue', 'ProteinIntake'],
        evidence_card=[3, 3]
        )

        cpd_recommendation = TabularCPD(
        variable='Recommendation',
        variable_card=3,
        values=[

            # Rest probabilities
            [
                # Fatigue = Low
                0.1, 0.05, 0.05,   # Calories Low
                0.05, 0.05, 0.05,  # Calories Average
                0.05, 0.05, 0.05,  # Calories High

                # Fatigue = Medium
                0.4, 0.3, 0.2,
                0.3, 0.2, 0.1,
                0.2, 0.1, 0.1,

                # Fatigue = High
                0.8, 0.7, 0.6,
                0.7, 0.6, 0.5,
                0.6, 0.5, 0.4
            ],

            # Light probabilities
            [
                # Fatigue = Low
                0.6, 0.4, 0.2,
                0.4, 0.3, 0.2,
                0.3, 0.2, 0.2,

                # Fatigue = Medium
                0.5, 0.5, 0.4,
                0.5, 0.5, 0.4,
                0.4, 0.4, 0.3,

                # Fatigue = High
                0.15, 0.2, 0.3,
                0.2, 0.3, 0.3,
                0.3, 0.3, 0.3
            ],

            # Intense probabilities
            [
                # Fatigue = Low
                0.3, 0.55, 0.75,
                0.55, 0.65, 0.75,
                0.65, 0.75, 0.75,

                # Fatigue = Medium
                0.1, 0.2, 0.4,
                0.2, 0.3, 0.5,
                0.4, 0.5, 0.6,

                # Fatigue = High
                0.05, 0.1, 0.1,
                0.1, 0.1, 0.2,
                0.1, 0.2, 0.3
                ]
            ],
        evidence=['Fatigue', 'Recovery', 'CalorieIntake'],
        evidence_card=[3, 3, 3]
        )

        self.model.add_cpds(
        cpd_sleep,
        cpd_workout,
        cpd_protein,
        cpd_calories,
        cpd_fatigue,
        cpd_recovery,
        cpd_recommendation
        )

        assert self.model.check_model()

        self.inference = VariableElimination(self.model)

    
    def recommend(self, evidence):
        result = self.inference.query(
            variables=['Recommendation'],
            evidence=evidence
        )

        labels = ['Rest', 'Light Workout', 'Intense Workout']
        probs = result.values

        print("\nRecommendation Probabilities:")
        for i, label in enumerate(labels):
            print(f"{label}: {probs[i]:.2f}")

        best = labels[np.argmax(probs)]
        print(f"\nFinal Recommendation: {best}")

        return best, probs