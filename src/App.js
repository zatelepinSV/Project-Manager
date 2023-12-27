import { useContext } from "react";
import { ProjectSidebar } from "./components/ProjectSidebar";
import { NewProject } from "./components/NewProject";
import { NoProjectSelected } from "./components/NoProjectSelected";
import { SelectedProject } from "./components/SelectedProject";
import { ProjectContext } from "./store/project-context";

const App = () => {
  const { projects, selectedProjectId } = useContext(ProjectContext);
  const selectedProject = projects.find(project => project.id === selectedProjectId);
  let content = <SelectedProject project={selectedProject} />;
  if (selectedProjectId === null) {
    content = <NewProject />;
  } else if (selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  }
  console.log('renderApp')
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar/>
      {content}
    </main>
  );
};

export default App;