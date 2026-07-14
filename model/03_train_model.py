import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Load dataset
df = pd.read_csv("dataset/traffic_data.csv")

# Encode categorical columns
encoders = {}

categorical_columns = [
    "Road_Name",
    "Weather",
    "Holiday",
    "Event",
    "Accident_Nearby",
    "Traffic_Level"
]

for col in categorical_columns:
    encoder = LabelEncoder()
    df[col] = encoder.fit_transform(df[col])
    encoders[col] = encoder

# Features
X = df.drop(columns=["Traffic_Level", "Date", "Time"])

# Target
y = df["Traffic_Level"]

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train Random Forest Model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

# Prediction
y_pred = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)

print("=" * 50)
print("MODEL ACCURACY")
print("=" * 50)
print(f"Accuracy : {accuracy * 100:.2f}%")

print("\nClassification Report")
print(classification_report(y_test, y_pred))

# Save Model
joblib.dump(model, "model/traffic_model.pkl")
joblib.dump(encoders, "model/label_encoders.pkl")

print("\nModel Saved Successfully!")