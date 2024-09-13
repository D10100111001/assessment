import React, { useState } from "react";
import { Checkbox } from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { Todo } from "../types";
import { formatDate, isOverdue, getRelativeTimeString } from "../utils";
import { LoadingSpinner } from "./LoadingSpinner";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = React.memo(({ todo, onToggle }) => {
  const isTaskOverdue = isOverdue(todo);
  const [isProcessingToggle, setIsProcessingToggle] = useState(false);

  const getColorClass = (isBorder = false) => {
    const prefix = isBorder ? "border" : "text";
    if (todo.isComplete) return `${prefix}-green-500`;
    if (isTaskOverdue) return `${prefix}-red-500`;
    return `${prefix}-gray-700`;
  };

  return (
    <li
      className={`flex items-center space-x-2 p-2 rounded h-12 ${
        todo.isComplete
          ? "bg-green-200"
          : isTaskOverdue
          ? "bg-red-200"
          : "bg-gray-100"
      }`}
      aria-label={`Todo item: ${todo.description}`}
    >
      <Checkbox
        checked={todo.isComplete}
        onCheckedChange={async () => {
          if (isProcessingToggle) return;
          setIsProcessingToggle(true);
          await onToggle(todo.id);
          setIsProcessingToggle(false);
        }}
        disabled={isProcessingToggle}
        className={`w-5 h-5 border ${
          todo.isComplete
            ? "border-green-500"
            : isTaskOverdue
            ? "border-red-500"
            : "border-gray-700"
        } rounded-sm flex justify-center items-center`}
        aria-label={`Mark "${todo.description}" as ${
          todo.isComplete ? "incomplete" : "complete"
        }`}
      >
        {isProcessingToggle && (
          <LoadingSpinner className={`size-4 ${getColorClass()}`} />
        )}
        {!isProcessingToggle && todo.isComplete && (
          <CheckIcon className={`${getColorClass()} size-6`} />
        )}
      </Checkbox>
      <span
        className={`flex-grow ${
          todo.isComplete ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.description}
      </span>
      {todo.dueDate && (
        <div className="flex flex-col items-end">
          <span
            className={`text-xs ${getColorClass()}`}
            aria-label={`Due date: ${formatDate(todo.dueDate)}`}
          >
            {formatDate(todo.dueDate)}
          </span>
          <span
            className="text-xs font-light text-gray-500"
            aria-label={`Relative due date: ${getRelativeTimeString(
              todo.dueDate
            )}`}
          >
            {getRelativeTimeString(todo.dueDate)}
          </span>
        </div>
      )}
    </li>
  );
});

TodoItem.displayName = "TodoItem";

export default TodoItem;
