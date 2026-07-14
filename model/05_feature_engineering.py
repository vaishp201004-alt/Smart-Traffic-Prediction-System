import pandas as pd
import joblib

from sklearn.preprocessing import LabelEncoder

# -----------------------
# Load Dataset
# -----------------------

df = pd.read_csv("dataset/traffic_data_realistic.csv")

print("=" * 60)
print("ORIGINAL DATASET")
print("=" * 60)

print(df.head())

# -----------------------
# Drop Unnecessary Columns
# -----------------------

df = df.drop(columns=[
    "Date",
    "Time",
    "Congestion_Score"
])
# -----------------------
# Encode Categorical Data
# -----------------------

encoders = {}

categorical_columns = [
    "Day",
    "Road_Name",
    "Road_Type",
    "Rush_Hour",
    "Weather",
    "Holiday",
    "Event",
    "Accident_Nearby",
    "Traffic_Level",
    "Future_Traffic"
]

for column in categorical_columns:
    encoder = LabelEncoder()
    df[column] = encoder.fit_transform(df[column])
    encoders[column] = encoder

# -----------------------
# Save Encoders
# -----------------------

joblib.dump(encoders, "model/feature_encoders.pkl")

print("\nFeature Encoding Completed Successfully!")

print("\nEncoded Dataset")

print(df.head())

print("\nShape :", df.shape)

# Save processed dataset

df.to_csv(
    "dataset/processed_traffic_data.csv",
    index=False
)

print("\nProcessed dataset saved successfully.")