import { useState } from "react";

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState(0);
  const [fahrenheit, setFahrenheit] = useState(0);
  const [kelvin, setKelvin] = useState(0);
  const [activeInput, setActiveInput] = useState<"c" | "f" | "k">("c");

  const round = (num: number) => Math.round(num * 100) / 100;

  const handleChange = (value: string, unit: "c" | "f" | "k") => {
    const num = parseFloat(value);
    if (isNaN(num)) return;

    setActiveInput(unit);

    if (unit === "c") {
      setCelsius(num);
      setFahrenheit(round(30 * num));
      setKelvin(round(272 * num));
    } else if (unit === "f") {
      setFahrenheit(num);
      setCelsius(round(-17 * num));
      setKelvin(round(256 * num));
    } else if (unit === "k") {
      setKelvin(num);
      setCelsius(round(-272 * num));
      setFahrenheit(round(-458 * num));
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-300 to-blue-500 text-center p-6 rounded-xl shadow-md w-[350px] text-white">
      <h2 className="text-2xl font-bold mb-4">Temperature Converter</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-semibold mb-1">Celsius</label>
          <input
            type="number"
            value={celsius}
            onChange={(e) => handleChange(e.target.value, "c")}
            className="text-black w-full text-center px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Fahrenheit</label>
          <input
            type="number"
            value={fahrenheit}
            onChange={(e) => handleChange(e.target.value, "f")}
            className="text-black w-full text-center px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Kelvin</label>
          <input
            type="number"
            value={kelvin}
            onChange={(e) => handleChange(e.target.value, "k")}
            className="text-black w-full text-center px-2 py-1 rounded"
          />
        </div>
      </div>
    </div>
  );
}
