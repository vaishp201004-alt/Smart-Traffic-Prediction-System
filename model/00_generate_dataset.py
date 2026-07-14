import pandas as pd
import random
from datetime import datetime, timedelta

roads = [
    "MG Road",
    "College Road",
    "Market Road",
    "Ring Road",
    "Airport Road",
    "Station Road",
    "Bus Stand Road",
    "City Center"
]

weather_list = ["Sunny", "Cloudy", "Rainy", "Foggy"]

events = ["None", "Festival", "Concert", "Sports Match"]

rows = []

start_date = datetime(2026, 1, 1)

for i in range(5000):

    date = start_date + timedelta(days=random.randint(0, 364))

    hour = random.randint(0, 23)

    minute = random.choice([0, 15, 30, 45])

    time = f"{hour:02}:{minute:02}"

    road = random.choice(roads)

    weather = random.choice(weather_list)

    event = random.choices(
        events,
        weights=[80, 10, 5, 5]
    )[0]

    holiday = random.choice(["Yes", "No"])

    accident = random.choices(
        ["Yes", "No"],
        weights=[10, 90]
    )[0]

    temperature = random.randint(20, 40)

    humidity = random.randint(40, 95)

    visibility = random.randint(300, 1800)

    if hour in [8, 9, 17, 18, 19]:
        vehicle_count = random.randint(350, 650)
    else:
        vehicle_count = random.randint(50, 350)

    average_speed = max(
        10,
        80 - vehicle_count // 10 + random.randint(-5, 5)
    )

    if vehicle_count > 500:
        traffic = "Very High"
    elif vehicle_count > 350:
        traffic = "High"
    elif vehicle_count > 180:
        traffic = "Medium"
    else:
        traffic = "Low"

    rows.append([
        date.strftime("%Y-%m-%d"),
        time,
        road,
        vehicle_count,
        average_speed,
        weather,
        temperature,
        humidity,
        visibility,
        holiday,
        event,
        accident,
        traffic
    ])

columns = [
    "Date",
    "Time",
    "Road_Name",
    "Vehicle_Count",
    "Average_Speed",
    "Weather",
    "Temperature",
    "Humidity",
    "Visibility",
    "Holiday",
    "Event",
    "Accident_Nearby",
    "Traffic_Level"
]

df = pd.DataFrame(rows, columns=columns)

df.to_csv("dataset/traffic_data.csv", index=False)

print("=" * 50)
print("Dataset Generated Successfully!")
print("=" * 50)
print(df.head())
print("\nTotal Records:", len(df))