# Todo App

This is a feature-rich Todo application built with React, TypeScript, and Tailwind CSS.

## Features

- View, add, and manage todos
- Mark todos as complete or incomplete
- Sort todos by due date and completion status
- Highlight overdue todos
- Filter todos by all, active, or completed
- Clear completed todos
- Show relative time for due dates
- Responsive design
- Fallback to mock data if API requests fail

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd todo-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

- The main screen displays a list of todos.
- Click the checkbox next to a todo to mark it as complete or incomplete.
- Use the filter buttons (All, Active, Completed) to filter the todos.
- Click "Clear Completed" to remove all completed todos from the list.
- The "Refresh Todos" button fetches the latest todos from the API (or mock data if the API is unavailable).
- Overdue todos are highlighted in red.
- Each todo shows its due date and the relative time (e.g., "2 days ago", "in 3 days").

## API

The application uses a mock API with the following endpoints:

- GET https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/get
- PATCH https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/patch/:todo_id

Make sure to include the API Key in the `X-Api-Key` header for all requests:

```
X-Api-Key: <key>
```

If the API is unavailable, the app will use local mock data to ensure functionality.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Axios for API requests
- date-fns for date formatting and calculations
- Radix UI for accessible components

## Project Structure

- `src/components`: React components (TodoList, TodoItem)
- `src/api.ts`: API service and mock data
- `src/utils.ts`: Utility functions for date formatting, sorting, etc.
- `src/types.ts`: TypeScript type definitions
- `src/App.tsx`: Main application component

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
