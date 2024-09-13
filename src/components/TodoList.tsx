import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../types";

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = React.memo(({ todos, onToggleTodo }) => {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggleTodo} />
      ))}
    </ul>
  );
});

TodoList.displayName = 'TodoList';

export default TodoList;
