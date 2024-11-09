import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { format, isToday, isTomorrow, parseISO } from "date-fns";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskDate, setTaskDate] = useState("today"); // Default to "Today"
  const [expandedSections, setExpandedSections] = useState({
    today: true,
    tomorrow: false,
    history: false,
  });

  // Toggle expand/collapse for each section
  const toggleExpand = (section) => {
    setExpandedSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("toDoTasks")) || [];
    const parsedTasks = storedTasks.map((task) => ({
      ...task,
      date: parseISO(task.date),
    }));
    setTasks(parsedTasks);
  }, []);

  useEffect(() => {
    const tasksToStore = tasks.map((task) => ({
      ...task,
      date: format(task.date, "yyyy-MM-dd"),
    }));
    localStorage.setItem("toDoTasks", JSON.stringify(tasksToStore));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const taskDateObj =
        taskDate === "today"
          ? new Date()
          : new Date().setDate(new Date().getDate() + 1);
      const newTaskData = {
        id: Date.now(),
        text: newTask.trim(),
        date: new Date(taskDateObj),
      };
      setTasks((prevTasks) => [...prevTasks, newTaskData]);
      setNewTask("");
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Group tasks based on "Today," "Tomorrow," and "History"
  const todayTasks = tasks.filter((task) => isToday(task.date));
  const tomorrowTasks = tasks.filter((task) => isTomorrow(task.date));
  const historyTasks = tasks.filter(
    (task) =>
      !isToday(task.date) && !isTomorrow(task.date) && task.date < new Date()
  );

  // Helper function to render tasks
  const renderTasks = (tasks) => (
    <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          className="task-item"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "4px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <span style={{ fontSize: "16px", color: "#333" }}>{task.text}</span>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => deleteTask(task.id)}
            style={{
              cursor: "pointer",
              color: "#d32f2f",
            }}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="tasks-by-month container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2>To-Do List</h2>
        <select
          id="task-date"
          className="input"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
          style={{ padding: "4px", fontSize: "16px" }}
        >
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
        </select>
      </div>

      <div
        //className="task-timer__form"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <input
          type="text"
          className="input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          style={{ flex: 1, marginRight: "8px", marginBottom: "0px" }} // Flex-grow for input, margin for spacing
        />
        <button
          className="button"
          onClick={addTask}
          style={{ flexShrink: 0 }} // Prevent button from shrinking
        >
          Add Task
        </button>
      </div>

      {/* Expandable Sections */}

      {/* Today’s Tasks */}
      <div style={{ marginTop: "16px" }}>
        <h3 onClick={() => toggleExpand("today")} style={{ cursor: "pointer" }}>
          {expandedSections.today ? "−" : "+"} Today
        </h3>
        {expandedSections.today &&
          (todayTasks.length > 0 ? (
            renderTasks(todayTasks)
          ) : (
            <p>No tasks for today.</p>
          ))}
      </div>

      {/* Tomorrow’s Tasks */}
      <div style={{ marginTop: "16px" }}>
        <h3
          onClick={() => toggleExpand("tomorrow")}
          style={{ cursor: "pointer" }}
        >
          {expandedSections.tomorrow ? "−" : "+"} Tomorrow
        </h3>
        {expandedSections.tomorrow &&
          (tomorrowTasks.length > 0 ? (
            renderTasks(tomorrowTasks)
          ) : (
            <p>No tasks for tomorrow.</p>
          ))}
      </div>

      {/* History Tasks */}
      <div style={{ marginTop: "16px" }}>
        <h3
          onClick={() => toggleExpand("history")}
          style={{ cursor: "pointer" }}
        >
          {expandedSections.history ? "−" : "+"} History
        </h3>
        {expandedSections.history &&
          (historyTasks.length > 0 ? (
            renderTasks(historyTasks)
          ) : (
            <p>No tasks in history.</p>
          ))}
      </div>
    </div>
  );
};

export default ToDoList;
