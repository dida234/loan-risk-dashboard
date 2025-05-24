import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    Age: "",
    Income: "",
    LoanAmount: "",
    EmploymentType: "0",
    CreditScore: "",
    Defaults: "",
    Guarantors: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        ...form,
        Age: Number(form.Age),
        Income: Number(form.Income),
        LoanAmount: Number(form.LoanAmount),
        EmploymentType: Number(form.EmploymentType),
        CreditScore: Number(form.CreditScore),
        Defaults: Number(form.Defaults),
        Guarantors: Number(form.Guarantors),
      });
      setResult(response.data);
    } catch (error) {
      console.error(error);
      setResult({ error: "Server error" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Loan Risk Predictor</h1>
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          {Object.keys(form).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700">
                {key}
              </label>
              <input
                type="number"
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Predict
          </button>
        </form>
        {result && (
          <div className="mt-4 text-center">
            {result.error ? (
              <p className="text-red-500">{result.error}</p>
            ) : (
              <p className="text-lg font-semibold">
                🧠 Prediction:{" "}
                <span className={result.prediction === 1 ? "text-red-500" : "text-green-600"}>
                  {result.risk_level}
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
