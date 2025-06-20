import React from 'react';
import { FaUsers, FaCalendarAlt, FaTrash } from 'react-icons/fa';
import './Projectcard.css';

const Projectcard = ({
  projectTitle,
  Description,
  Category,
  personrequired,
  dueDate,
  Technologies
}) => {
  return (
    <div className="project-card">
      <div className="project-header">
        <h2>{projectTitle}</h2>
      </div>
      <p className="category">{Category}</p>
      <div className="project-details">
        <p className="description">{Description}</p>
        <div className="pro-date">
          <p><FaUsers /> {personrequired}</p>
          <p><FaCalendarAlt /> {dueDate}</p>
        </div>
        <div className="technology">
          {Technologies?.map((tech, i) => (
            <span className="tech" key={i}>{tech}</span>
          ))}
        </div>
      </div>
      <button className="projectbooking"><FaTrash size={20} color="red" /></button>
    </div>
  );
};

export default Projectcard;
