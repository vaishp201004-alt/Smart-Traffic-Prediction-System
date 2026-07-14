import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load dataset
df = pd.read_csv("dataset/traffic_data.csv")

# Create folder for graphs
import os
os.makedirs("screenshots", exist_ok=True)

# -------------------------------
# 1. Traffic Level Distribution
# -------------------------------
plt.figure(figsize=(8,5))
sns.countplot(x="Traffic_Level", data=df)
plt.title("Traffic Level Distribution")
plt.savefig("screenshots/traffic_level_distribution.png")
plt.show()

# -------------------------------
# 2. Weather Distribution
# -------------------------------
plt.figure(figsize=(8,5))
sns.countplot(x="Weather", data=df)
plt.title("Weather Distribution")
plt.savefig("screenshots/weather_distribution.png")
plt.show()

# -------------------------------
# 3. Vehicle Count Histogram
# -------------------------------
plt.figure(figsize=(8,5))
plt.hist(df["Vehicle_Count"], bins=20)
plt.title("Vehicle Count Distribution")
plt.xlabel("Vehicle Count")
plt.ylabel("Frequency")
plt.savefig("screenshots/vehicle_count_histogram.png")
plt.show()

# -------------------------------
# 4. Average Speed Histogram
# -------------------------------
plt.figure(figsize=(8,5))
plt.hist(df["Average_Speed"], bins=20)
plt.title("Average Speed Distribution")
plt.xlabel("Average Speed")
plt.ylabel("Frequency")
plt.savefig("screenshots/average_speed_histogram.png")
plt.show()

# -------------------------------
# 5. Correlation Heatmap
# -------------------------------
numeric_df = df.select_dtypes(include=["number"])

plt.figure(figsize=(8,6))
sns.heatmap(numeric_df.corr(), annot=True, cmap="coolwarm")
plt.title("Correlation Heatmap")
plt.savefig("screenshots/correlation_heatmap.png")
plt.show()

print("\nGraphs saved successfully inside screenshots folder.")