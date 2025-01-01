import { useState } from "react";

const Setup = () => {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  const [projectData, setProjectData] = useState({
    name: "",
    hourlyRate: "",
    deadline: "",
    hourlyEstimation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !projectData.name ||
      !projectData.hourlyRate ||
      !projectData.deadline ||
      !projectData.hourlyEstimation
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newProjects = [...projects, projectData];
    setProjects(newProjects);
    localStorage.setItem("projects", JSON.stringify(newProjects));

    setProjectData({
      name: "",
      hourlyRate: "",
      deadline: "",
      hourlyEstimation: "",
    });
  };

  return (
    <div className="tasks-by-month container">
      <h2>Project Setup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="name">
            Project Name
          </label>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={projectData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="hourlyRate">
            Hourly Rate ($)
          </label>
          <input
            className="input"
            type="number"
            id="hourlyRate"
            name="hourlyRate"
            value={projectData.hourlyRate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="deadline">
            Deadline
          </label>
          <input
            className="input"
            type="date"
            id="deadline"
            name="deadline"
            value={projectData.deadline}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="hourlyEstimation">
            Hourly Estimation
          </label>
          <input
            className="input"
            type="number"
            id="hourlyEstimation"
            name="hourlyEstimation"
            value={projectData.hourlyEstimation}
            onChange={handleChange}
            required
          />
        </div>

        <button className="button" type="submit">
          Add Project
        </button>
      </form>

      <h2>Existing Projects</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <strong>{project.name}</strong> - ${project.hourlyRate}/hour,
            Deadline: {project.deadline}, Estimated Hours:{" "}
            {project.hourlyEstimation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Setup;
