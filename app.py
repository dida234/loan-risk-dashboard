from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to connect

@app.route('/')
def home():
    return "Loan Risk Predictor API is running"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    # Dummy logic for prediction - replace with your real ML logic later
    income = data.get('Income', 0)
    credit_score = data.get('CreditScore', 0)
    
    if income > 50000 and credit_score > 700:
        risk = "Low"
    else:
        risk = "High"
    
    return jsonify({'risk': risk})

if __name__ == '__main__':
    app.run(debug=True)
