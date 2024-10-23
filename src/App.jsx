import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskTimer from "./components/TaskTimer";
import TasksByMonth from "./components/TasksByMonth";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div>
      <nav className="nav">
        <Link className="nav__link" to="/" style={{ marginRight: "10px" }}>
          Home
        </Link>
        <Link className="nav__link" to="/tasks">
          View Tasks by Month
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<TaskTimer onSaveTask={handleSaveTask} />} />
        <Route path="/tasks" element={<TasksByMonth tasks={tasks} />} />
      </Routes>
    </div>
  );
};

export default App;
