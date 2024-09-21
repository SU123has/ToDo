import React, { useRef, useState } from "react";
import "./ToDoList.css";
import toast, { Toaster } from "react-hot-toast";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const ToDoList = () => {
  const [parent] = useAutoAnimate(); //add animations to task container
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

  const keyPressHandler = (event) => {
    if (event.key === "Enter") {
      addTaskHandler();
    }
  };

  let taskContainer = null;
  if (tasks.length > 0) {
    taskContainer = (
      <ul ref={parent}>
        {tasks.map((task, index) => {
          return (
            // instead of keeping index as key, keep task as key so that it will be unique for everyone, keeping index as key changes the key for li when they are moved up and down
            <li key={task} className="taskRow">
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
        onKeyDown={keyPressHandler}
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
