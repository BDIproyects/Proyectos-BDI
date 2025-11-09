import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const ProjectCard = ({ project, currentUser, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="project-card">
      <div className="card-header">
        <div className="icon">{project.icon}</div>
        <span className={`category ${project.category.toLowerCase().replace(' ', '')}`}>
          {project.category}
        </span>
      </div>
      <h3>{project.title}</h3>
      <p className="description">{project.description}</p>

      <div className="problem">
        <span>⚠️</span> {project.problem}
      </div>

      <div className="functionalities">
        <h4>Funcionalidades:</h4>
        <ul>
          {project.functionalities.map((func, index) => (
            <li key={index}>✅ {func}</li>
          ))}
        </ul>
      </div>

      <div className="technologies">
        <h4>Tecnologías:</h4>
        <div className="tech-tags">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>

      <div className="card-footer">
        <Link to={project.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Ver Proyecto
        </Link>
        {currentUser && (
          <div className="admin-actions">
            <button
              className="btn-edit"
              title="Editar proyecto"
              onClick={() => navigate(`/editar/${project.id}`)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
            </button>
            <button
              className="btn-delete"
              title="Eliminar proyecto"
              onClick={() => onDelete(project.id)}
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;