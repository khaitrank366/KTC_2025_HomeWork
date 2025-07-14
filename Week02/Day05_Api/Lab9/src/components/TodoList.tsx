import React, { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { ITodo } from "../types/Todo.type";
import axios, { type AxiosResponse } from "axios";
const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response: AxiosResponse<ITodo[]>) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        alert("Failed to fetch todos");
      });
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!newTodo.trim()) {
      alert("Please enter a todo task");
      return;
    }

    const todo: Omit<ITodo, "id"> = {
      title: newTodo,
      completed: false,
      userId: 1,
    };

    axios
      .post("https://jsonplaceholder.typicode.com/todos", todo)
      .then((response: AxiosResponse<ITodo>) => {
        setTodos([response.data, ...todos]);
        setNewTodo("");
        alert("Todo added successfully!");
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
        alert("Failed to add todo");
      });
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Todo List</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-4"
      >
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Enter a new todo"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="p-3 border rounded bg-gray-100"
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
