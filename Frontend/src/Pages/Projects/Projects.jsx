import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Projects.css';
import { FaSearch, FaPlusCircle, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { motion } from 'framer-motion';

const Projects = () => {
  const [searchquery, setsearchquery] = useState("");

  const [projects, setProjects] = useState([
    {
      title: "Campus Navigation App",
      category: "Mobile Development",
      description: "Creating a mobile app to help navigate the campus buildings and find the shortest routes between classes.",
      members: 5,
      dueDate: "May 15, 2025",
      progress: 65,
      status: "Active",
      technologies: ["React Native", "Maps API"]
    },
    {
      title: "Student Wellness Survey",
      category: "Research",
      description: "Conducting research on student wellness and mental health to inform campus services.",
      members: 3,
      dueDate: "April 30, 2025",
      progress: 40,
      status: "Active",
      technologies: ["Research", "Mobile Development"]
    },
    {
      title: "Campus Sustainability Initiative",
      category: "Environmental",
      description: "Developing a plan to reduce waste and increase sustainability practices across campus.",
      members: 8,
      dueDate: "June 10, 2025",
      progress: 55,
      status: "Active",
      technologies: ["Data Analyst"]
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    category: "",
    description: "",
    members: 0,
    dueDate: "",
    status: "Active",
    technologies: []
  });
  const [techInput, setTechInput] = useState("");

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const techArray = techInput.split(',').map(tech => tech.trim());
    setProjects(prev => [...prev, { ...newProject, technologies: techArray }]);
    setNewProject({
      title: "",
      category: "",
      description: "",
      members: 0,
      dueDate: "",
      status: "Active",
      technologies: []
    });
    setTechInput("");
    setShowForm(false);
  };

  const filteredProjects = projects.filter(project => {
    const query = searchquery.toLowerCase();
    return (
      project.title?.toLowerCase().includes(query) ||
      project.description?.toLowerCase().includes(query) ||
      project.category?.toLowerCase().includes(query)
    );
  });

  return (
    <div className='component-container'>
      <Sidebar />

      <motion.div
        id="projects"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
      >
        <div className="projects-heading">
          <h1>Projects</h1>
          <p>Collaborate on academic and campus projects</p>
        </div>

        <button className='add-project' onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : <><FaPlusCircle /> Offer a Project</>}
        </button>

        {showForm && (
          <form className="add-project-form" onSubmit={submitHandler}>
            <input type="text" name="title" value={newProject.title} onChange={changeHandler} placeholder="Project Title" required />
            <input type="text" name="category" value={newProject.category} onChange={changeHandler} placeholder="Category" required />
            <textarea name="description" value={newProject.description} onChange={changeHandler} placeholder="Description" required />
            <input type="number" name="members" value={newProject.members} onChange={changeHandler} placeholder="Members" required min="1" />
            <input type="text" name="dueDate" value={newProject.dueDate} onChange={changeHandler} placeholder="Due Date (e.g. June 10, 2025)" required />
            <input type="text" name="technologies" value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="Technologies (comma separated)" />
            <button type="submit" className='submit-project'>Submit Project</button>
          </form>
        )}

        <h2 className='available-projects'>Available Projects</h2>

        <div className="search-bar">
          <FaSearch className='Search-icon' />
          <input
            type="text"
            placeholder="Search by title, description, or category..."
            value={searchquery}
            onChange={(e) => setsearchquery(e.target.value)}
          />
        </div>

        <div className="project-cards">
          {filteredProjects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-header">
                <h2>{project.title}</h2>
              </div>

              <p className='category'>{project.category}</p>

              <div className="project-details">
                <p className='description'>{project.description}</p>
                <div className="pro-date">
                  <p><FaUsers /> {project.members}</p>
                  <p><FaCalendarAlt /> {project.dueDate}</p>
                </div>

                <div className="technology">
                  {project.technologies.map((tech, i) => (
                    <span className='tech' key={`${index}-${i}`}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className="project-booking">
                <button>Get Involved</button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;
