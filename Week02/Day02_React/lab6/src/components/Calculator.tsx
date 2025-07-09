import { useState } from "react";
import Display from "./Display";
import ButtonGrid from "./ButtonGrid";

export default function Calculator() {
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(false);

  const buttons = [
    ["AC", "+/-", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  const appendDigit = (digit: string) => {
    if (overwrite || currentValue === "0") {
      setCurrentValue(digit);
      setOverwrite(false);
    } else {
      setCurrentValue(currentValue + digit);
    }
  };

  const chooseOperator = (op: string) => {
    if (previousValue && operator) {
      const result = calculate();
      setPreviousValue(result);
      setCurrentValue(result);
    } else {
      setPreviousValue(currentValue);
    }
    setOperator(op);
    setOverwrite(true);
  };

  const calculate = () => {
    if (!previousValue || !operator) return currentValue;

    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);
    let result = 0;

    switch (operator) {
      case "+":
        result = prev + curr;
        break;
      case "−":
        result = prev - curr;
        break;
      case "×":
        result = prev * curr;
        break;
      case "÷":
        result = curr !== 0 ? prev / curr : NaN;
        break;
      case "%":
        result = prev % curr;
        break;
      default:
        return currentValue;
    }

    return result.toString();
  };

  const equals = () => {
    if (!operator || !previousValue) return;

    const result = calculate();
    setCurrentValue(result);
    setPreviousValue(`${previousValue} ${operator} ${currentValue} =`);
    setOperator(null);
    setOverwrite(true);
  };

  const clear = () => {
    setCurrentValue("0");
    setPreviousValue(null);
    setOperator(null);
    setOverwrite(false);
  };

  const toggleSign = () => {
    setCurrentValue((prev) =>
      prev.startsWith("-") ? prev.slice(1) : "-" + prev
    );
  };

  const percent = () => {
    setCurrentValue((prev) => (parseFloat(prev) / 100).toString());
  };

  const handleClick = (label: string) => {
    if (!isNaN(Number(label))) {
      appendDigit(label);
    } else if (label === ".") {
      if (!currentValue.includes(".")) {
        setCurrentValue(currentValue + ".");
      }
    } else if (["+", "−", "×", "÷"].includes(label)) {
      chooseOperator(label);
    } else if (label === "=") {
      equals();
    } else if (label === "AC") {
      clear();
    } else if (label === "+/-") {
      toggleSign();
    } else if (label === "%") {
      chooseOperator("%");
    }
  };

  const expression =
    operator && previousValue && !previousValue.includes("=")
      ? `${previousValue} ${operator}`
      : previousValue?.includes("=")
      ? previousValue
      : "";

  return (
    <div className="w-64 bg-gray-800 rounded-xl shadow-xl p-2">
      <Display value={currentValue} expression={expression} />
      <ButtonGrid onButtonClick={handleClick} />
    </div>
  );
}
