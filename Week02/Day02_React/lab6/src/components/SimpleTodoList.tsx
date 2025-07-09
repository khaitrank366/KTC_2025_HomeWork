import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function SimpleTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md w-[400px]">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">Todo list</h2>

      <ul className="space-y-2 mb-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-white px-3 py-2 rounded text-black"
          >
            <span
              onClick={() => toggleComplete(todo.id)}
              className={`cursor-pointer flex-1 ${
                todo.completed
                  ? "text-cyan-500 line-through"
                  : "text-red-600 font-semibold"
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-gray-500 hover:text-red-500 font-bold ml-3"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <div className="flex">
        <input
          type="text"
          placeholder="add a new todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 rounded-l text-black bg-white focus:outline-none"
        />

        <button
          onClick={handleAdd}
          className="bg-gray-200 text-black px-4 py-2 rounded-r font-semibold hover:bg-white"
        >
          Add
        </button>
      </div>
    </div>
  );
}
