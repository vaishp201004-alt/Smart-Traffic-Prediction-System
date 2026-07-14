import pandas as pd
import joblib
import time

from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report
)

# ---------------------------------------
# Load Dataset
# ---------------------------------------

df = pd.read_csv("dataset/processed_traffic_data.csv")

# Features
X = df.drop(columns=["Traffic_Level", "Future_Traffic"])

# Target
y = df["Traffic_Level"]

# Train Test Split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# ---------------------------------------
# Models
# ---------------------------------------

models = {

    "Decision Tree":
    DecisionTreeClassifier(random_state=42),

    "Random Forest":
    RandomForestClassifier(
        n_estimators=100,
        random_state=42
    ),

    "Gradient Boosting":
    GradientBoostingClassifier(random_state=42)

}

results = []

best_accuracy = 0

best_model = None

best_name = ""

# ---------------------------------------
# Training
# ---------------------------------------

for name, model in models.items():

    print("="*60)
    print(name)
    print("="*60)

    start = time.time()

    model.fit(X_train, y_train)

    end = time.time()

    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)

    precision = precision_score(
        y_test,
        y_pred,
        average="weighted"
    )

    recall = recall_score(
        y_test,
        y_pred,
        average="weighted"
    )

    f1 = f1_score(
        y_test,
        y_pred,
        average="weighted"
    )

    print(classification_report(y_test, y_pred))

    print(f"Accuracy : {accuracy:.4f}")

    print(f"Training Time : {end-start:.3f} sec")

    results.append([
        name,
        accuracy,
        precision,
        recall,
        f1,
        end-start
    ])

    if accuracy > best_accuracy:
        best_accuracy = accuracy
        best_model = model
        best_name = name

# ---------------------------------------
# Results Table
# ---------------------------------------

results_df = pd.DataFrame(

    results,

    columns=[
        "Model",
        "Accuracy",
        "Precision",
        "Recall",
        "F1 Score",
        "Training Time"
    ]

)

print("\n")
print("="*60)
print("MODEL COMPARISON")
print("="*60)

print(results_df)

# Save Results

results_df.to_csv(
    "model/model_comparison.csv",
    index=False
)

# Save Best Model

joblib.dump(
    best_model,
    "model/best_model.pkl"
)

print("\nBest Model :", best_name)

print("Accuracy :", round(best_accuracy*100,2),"%")

print("\nBest model saved successfully!")