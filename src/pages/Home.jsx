import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import { getProjects, deleteProject } from '../services/projectService'; // 👈 Importa deleteProject
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const Home = ({ currentUser }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const handleDeleteProject = async (id) => {
    const confirmed = window.confirm("¿Estás seguro de eliminar este proyecto? Esta acción no se puede deshacer.");
    if (!confirmed) return;

    const success = await deleteProject(id);
    if (success) {
      const data = await getProjects();
      setProjects(data);
      alert("Proyecto eliminado exitosamente.");
    } else {
      alert("Error al eliminar el proyecto. Por favor, inténtalo de nuevo.");
    }
  };
  return (
    <div className="home-page">
      <Header currentUser={currentUser} />
      <main>
        <section className="hero">
          <h1>¡Bienvenido Emprendedor!</h1>
          <p>Te ayudamos a impulsar tus ventas a través de páginas web y soluciones digitales.</p>
          <p>Automatizamos tus procesos para que te enfoques en lo que realmente importa: tu negocio.</p>
          <img
            src="https://coworkingfy.com/wp-content/uploads/2023/06/tipos-de-proyectos.jpg"
            alt="Proyectos para MYPEs y PYMEs"
            className="hero-image"
          />
        </section>

        <section className="projects-section">
          {currentUser && (
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <Link
                to="/nuevo-proyecto"
                className="add-project-btn"
              >
                <FaPlus /> Agregar Nuevo Proyecto
              </Link>
            </div>
          )}
          <div className="transition-banner">
            <h2>Portafolio de Soluciones</h2>
            <p>Soluciones diseñadas por BDI Consulting para MYPES y PYMES</p>
          </div>

          <div className="projects-grid">
            {projects.length > 0 ? (
              projects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  currentUser={currentUser}
                  onDelete={handleDeleteProject} 
                />
              ))
            ) : (
              <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>
                Cargando proyectos...
              </p>
            )}
          </div>
        
        </section>
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} BDI Consulting —{' '}
          <a href="https://bdi.com.pe" target="_blank" rel="noopener noreferrer">
            bdi.com.pe
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;