import { useState } from "react";
const TASKS_KEY = "tasks";

export default function useLocalStorage() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem(TASKS_KEY);
    if (storedTasks) {
      const initialTodos = JSON.parse(storedTasks);
      return initialTodos;
    } else {
      const intialTasks = [];
      localStorage.setItem(TASKS_KEY, JSON.stringify(intialTasks));
    }
  });

  const updateTodos = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
  };
  return [tasks, updateTodos];
}
