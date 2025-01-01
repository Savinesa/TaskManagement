import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskTimer from "./components/TaskTimer";
import TasksByMonth from "./components/TasksByMonth";
import ToDoList from "./components/ToDoList"; // Import the new ToDoList component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faCircle } from "@fortawesome/free-solid-svg-icons";
import Setup from "./components/Setup";

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "default"
  );

  const toggleTheme = () => {
    const newTheme =
      theme === "default" ? "dark" : theme === "dark" ? "light" : "default";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

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
        <Link className="nav__link" to="/todo">
          {" "}
          To-Do List
        </Link>
        <Link className="nav__link" to="/setup">
          {" "}
          Setup
        </Link>
      </nav>

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
        <Route path="/todo" element={<ToDoList />} />
        <Route path="/setup" element={<Setup />} />{" "}
      </Routes>
    </div>
  );
};

export default App;
