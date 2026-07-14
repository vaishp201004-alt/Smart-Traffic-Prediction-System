import pandas as pd
import random
from datetime import datetime, timedelta

# -------------------------
# Configuration
# -------------------------

roads = {
    "MG Road": "City Road",
    "College Road": "City Road",
    "Ring Road": "Highway",
    "Airport Road": "Highway",
    "Market Road": "Commercial",
    "Station Road": "Commercial",
    "Bus Stand Road": "Commercial",
    "City Center": "City Road"
}

weather_list = ["Sunny", "Cloudy", "Rainy", "Foggy"]

events = ["None", "Festival", "Concert", "Sports Match"]

days = [
    "Monday","Tuesday","Wednesday",
    "Thursday","Friday","Saturday","Sunday"
]

rows = []

start_date = datetime(2026,1,1)

# -------------------------
# Generate 10000 Records
# -------------------------

for i in range(10000):

    date = start_date + timedelta(days=random.randint(0,364))

    day = days[date.weekday()]

    hour = random.randint(0,23)

    minute = random.choice([0,15,30,45])

    time = f"{hour:02}:{minute:02}"

    road = random.choice(list(roads.keys()))

    road_type = roads[road]

    weather = random.choice(weather_list)

    holiday = random.choices(
        ["Yes","No"],
        weights=[15,85]
    )[0]

    event = random.choices(
        events,
        weights=[82,8,5,5]
    )[0]

    accident = random.choices(
        ["Yes","No"],
        weights=[8,92]
    )[0]

    # Rush Hour
    rush_hour = "Yes" if hour in [8,9,17,18,19] else "No"

    # Vehicle Count
    if rush_hour=="Yes":
        vehicle_count=random.randint(350,700)
    else:
        vehicle_count=random.randint(50,350)

    # Weather
    temperature=random.randint(20,40)

    humidity=random.randint(40,95)

    visibility=random.randint(300,1800)

    # Speed
    average_speed=max(
        10,
        90-vehicle_count//10+random.randint(-5,5)
    )

    # -------------------------
    # Congestion Score
    # -------------------------

    score=0

    score += vehicle_count/10

    if rush_hour=="Yes":
        score+=20

    if weather=="Rainy":
        score+=12

    elif weather=="Foggy":
        score+=10

    elif weather=="Cloudy":
        score+=5

    if accident=="Yes":
        score+=18

    if event!="None":
        score+=10

    if holiday=="Yes":
        score+=5

    if road_type=="Commercial":
        score+=10

    elif road_type=="City Road":
        score+=5

    score=min(100,round(score))

    # -------------------------
    # Traffic Level
    # -------------------------

    if score<=25:
        traffic="Low"

    elif score<=50:
        traffic="Medium"

    elif score<=75:
        traffic="High"

    else:
        traffic="Very High"

    # Future Prediction

    future_score=score+random.randint(-10,10)

    future_score=max(0,min(100,future_score))

    if future_score<=25:
        future="Low"

    elif future_score<=50:
        future="Medium"

    elif future_score<=75:
        future="High"

    else:
        future="Very High"

    rows.append([
        date.strftime("%Y-%m-%d"),
        day,
        time,
        road,
        road_type,
        rush_hour,
        vehicle_count,
        average_speed,
        weather,
        temperature,
        humidity,
        visibility,
        holiday,
        event,
        accident,
        score,
        traffic,
        future
    ])

columns=[
"Date",
"Day",
"Time",
"Road_Name",
"Road_Type",
"Rush_Hour",
"Vehicle_Count",
"Average_Speed",
"Weather",
"Temperature",
"Humidity",
"Visibility",
"Holiday",
"Event",
"Accident_Nearby",
"Congestion_Score",
"Traffic_Level",
"Future_Traffic"
]

df=pd.DataFrame(rows,columns=columns)

df.to_csv("dataset/traffic_data_realistic.csv",index=False)

print("="*60)
print("REALISTIC DATASET CREATED SUCCESSFULLY")
print("="*60)

print(df.head())

print("\nTotal Records:",len(df))