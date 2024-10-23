import { useState } from "react";
import PropTypes from "prop-types";
import TaskItem from "./TaskItem";
import { format } from "date-fns";
import * as XLSX from "xlsx";

const DayTasks = ({ day, tasks }) => {
  const [taskList, setTaskList] = useState(tasks); // Store the task list in state
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const exportToExcel = (day, tasks) => {
    const worksheet = XLSX.utils.json_to_sheet(tasks); // Convert tasks to Excel worksheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, `Tasks-${day}`); // Append the worksheet

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `Tasks-${day}.xlsx`);
  };

  // Function to handle saving the updated task
  const handleSave = (updatedTask) => {
    // Update the specific task in the list
    const updatedTaskList = taskList.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTaskList(updatedTaskList); // Update the state with the new task list
  };

  return (
    <div>
      <div className="day-tasks">
        <div onClick={toggleExpand} className="day-tasks__header">
          {isExpanded ? "−" : "+"} {format(new Date(day), "MMMM do, yyyy")}
        </div>
        {isExpanded && (
          <div className="day-tasks__list">
            <table className="tasks-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Task</th>
                  <th>Coordinated With</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Time Spent</th>
                  <th>Comments</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {taskList.map((task, index) => (
                  <TaskItem key={index} task={task} onSave={handleSave} />
                ))}
              </tbody>
            </table>
            <div className="export-container">
              <button
                onClick={() => exportToExcel(day, tasks)}
                className="button"
                style={{ padding: "4px", margin: "4px" }}
              >
                Export to Excel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

DayTasks.propTypes = {
  day: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DayTasks;
