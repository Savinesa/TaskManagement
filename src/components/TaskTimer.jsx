import { useState, useEffect } from "react";
import { format } from "date-fns";
import PropTypes from "prop-types"; // Ensure PropTypes is imported

const TaskTimer = ({ onSaveTask }) => {
  const [taskDetails, setTaskDetails] = useState({
    project: "",
    task: "",
    coordinatedWith: "",
    comments: "",
  });
  const [startTime, setStartTime] = useState(null); // Store start time
  const [timerRunning, setTimerRunning] = useState(false); // Track whether the timer is running
  const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time in minutes

  const today = new Date();
  const formattedDate = format(today, "EEEE, MMMM do, yyyy");

  const startTimer = () => {
    setStartTime(new Date());
    setTimerRunning(true);
    setElapsedTime(0); // Reset elapsed time
  };

  const stopTimer = () => {
    setTimerRunning(false);
    const endTime = new Date();
    const timeSpent = Math.floor((endTime - startTime) / 1000 / 60); // Time in minutes
    const task = {
      ...taskDetails,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      timeSpent,
    };
    onSaveTask(task);
    setTaskDetails({
      project: "",
      task: "",
      coordinatedWith: "",
      comments: "",
    });
    setStartTime(null);
    setElapsedTime(0);
  };

  useEffect(() => {
    if (timerRunning) {
      const interval = setInterval(() => {
        const now = new Date();
        const minutesPassed = Math.floor((now - startTime) / 1000 / 60);
        setElapsedTime(minutesPassed);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerRunning, startTime]);

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
            <p>Start Time: {format(startTime, "hh:mm a")}</p>
            <p>Elapsed Time: {elapsedTime} minute(s)</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${(elapsedTime % 60) * (100 / 60)}%`,
                  transition: "width 1s linear",
                }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="timer-display"></div>
        )}

        <div className="task-timer__buttons">
          {!timerRunning ? (
            <button className="button" onClick={startTimer}>
              Start Task
            </button>
          ) : (
            <button className="button button--stop" onClick={stopTimer}>
              Stop Task
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

TaskTimer.propTypes = {
  onSaveTask: PropTypes.func.isRequired, // Add this line to validate onSaveTask as a required function
};

export default TaskTimer;
