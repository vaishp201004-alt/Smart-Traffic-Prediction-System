import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Load dataset
df = pd.read_csv("dataset/traffic_data_realistic.csv")

# Create output folder
os.makedirs("screenshots/eda", exist_ok=True)

# --------------------------
# Basic Information
# --------------------------

print("="*60)
print("DATASET INFORMATION")
print("="*60)

print(df.head())

print("\nShape:", df.shape)

print("\nMissing Values")
print(df.isnull().sum())

# --------------------------
# Traffic Level Distribution
# --------------------------

plt.figure(figsize=(8,5))

sns.countplot(data=df,x="Traffic_Level")

plt.title("Traffic Level Distribution")

plt.savefig("screenshots/eda/traffic_level.png")

plt.show()

# --------------------------
# Weather vs Traffic
# --------------------------

plt.figure(figsize=(10,5))

sns.countplot(
    data=df,
    x="Weather",
    hue="Traffic_Level"
)

plt.title("Weather vs Traffic")

plt.savefig("screenshots/eda/weather_vs_traffic.png")

plt.show()

# --------------------------
# Rush Hour
# --------------------------

plt.figure(figsize=(6,5))

sns.countplot(
    data=df,
    x="Rush_Hour",
    hue="Traffic_Level"
)

plt.title("Rush Hour Analysis")

plt.savefig("screenshots/eda/rush_hour.png")

plt.show()

# --------------------------
# Road Type
# --------------------------

plt.figure(figsize=(8,5))

sns.countplot(
    data=df,
    x="Road_Type",
    hue="Traffic_Level"
)

plt.title("Road Type Analysis")

plt.savefig("screenshots/eda/road_type.png")

plt.show()

# --------------------------
# Congestion Score Histogram
# --------------------------

plt.figure(figsize=(8,5))

plt.hist(df["Congestion_Score"],bins=20)

plt.title("Congestion Score Distribution")

plt.savefig("screenshots/eda/congestion_score.png")

plt.show()

print("\nEDA Completed Successfully")