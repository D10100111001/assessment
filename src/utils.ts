import { format, isPast, parseISO, formatDistanceToNow } from "date-fns";
import { Todo } from "./types";

export const formatDate = (dateString: string): string => {
  return format(parseISO(dateString), "MMM d, yyyy");
};

export const getRelativeTimeString = (dateString: string): string => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

export const isOverdue = (todo: Todo): boolean => {
  return (
    !todo.isComplete && todo.dueDate !== null && isPast(parseISO(todo.dueDate))
  );
};

export const sortTodos = (todos: Todo[]): Todo[] => {
  return todos.sort((a, b) => {
    // Sort by completion status
    if (a.isComplete !== b.isComplete) {
      return a.isComplete ? 1 : -1;
    }

    // Sort by overdue status for incomplete todos
    if (!a.isComplete && !b.isComplete) {
      const aOverdue = isOverdue(a);
      const bOverdue = isOverdue(b);
      if (aOverdue !== bOverdue) {
        return aOverdue ? -1 : 1;
      }
    }

    // Sort by due date
    if (a.dueDate && b.dueDate) {
      return parseISO(a.dueDate).getTime() - parseISO(b.dueDate).getTime();
    }

    // If one todo has a due date and the other doesn't, prioritize the one with a due date
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;

    // If neither has a due date, maintain original order
    return 0;
  });
};
