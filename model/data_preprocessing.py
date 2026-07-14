import pandas as pd

# Load dataset
df = pd.read_csv("dataset/traffic_data.csv")

print("===== Missing Values Before Cleaning =====")
print(df.isnull().sum())

# Replace missing values in Event column
df["Event"] = df["Event"].fillna("None")

print("\n===== Missing Values After Cleaning =====")
print(df.isnull().sum())

# Save cleaned dataset
df.to_csv("dataset/cleaned_traffic_data.csv", index=False)

print("\nDataset cleaned successfully!")
print("Cleaned file saved as cleaned_traffic_data.csv")