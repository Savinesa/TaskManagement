import { useState, useEffect } from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";

const TaskTimer = ({ onSaveTask }) => {
  const [taskDetails, setTaskDetails] = useState({
    project: "",
    task: "",
    coordinatedWith: "",
    comments: "",
  });
  const [startTime, setStartTime] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const today = new Date();
  const formattedDate = format(today, "EEEE, MMMM do, yyyy");

  const startTimer = () => {
    const taskStartTime = new Date();
    setStartTime(taskStartTime);
    setTimerRunning(true);
    setElapsedTime(0);

    // Save the task and fields to localStorage
    localStorage.setItem(
      "runningTask",
      JSON.stringify({
        startTime: taskStartTime,
        ...taskDetails, // Save task details as well
      })
    );
  };

  const stopTimer = () => {
    setTimerRunning(false);
    const endTime = new Date();
    const timeSpent = Math.floor((endTime - startTime) / 1000 / 60);

    const task = {
      ...taskDetails,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      timeSpent,
    };
    onSaveTask(task);

    // Clear task from localStorage
    localStorage.removeItem("runningTask");

    setTaskDetails({
      project: "",
      task: "",
      coordinatedWith: "",
      comments: "",
    });
    setStartTime(null);
    setElapsedTime(0);
  };

  // Retrieve the running task and task details from localStorage when component loads
  useEffect(() => {
    const storedTask = localStorage.getItem("runningTask");
    if (storedTask) {
      const parsedTask = JSON.parse(storedTask);
      setStartTime(new Date(parsedTask.startTime));
      setTaskDetails({
        project: parsedTask.project || "",
        task: parsedTask.task || "",
        coordinatedWith: parsedTask.coordinatedWith || "",
        comments: parsedTask.comments || "",
      });
      setTimerRunning(true);
    }
  }, []);

  useEffect(() => {
    if (timerRunning && startTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const minutesPassed = Math.floor((now - startTime) / 1000 / 60);
        setElapsedTime(minutesPassed);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerRunning, startTime]);

  // Update localStorage whenever taskDetails changes
  useEffect(() => {
    if (timerRunning) {
      localStorage.setItem(
        "runningTask",
        JSON.stringify({
          startTime,
          ...taskDetails,
        })
      );
    }
  }, [taskDetails, timerRunning, startTime]);

  return (
    <div className="task-timer container">
      <h2>Task Timer</h2>
      <p>{formattedDate}</p>

      <div className="task-timer__form">
        <input
          className="input"
          type="text"
          name="project"
          placeholder="Project"
          value={taskDetails.project}
          onChange={(e) =>
            setTaskDetails({ ...taskDetails, project: e.target.value })
          }
        />
        <input
          className="input"
          type="text"
          name="task"
          placeholder="Task"
          value={taskDetails.task}
          onChange={(e) =>
            setTaskDetails({ ...taskDetails, task: e.target.value })
          }
        />
        <input
          className="input"
          type="text"
          name="coordinatedWith"
          placeholder="Coordinated With"
          value={taskDetails.coordinatedWith}
          onChange={(e) =>
            setTaskDetails({ ...taskDetails, coordinatedWith: e.target.value })
          }
        />
        <textarea
          className="textarea"
          name="comments"
          placeholder="Comments"
          value={taskDetails.comments}
          onChange={(e) =>
            setTaskDetails({ ...taskDetails, comments: e.target.value })
          }
        ></textarea>

        {timerRunning ? (
          <div className="timer-display">
            <p>Start Time: {startTime && format(startTime, "hh:mm a")}</p>
            <p>Elapsed Time: {elapsedTime} minute(s)</p>
          </div>
        ) : (
          <div className="timer-display">Timer stopped</div>
        )}

        <div className="task-timer__buttons">
          {!timerRunning ? (
            <button className="button" onClick={startTimer}>
              Start Task
            </button>
          ) : (
            <button className="button" onClick={stopTimer}>
              Stop Task
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

TaskTimer.propTypes = {
  onSaveTask: PropTypes.func.isRequired,
};

export default TaskTimer;
