import { db } from './firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export const getProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    return projects;
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    return [];
  }
};

export const deleteProject = async (projectId) => {
  try {
    await deleteDoc(doc(db, "projects", projectId));
    console.log("Proyecto eliminado con ID:", projectId);
    return true;
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    return false;
  }
};