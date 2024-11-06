import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskDate, setTaskDate] = useState("today"); // Default to "Today"

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("toDoTasks")) || [];
    const sortedTasks = storedTasks.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setTasks(sortedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("toDoTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskData = {
        id: Date.now(),
        text: newTask.trim(),
        date:
          taskDate === "today"
            ? new Date().toLocaleDateString()
            : getTomorrowDate(),
      };
      const updatedTasks = [...tasks, newTaskData].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setTasks(updatedTasks);
      setNewTask("");
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString();
  };

  return (
    <div className="tasks-by-month container">
      <h2>To-Do List</h2>
      <div className="task-timer__form">
        <input
          type="text"
          className="input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
      </div>
      <div className="task-timer__form">
        <label htmlFor="task-date">Choose Date: </label>
        <select
          id="task-date"
          className="input"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
        </select>
      </div>
      <button className="button" onClick={addTask}>
        Add Task
      </button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text} - <span>{task.date}</span>
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => deleteTask(task.id)}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
