import axios from "axios";
import { Todo } from "./types";

const API_URL = "https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "X-Api-Key": process.env.REACT_APP_API_KEY,
  },
});

const now = new Date();

function addDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

// Mock data because the API has a rate limit
/*
{
    "error": {
        "name": "usageLimitError",
        "header": "Usage limit reached",
        "message": "Your team plan allows 1000 mock server calls per month. Contact your team Admin to up your limit."
    }
}
*/
let mockTodos: Todo[] = [
  {
    id: "1",
    description: "File 2024 Taxes",
    isComplete: false,
    dueDate: addDays(now, 200).toISOString(),
  },
  {
    id: "10",
    description: "File 2023 Taxes",
    isComplete: true,
    dueDate: addDays(now, -265).toISOString(),
  },
  {
    id: "2",
    description: "Fold laundry",
    isComplete: true,
    dueDate: null,
  },
  {
    id: "3",
    description: "Call Mom",
    isComplete: false,
    dueDate: addDays(now, -90).toISOString(),
  },
  {
    id: "4",
    description: "Walk the dog",
    isComplete: false,
    dueDate: null,
  },
  {
    id: "5",
    description: "Feed the cat",
    isComplete: false,
    dueDate: addDays(now, -30).toISOString(),
  },
  {
    id: "6",
    description: "Run LA marathon",
    isComplete: false,
    dueDate: addDays(now, 30).toISOString(),
  },
];

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await api.get("/get");
    return response.data;
  } catch (error) {
    console.error("Error fetching todos from API, using mock data:", error);
    return mockTodos;
  }
};

export const updateTodo = async (todo: Todo): Promise<void> => {
  try {
    await api.patch(`/patch/${todo.id}`, { isComplete: todo.isComplete });
  } catch (error) {
    console.error("Error updating todo on API, updating mock data:", error);

    mockTodos = mockTodos.map((t) =>
      t.id === todo.id ? { ...t, isComplete: todo.isComplete } : t
    );
  }
};
