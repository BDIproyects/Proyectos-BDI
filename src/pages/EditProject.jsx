import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';

const EditProject = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('📅');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [problem, setProblem] = useState('');
  const [functionalities, setFunctionalities] = useState(['']);
  const [technologies, setTechnologies] = useState(['']);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("ID del proyecto:", id);
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || '');
          setIcon(data.icon || '📅');
          setCategory(data.category || '');
          setDescription(data.description || '');
          setProblem(data.problem || '');
          setFunctionalities(data.functionalities || ['']);
          setTechnologies(data.technologies || ['']);
          setUrl(data.url || '');
        } else {
          alert("Proyecto no encontrado.");
          navigate('/');
        }
      } catch (error) {
        console.error("Error al cargar el proyecto:", error);
        alert("Error al cargar el proyecto.");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate]);

  const handleAddFunctionality = () => {
    setFunctionalities([...functionalities, '']);
  };

  const handleRemoveFunctionality = (index) => {
    const newFuncs = [...functionalities];
    newFuncs.splice(index, 1);
    setFunctionalities(newFuncs);
  };

  const handleFunctionalityChange = (index, value) => {
    const newFuncs = [...functionalities];
    newFuncs[index] = value;
    setFunctionalities(newFuncs);
  };

  const handleAddTechnology = () => {
    setTechnologies([...technologies, '']);
  };

  const handleRemoveTechnology = (index) => {
    const newTechs = [...technologies];
    newTechs.splice(index, 1);
    setTechnologies(newTechs);
  };

  const handleTechnologyChange = (index, value) => {
    const newTechs = [...technologies];
    newTechs[index] = value;
    setTechnologies(newTechs);
  };

  // Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !icon || !category || !description || !problem || !url) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      const docRef = doc(db, "projects", id);
      await updateDoc(docRef, {
        title,
        icon,
        category,
        description,
        problem,
        functionalities: functionalities.filter(f => f.trim() !== ''),
        technologies: technologies.filter(t => t.trim() !== ''),
        url,
        updatedAt: new Date().toISOString()
      });

      alert('Proyecto actualizado exitosamente!');
      navigate('/');
    } catch (error) {
      alert('Error al actualizar el proyecto: ' + error.message);
    }
  };

  if (loading) {
    return <div className="app-loading">Cargando proyecto...</div>;
  }

  return (
    <div className="new-project-page">
      <h1>Editar Proyecto</h1>
      <p>Modifica la información del proyecto y guarda los cambios.</p>

      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label>Título del Proyecto *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ej: Sistema de Reservas y Citas"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Icono del Proyecto *</label>
            <div className="icon-selector">
              {['📅', '🧮', '📦', '🌐', '📈', '💬', '🚀', '💡', '⚡', '🔧'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`icon-btn ${icon === emoji ? 'selected' : ''}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Categoría *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="Automatización">Automatización</option>
              <option value="Gestión">Gestión</option>
              <option value="Página web">Página web</option>
              <option value="Marketing">Marketing</option>
              <option value="Comunicación">Comunicación</option>
              <option value="Comunicación">Ventas</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Descripción Breve *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe brevemente el proyecto"
            required
          />
        </div>

        <div className="form-group">
          <label>Problema que Resuelve *</label>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="¿Qué problema de la MYPE/PYME resuelve este proyecto?"
            required
          />
        </div>

        <div className="form-group">
          <label>Funcionalidades Principales *</label>
          {functionalities.map((func, index) => (
            <div key={index} className="functionality-item">
              <input
                type="text"
                value={func}
                onChange={(e) => handleFunctionalityChange(index, e.target.value)}
                placeholder={`Funcionalidad ${index + 1}`}
                required
              />
              {functionalities.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveFunctionality(index)}
                  className="remove-btn"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddFunctionality}
            className="add-btn"
          >
            <FaPlus /> Agregar Funcionalidad
          </button>
        </div>

        <div className="form-group">
          <label>Tecnologías Utilizadas *</label>
          {technologies.map((tech, index) => (
            <div key={index} className="technology-item">
              <input
                type="text"
                value={tech}
                onChange={(e) => handleTechnologyChange(index, e.target.value)}
                placeholder={`Tecnología ${index + 1}`}
                required
              />
              {technologies.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveTechnology(index)}
                  className="remove-btn"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTechnology}
            className="add-btn"
          >
            <FaPlus /> Agregar Tecnología
          </button>
        </div>

        <div className="form-group">
          <label>URL del Proyecto *</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="btn-cancel">
            Cancelar
          </button>
          <button type="submit" className="btn-submit">
            <FaCheck /> Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;