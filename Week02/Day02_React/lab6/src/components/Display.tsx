interface DisplayProps {
  value: string;
  expression?: string;
}

export default function Display({ value, expression }: DisplayProps) {
  return (
    <div className="bg-gray-900 text-white p-4 rounded flex flex-col items-end">
      <div className="text-sm text-gray-400 h-5">{expression}</div>
      <div className="text-4xl">{value}</div>
    </div>
  );
}
