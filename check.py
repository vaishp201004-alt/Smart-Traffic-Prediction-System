import joblib

encoders = joblib.load("model/feature_encoders.pkl")

print("Event values:")
print(encoders["Event"].classes_)