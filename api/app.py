from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
from datetime import datetime

app = Flask(__name__)
CORS(app)

# ==========================================
# Load Trained Model and Encoders
# ==========================================

model = joblib.load("model/best_model.pkl")
encoders = joblib.load("model/feature_encoders.pkl")


# ==========================================
# Home Route
# ==========================================

@app.route("/")
def home():
    return jsonify({
        "Project": "Smart Traffic Intelligence System",
        "Status": "API Running Successfully"
    })


# ==========================================
# Prediction Route
# ==========================================

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    day = encoders["Day"].transform([data["Day"]])[0]
    road = encoders["Road_Name"].transform([data["Road_Name"]])[0]
    road_type = encoders["Road_Type"].transform([data["Road_Type"]])[0]
    rush = encoders["Rush_Hour"].transform([data["Rush_Hour"]])[0]
    weather = encoders["Weather"].transform([data["Weather"]])[0]
    holiday = encoders["Holiday"].transform([data["Holiday"]])[0]
    event = encoders["Event"].transform([data["Event"]])[0]
    accident = encoders["Accident_Nearby"].transform([data["Accident_Nearby"]])[0]

    input_data = pd.DataFrame([{
        "Day": day,
        "Road_Name": road,
        "Road_Type": road_type,
        "Rush_Hour": rush,
        "Vehicle_Count": data["Vehicle_Count"],
        "Average_Speed": data["Average_Speed"],
        "Weather": weather,
        "Temperature": data["Temperature"],
        "Humidity": data["Humidity"],
        "Visibility": data["Visibility"],
        "Holiday": holiday,
        "Event": event,
        "Accident_Nearby": accident
    }])

    prediction = model.predict(input_data)[0]

    traffic = encoders["Traffic_Level"].inverse_transform([prediction])[0]

    if hasattr(model, "predict_proba"):
        confidence = max(model.predict_proba(input_data)[0]) * 100
    else:
        confidence = 95.0

    if traffic == "Low":
        travel_time = "10 Minutes"
        suggested_route = "Normal Route"
        color = "Green"

    elif traffic == "Medium":
        travel_time = "18 Minutes"
        suggested_route = "Normal Route"
        color = "Yellow"

    elif traffic == "High":
        travel_time = "25 Minutes"
        suggested_route = "Ring Road"
        color = "Orange"

    else:
        travel_time = "35 Minutes"
        suggested_route = "Outer Bypass"
        color = "Red"

    return jsonify({
        "Traffic Prediction": traffic,
        "Confidence": f"{confidence:.2f}%",
        "Estimated Travel Time": travel_time,
        "Suggested Route": suggested_route,
        "Traffic Color": color,
        "Prediction Time": datetime.now().strftime("%d-%m-%Y %I:%M:%S %p")
    })


if __name__ == "__main__":
    app.run(debug=True)