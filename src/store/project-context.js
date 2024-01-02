import { createContext, useReducer } from "react";

const projectReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      const taskId = Math.random();
      const newTask = {
        text: action.payload,
        projectId: state.selectedProjectId,
        id: taskId,
      };
      return {
        ...state,
        tasks: [newTask, ...state.tasks],
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'START_ADD_PROJECT':
      return {
        ...state,
        selectedProjectId: null,
      };
    case 'ADD_PROJECT':
      const projectId = Math.random();
      const newProject = {
        ...action.payload,
        id: projectId,
      };
      return {
        ...state,
        selectedProjectId: undefined,
        projects: [...state.projects, newProject]
      };
    case 'CANCEL_ADD_PROJECT':
      return {
        ...state,
        selectedProjectId: undefined,
      };
    case 'SELECT_PROJECT':
      return {
        ...state,
        selectedProjectId: action.payload,
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        selectedProjectId: undefined,
        projects: state.projects.filter(project => project.id !== state.selectedProjectId),
      };
    default:
      return state;
  }
};

export const ProjectContext = createContext({
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
  addTask: () => {},
  deleteTask: () => {
  },
  startAddProject: () => {
  },
  addProject: () => {
  },
  onCancelAddProject: () => {
  },
  onselectProject: () => {
  },
  deleteProject: () => {
  },
});

export const ProjectContextProvider = ({children}) => {
  const [projectState, projectStateDispatch] = useReducer(
    projectReducer,
    {
      selectedProjectId: undefined,
      projects: [],
      tasks: [],
    }
  );

  const addTaskHandler = (text) => {
    projectStateDispatch({
      type: 'ADD_TASK',
      payload: text,
    });
  };

  const deleteTaskHandler = (id) => {
    projectStateDispatch({
      type: 'DELETE_TASK',
      payload: id,
    });
  };

  const startAddProjectHandler = () => {
    projectStateDispatch({
      type: 'START_ADD_PROJECT',
    });
  };

  const addProjectHandler = (projectData) => {
    projectStateDispatch({
      type: 'ADD_PROJECT',
      payload: projectData,
    });
  };

  const cancelAddProject = () => {
    projectStateDispatch({
      type: 'CANCEL_ADD_PROJECT',
    });
  };

  const selectProjectHandler = (id) => {
    projectStateDispatch({
      type: 'SELECT_PROJECT',
      payload: id,
    });
  };

  const deleteProjectHandler = () => {
    projectStateDispatch({
      type: 'DELETE_PROJECT',
    });
  };

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