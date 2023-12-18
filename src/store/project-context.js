import { createContext, useState } from "react";


export  const ProjectContext = createContext({
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  startAddProject: () => {},
  addProject: () => {},
  onCancelAddProject: () => {},
  onselectProject: () => {},
  deleteProject: () => {},
});

export const ProjectContextProvider = ({ children }) => {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const addTaskHandler = (text) => {
    setProjectState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  const deleteTaskHandler = (id) => {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== id),
      };
    });
  }

  const startAddProjectHandler = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  const addProjectHandler = (projectData) => {
    setProjectState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  const cancelAddProject = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  const selectProjectHandler = (id) => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  const deleteProjectHandler = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId),
      };
    });
  }

  const valueCtx = {
    selectedProjectId: projectState.selectedProjectId,
    projects: projectState.projects,
    tasks: projectState.tasks,
    addTask: addTaskHandler,
    deleteTask: deleteTaskHandler,
    startAddProject: startAddProjectHandler,
    addProject: addProjectHandler,
    onCancelAddProject: cancelAddProject,
    onselectProject: selectProjectHandler,
    deleteProject: deleteProjectHandler,
  }

  return (
    <ProjectContext.Provider value={valueCtx}>
      {children}
    </ProjectContext.Provider>
  );
};