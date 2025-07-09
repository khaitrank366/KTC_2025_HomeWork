interface ButtonProps {
  label: string;
  type?: "default" | "operator" | "function";
  onClick?: () => void;
}

export default function Button({ label, type = "default", onClick }: ButtonProps) {
  const base = "text-xl p-4 flex-1 rounded m-1";
  const styles = {
    default: "bg-gray-700 text-white",
    operator: "bg-orange-500 text-white",
    function: "bg-gray-500 text-white",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[type]}`}>
      {label}
    </button>
  );
}
