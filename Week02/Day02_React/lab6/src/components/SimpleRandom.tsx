import { useState } from "react";

export default function SimpleRandom() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(10);
  const [result, setResult] = useState<number | null>(null);

  const handleGenerate = () => {
    if (min > max) {
      alert("Min không được lớn hơn Max");
      return;
    }

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setResult(randomNumber);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center w-80">
      <div className="text-4xl font-bold mb-4">{result !== null ? result : "-"}</div>

      <div className="flex justify-between items-center gap-4 mb-4">
        <div className="text-left flex-1">
          <label className="block text-sm font-medium text-gray-500 mb-1">Min</label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(parseInt(e.target.value) || 0)}
            className="w-full border-b border-gray-400 px-2 py-1 text-right"
          />
        </div>

        <div className="text-left flex-1">
          <label className="block text-sm font-medium text-gray-500 mb-1">Max</label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(parseInt(e.target.value) || 0)}
            className="w-full border-b border-gray-400 px-2 py-1 text-right"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white w-full py-2 rounded font-semibold"
      >
        GENERATE
      </button>
    </div>
  );
}
