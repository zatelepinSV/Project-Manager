import { useState } from "react";
import { ProjectSidebar } from "./components/ProjectSidebar";
import { NewProject } from "./components/NewProject";
import { NoProjectSelected } from "./components/NoProjectSelected";
import './App.css';

const App = () => {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

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
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }
  console.log(projectState)

  let content;
  if (projectState.selectedProjectId === null) {
    content = <NewProject onAddProject={addProjectHandler} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={startAddProjectHandler}/>;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onStartAddProject={startAddProjectHandler} projects={projectState.projects}/>
      {content}
    </main>
  );
}

export default App;