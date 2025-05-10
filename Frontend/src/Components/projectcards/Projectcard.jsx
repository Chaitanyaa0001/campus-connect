import React from 'react';
import { FaUsers, FaCalendarAlt,FaTrash } from 'react-icons/fa';
import './Projectcard.css'



const Projectcard = ({ title, description, category, members, dueDate, status, technologies }) => {
  return (
            <div className="project-card">
              <div className="project-header">
                <h2>{title}</h2>
              </div>
              <p className='category'>{category}</p>
              <div className="project-details">
                <p className='description'>{description}</p>
                <div className="pro-date">
                  <p><FaUsers /> {members}</p>
                  <p><FaCalendarAlt /> {dueDate}</p>
                </div>
                <div className="technology">
                  {technologies.map((tech, i) => (
                    <span className='tech' key={i}>{tech}</span>
                  ))}
                </div>
              </div>
              <button className='projectbooking'><FaTrash size={20} color='red'/></button>
          
            </div>
  );
};

export default Projectcard;
