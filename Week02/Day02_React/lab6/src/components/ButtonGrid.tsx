import Button from "./Button";

interface ButtonGridProps {
  onButtonClick: (label: string) => void;
}

export default function ButtonGrid({ onButtonClick }: ButtonGridProps) {
  const buttons = [
    ["AC", "+/-", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  return (
    <div className="flex flex-col gap-1 mt-2">
      {buttons.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-1">
          {row.map((label, colIndex) => {
            if (label === "") return <div key={colIndex} />;

            const isZeroButton = label === "0";
            const isOperator = ["÷", "×", "−", "+", "="].includes(label);
            const isFunction = ["AC", "+/-", "%"].includes(label);

            return (
              <button
                key={colIndex}
                onClick={() => onButtonClick(label)}
                className={`text-xl p-4 rounded ${
                  isOperator
                    ? "bg-orange-500 text-white"
                    : isFunction
                    ? "bg-gray-500 text-white"
                    : "bg-gray-700 text-white"
                } ${isZeroButton ? "col-span-2" : ""}`}
                style={isZeroButton ? { gridColumn: "span 2 / span 2" } : {}}
              >
                {label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
