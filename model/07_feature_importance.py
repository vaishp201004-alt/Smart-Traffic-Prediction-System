import pandas as pd
import joblib
import matplotlib.pyplot as plt

# Load processed dataset
df = pd.read_csv("dataset/processed_traffic_data.csv")

# Features and Target
X = df.drop(columns=["Traffic_Level", "Future_Traffic"])
y = df["Traffic_Level"]

# Load best model
model = joblib.load("model/best_model.pkl")

# Feature Importance
importance = model.feature_importances_

importance_df = pd.DataFrame({
    "Feature": X.columns,
    "Importance": importance
})

importance_df = importance_df.sort_values(
    by="Importance",
    ascending=False
)

print("=" * 60)
print("FEATURE IMPORTANCE")
print("=" * 60)
print(importance_df)

# Plot
plt.figure(figsize=(10,6))
plt.barh(
    importance_df["Feature"],
    importance_df["Importance"]
)

plt.xlabel("Importance")
plt.title("Feature Importance")
plt.gca().invert_yaxis()

plt.tight_layout()

plt.savefig("screenshots/feature_importance.png")

plt.show()