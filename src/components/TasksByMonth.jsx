import { useState } from "react";
import PropTypes from "prop-types";
import MonthFilter from "./MonthFilter";
import DayTasks from "./DayTasks";
import { format, getMonth } from "date-fns";

const TasksByMonth = ({ tasks }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  // Filter tasks by selected month
  const filteredTasks = tasks.filter(
    (task) => getMonth(new Date(task.startTime)) === selectedMonth
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
      <MonthFilter
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
      />
      {Object.keys(tasksByDay).length === 0 ? (
        <p>No tasks for this month.</p>
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
