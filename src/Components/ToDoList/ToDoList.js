import React, { useState } from "react";
import "./ToDoList.css";
import toast, { Toaster } from "react-hot-toast";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const inputChangeHandler = (event) => {
    setNewTask(event.target.value);
  };

  const checkDuplicate = (task) => {
    return tasks.some((item) => item === task);
  };

  const addTaskHandler = () => {
    if (checkDuplicate(newTask.trim())) {
      toast.error("Task already exists!");
    } else {
      if (newTask.trim() !== "") {
        setTasks([...tasks, newTask]);
        toast.success("Task added successfully!");
      } else {
        toast.error("Please enter something!");
      }
    }

    setNewTask("");
  };

  const deleteTaskHandler = (index) => {
    const updatedTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(updatedTasks);
    toast.success("Task deleted successfully!");
  };

  const moveTaskUpHandler = (index) => {
    if (index !== 0) {
      const task = tasks[index];
      const updatedTasks = tasks.filter((_, idx) => idx !== index);
      updatedTasks.splice(index - 1, 0, task);
      setTasks(updatedTasks);
    }
  };

  const moveTaskDownHandler = (index) => {
    if (index !== tasks.length - 1) {
      const task = tasks[index];
      const updatedTasks = tasks.filter((_, idx) => idx !== index);
      updatedTasks.splice(index + 1, 0, task);
      setTasks(updatedTasks);
    }
  };

  let taskContainer = null;
  if (tasks.length > 0) {
    taskContainer = (
      <ul>
        {tasks.map((task, index) => {
          return (
            <li key={index} className="taskRow">
              <span>{task}</span>
              <button
                className="delete-button btn"
                onClick={() => deleteTaskHandler(index)}
              >
                Delete
              </button>
              <button
                className="up-button btn"
                onClick={() => moveTaskUpHandler(index)}
              >
                Up
              </button>
              <button
                className="down-button btn"
                onClick={() => moveTaskDownHandler(index)}
              >
                Down
              </button>
            </li>
          );
        })}
      </ul>
    );
  } else {
    taskContainer = "Add tasks to your list!";
  }
  return (
    <div className="to-do-list">
      <Toaster />
      <h1>To-Do-List</h1>
      <input
        className="input-field"
        value={newTask}
        onChange={(event) => inputChangeHandler(event)}
        type="text"
        placeholder="Add Task"
      />
      <button className="add-button" onClick={addTaskHandler}>
        Add
      </button>
      <div className="task-container">{taskContainer}</div>
    </div>
  );
};

export default ToDoList;
