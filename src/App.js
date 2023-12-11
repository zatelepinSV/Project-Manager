import { useState } from "react";
import { ProjectSidebar } from "./components/ProjectSidebar";
import { NewProject } from "./components/NewProject";
import { NoProjectSelected } from "./components/NoProjectSelected";
import {SelectedProject} from "./components/SelectedProject";

const App = () => {
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
        selectedProjectId: null
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

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)
  let content = <SelectedProject
    project={selectedProject}
    onDeleteProject={deleteProjectHandler}
    onAddTask={addTaskHandler}
    onDeleteTask={deleteTaskHandler}
    tasks={projectState.tasks}
  />;
  if (projectState.selectedProjectId === null) {
    content = <NewProject onAddProject={addProjectHandler} onCancel={cancelAddProject} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={startAddProjectHandler}/>;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={startAddProjectHandler}
        projects={projectState.projects}
        onSelectProject={selectProjectHandler}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
};

export default App;