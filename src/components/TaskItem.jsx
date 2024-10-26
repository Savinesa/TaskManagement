import PropTypes from "prop-types";
import { useState } from "react";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

const TaskItem = ({ task, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskDetails, setTaskDetails] = useState(task);

  // Toggle between edit and view mode
  const handleEditClick = () => {
    if (isEditing) {
      // Call the save function passed from the parent
      onSave(taskDetails);
    }
    setIsEditing(!isEditing); // Toggle the editing state
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({
      ...taskDetails,
      [name]: value,
    });
  };

  const {
    project,
    task: taskName,
    coordinatedWith = "N/A",
    startTime,
    endTime,
    timeSpent,
    comments = "N/A",
  } = taskDetails;

  const formattedStartTime = startTime
    ? format(new Date(startTime), "hh:mm a")
    : "N/A";
  const formattedEndTime = endTime
    ? format(new Date(endTime), "hh:mm a")
    : "N/A";

  return (
    <tr className="task-item">
      {isEditing ? (
        <>
          <td>
            <input name="project" value={project} onChange={handleChange} />
          </td>
          <td>
            <input name="task" value={taskName} onChange={handleChange} />
          </td>
          <td>
            <input
              name="coordinatedWith"
              value={coordinatedWith}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              name="startTime"
              value={formattedStartTime}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              name="endTime"
              value={formattedEndTime}
              onChange={handleChange}
            />
          </td>
          <td>
            <input name="timeSpent" value={timeSpent} onChange={handleChange} />
          </td>
          <td>
            <input name="comments" value={comments} onChange={handleChange} />
          </td>
          <td>
            <button className="button" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faSave} className="text" />
            </button>
          </td>
        </>
      ) : (
        <>
          <td>{project}</td>
          <td>{taskName}</td>
          <td>{coordinatedWith}</td>
          <td>{formattedStartTime}</td>
          <td>{formattedEndTime}</td>
          <td>{timeSpent} mins</td>
          <td>{comments}</td>
          <td>
            <button className="button" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faEdit} className="text" />
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    project: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    coordinatedWith: PropTypes.string,
    startTime: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]).isRequired,
    endTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
      .isRequired,
    timeSpent: PropTypes.number.isRequired,
    comments: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default TaskItem;
