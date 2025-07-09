import { useState } from "react";
import ExerciseTabs from "./components/ExerciseTabs";
import Calculator from "./components/Calculator";
import CountdownTimer from "./components/CountdownTimer";
import SimpleRandom from "./components/SimpleRandom";
import TemperatureConverter from "./components/TemperatureConverter";
import SimpleTodoList from "./components/SimpleTodoList";

export default function App() {
  const [selectedExercise, setSelectedExercise] = useState(1);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10">
      <ExerciseTabs
        selected={selectedExercise}
        onSelect={setSelectedExercise}
      />

      {selectedExercise === 1 && <Calculator />}
      {selectedExercise === 2 && <CountdownTimer />}
      {selectedExercise === 3 && <SimpleRandom />}
      {selectedExercise === 4 && <TemperatureConverter />}
      {selectedExercise === 5 && <SimpleTodoList />}
    </div>
  );
}
