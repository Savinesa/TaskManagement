import { useState } from "react";
import PropTypes from "prop-types";
import MonthFilter from "./MonthFilter";
import DayTasks from "./DayTasks";
import { format, getMonth } from "date-fns";

const TasksByMonth = ({ tasks }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedProject, setSelectedProject] = useState("");

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  // Get unique project names
  const projectNames = [...new Set(tasks.map((task) => task.project))];

  // Filter tasks by selected month and selected project
  const filteredTasks = tasks.filter(
    (task) =>
      getMonth(new Date(task.startTime)) === selectedMonth &&
      (selectedProject === "" || task.project === selectedProject)
  );

  // Group tasks by day
  const tasksByDay = filteredTasks.reduce((groups, task) => {
    const day = format(new Date(task.startTime), "yyyy-MM-dd");
    if (!groups[day]) {
      groups[day] = [];
    }
    groups[day].push(task);
    return groups;
  }, {});

  return (
    <div className="tasks-by-month container">
      <h2>Tasks for Selected Month</h2>

      {/* Month Filter */}
      <MonthFilter
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
      />

      {/* Project Filter */}
      <div className="form-group">
        <label htmlFor="projectFilter" className="label">
          Filter by Project
        </label>
        <select
          id="projectFilter"
          className="input"
          value={selectedProject}
          onChange={handleProjectChange}
        >
          <option value="">All Projects</option>
          {projectNames.map((project, index) => (
            <option key={index} value={project}>
              {project}
            </option>
          ))}
        </select>
      </div>

      {/* Tasks by Day */}
      {Object.keys(tasksByDay).length === 0 ? (
        <p>No tasks match the selected filters.</p>
      ) : (
        Object.keys(tasksByDay)
          .sort()
          .map((day) => (
            <DayTasks key={day} day={day} tasks={tasksByDay[day]} />
          ))
      )}
    </div>
  );
};

TasksByMonth.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      project: PropTypes.string.isRequired,
      task: PropTypes.string.isRequired,
      coordinatedWith: PropTypes.string,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      timeSpent: PropTypes.number.isRequired,
      comments: PropTypes.string,
    })
  ).isRequired,
};

export default TasksByMonth;
