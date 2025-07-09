import { useEffect, useRef, useState } from "react";

export default function CountdownTimer() {
  const [inputMinutes, setInputMinutes] = useState(1);
  const [inputSeconds, setInputSeconds] = useState(0);

  const [timeLeft, setTimeLeft] = useState(60); // tổng số giây
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tick = () => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timerRef.current!);
        setIsRunning(false);
        setIsFinished(true);
        return 0;
      }
      return prev - 1;
    });
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(tick, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleStart = () => {
    const totalSeconds = inputMinutes * 60 + inputSeconds;
    if (totalSeconds <= 0) return;

    setTimeLeft(totalSeconds);
    setIsRunning(true);
    setIsFinished(false);
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(inputMinutes * 60 + inputSeconds);
    setIsRunning(false);
    setIsFinished(false);
  };

  const format = (num: number) => num.toString().padStart(2, "0");
  const displayMinutes = Math.floor(timeLeft / 60);
  const displaySeconds = timeLeft % 60;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center w-72">
      <h2 className="text-blue-600 font-semibold mb-2 text-sm flex justify-center items-center gap-1">
        <span className="text-lg">⏳</span> TIMER
      </h2>
      <hr className="mb-4 border-blue-500" />

      {!isRunning && (
        <div className="flex justify-center gap-2 mb-3">
          <input
            type="number"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-16 border border-gray-400 rounded px-2 py-1 text-center"
            min={0}
          />
          <span className="font-bold text-xl">:</span>
          <input
            type="number"
            value={inputSeconds}
            onChange={(e) =>
              setInputSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))
            }
            className="w-16 border border-gray-400 rounded px-2 py-1 text-center"
            min={0}
            max={59}
          />
        </div>
      )}

      <div className="text-4xl font-bold mb-2">
        <span>{format(displayMinutes)}</span>
        <span className="mx-1">:</span>
        <span>{format(displaySeconds)}</span>
      </div>

      {isFinished && (
        <div className="text-red-600 text-sm mt-2 font-semibold">⏰ Hết giờ!</div>
      )}

      <hr className="my-4" />

      <div className="flex justify-center gap-3">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="bg-blue-600 text-white px-4 py-1 rounded font-semibold disabled:opacity-50"
        >
          START
        </button>
        <button
          onClick={handleReset}
          className="border border-blue-600 text-blue-600 px-4 py-1 rounded font-semibold"
        >
          RESET
        </button>
      </div>
    </div>
  );
}
