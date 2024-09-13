import React, { useState, useEffect, useMemo } from "react";
import TodoList from "./components/TodoList";
import { Todo } from "./types";
import { getTodos, updateTodo } from "./api";
import { isOverdue, sortTodos } from "./utils";
import { LoadingSpinner } from "./components/LoadingSpinner";

type FilterType = "all" | "active" | "completed" | "overdue";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTodos = await getTodos();
      setTodos(sortTodos(fetchedTodos));
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError("Failed to fetch todos. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTodo = async (id: string) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      const updatedTodo = {
        ...todoToUpdate,
        isComplete: !todoToUpdate.isComplete,
      };
      try {
        await updateTodo(updatedTodo);
        setTodos((prevTodos) =>
          sortTodos(
            prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
          )
        );
      } catch (error) {
        console.error("Error updating todo:", error);
        setError("Failed to update todo. Please try again.");
      }
    }
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.isComplete);
      case "completed":
        return todos.filter((todo) => todo.isComplete);
      case "overdue":
        return todos.filter(isOverdue);
      default:
        return todos;
    }
  }, [todos, filter]);

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.isComplete).length,
    [todos]
  );

  return (
    <div>
      <div className="bg-blue-800 text-white p-2 flex items-center">
        <h1 className="text-2xl font-bold">Todo App</h1>
      </div>
      <div className="container mx-auto p-4 max-w-lg">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={fetchTodos}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Refresh Todos
          </button>
          <span>
            {completedCount} / {todos.length} completed
          </span>
        </div>
        <div className="flex justify-start gap-2 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-2 py-1 rounded ${
              filter === "all" ? "bg-gray-300" : "bg-gray-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("overdue")}
            className={`px-2 py-1 rounded border-red-200 ${
              filter === "overdue" ? "bg-gray-300" : "bg-gray-100"
            }`}
          >
            Overdue
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-2 py-1 rounded ${
              filter === "active" ? "bg-gray-300" : "bg-gray-100"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-2 py-1 rounded ${
              filter === "completed" ? "bg-gray-300" : "bg-gray-100"
            }`}
          >
            Completed
          </button>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <TodoList todos={filteredTodos} onToggleTodo={handleToggleTodo} />
        )}
      </div>
    </div>
  );
};

export default App;
