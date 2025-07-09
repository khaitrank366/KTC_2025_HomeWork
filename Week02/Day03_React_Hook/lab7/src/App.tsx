import { useState } from "react";
import "./App.css";
import ExerciseTabs from "./components/ExerciseTabs";
import CarSelector from "./components/CarSelector";
import CountDownTimer from "./components/CountDownTimer";
import Clock from "./components/Clock";

function App() {
  const [selectedExercise, setSelectedExercise] = useState(1);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10">
      <ExerciseTabs
        selected={selectedExercise}
        onSelect={setSelectedExercise}
      />

      {selectedExercise === 1 && <CarSelector />}
      {selectedExercise === 2 && <CountDownTimer />}
      {selectedExercise === 3 && <Clock />}
    </div>
  );
}

export default App;
