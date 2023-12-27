import { Tasks } from "../Tasks";
import {useContext, useRef} from "react";
import { ProjectContext } from "../../store/project-context";
import {Modal} from "../Modal";

export const SelectedProject = ({ project }) => {
  const onDeleteProject = useRef();
  const { deleteProject } = useContext(ProjectContext);

  const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const showModal = () => {
    onDeleteProject.current.open();
  }

  const handleStop = () => {
    onDeleteProject.current.close();
  }

  const handleRemove = () => {
    onDeleteProject.current.close();
    deleteProject();
  }

  return (
    <div className='w-[35rem] mt-16'>
      <Modal ref={onDeleteProject} stopRemove={handleStop} remove={handleRemove}>
        <div className='text-right'>
          <h2 className='text-xl font-bold text-stone-700 my-4'>Are you sure?</h2>
          <p className='my-4'>Do you really want to remove this Project?</p>
        </div>
      </Modal>
      <header className='pt-4 mb-4 border-b-2 border-stone-300'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-stone-600 mb-2'>{project.title}</h1>
          <button className='text-stone-600 hover:text-stone-950' onClick={showModal}>Delete</button>
        </div>
        <p className='mb-4 text-stone-400'>{formattedDate}</p>
        <p className='text-stone-600 whitespace-pre-wrap'>{project.description}</p>
      </header>
      <Tasks />
    </div>
  );
};