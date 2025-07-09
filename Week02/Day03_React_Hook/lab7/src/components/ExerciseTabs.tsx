interface ExerciseTabsProps {
  selected: number;
  onSelect: (index: number) => void;
}

export default function ExerciseTabs({ selected, onSelect }: ExerciseTabsProps) {
  return (
    <div className="flex justify-center gap-2 mb-4">
      {[1, 2, 3].map((n) => (
        <button
          key={n}
          onClick={() => onSelect(n)}
          className={`px-4 py-2 rounded-full font-semibold
            ${selected === n ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800"}`}
        >
          Exercise {n}
        </button>
      ))}
    </div>
  );
}
