import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskTimer from "./components/TaskTimer";
import TasksByMonth from "./components/TasksByMonth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faCircle } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [theme, setTheme] = useState("light"); // Default theme is colorful

  const toggleTheme = () => {
    const newTheme =
      theme === "default" ? "dark" : theme === "dark" ? "light" : "default";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

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

      {/* Theme Toggle Icon */}
      <div className="theme-toggle-icon" onClick={toggleTheme}>
        {theme === "light" && (
          <FontAwesomeIcon icon={faCircle} color="#E36397" />
        )}
        {theme === "default" && <FontAwesomeIcon icon={faMoon} color="#555" />}
        {theme === "dark" && <FontAwesomeIcon icon={faSun} color="#FFD700" />}
      </div>

      <Routes>
        <Route path="/" element={<TaskTimer onSaveTask={handleSaveTask} />} />
        <Route path="/tasks" element={<TasksByMonth tasks={tasks} />} />
      </Routes>
    </div>
  );
};

export default App;
