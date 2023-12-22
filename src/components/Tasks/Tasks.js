import { NewTask } from "../NewTask";
import { useContext, useRef } from "react";
import { ProjectContext } from "../../store/project-context";
import { DeleteTaskModal } from "../DeleteTaskModal";

export const Tasks = () => {
  const { tasks, deleteTask, selectedProjectId } = useContext(ProjectContext);
  const onDeleteTask = useRef();
  const task = useRef();
  const projectTasks = tasks.filter(item => item.projectId === selectedProjectId);

  const showModal = (id) => {
    onDeleteTask.current.open();
    task.current = id;
  }
  const handleStop = () => {
    onDeleteTask.current.close();
  }

  const handleRemove = () => {
    onDeleteTask.current.close();
    deleteTask(task.current);
  }

  return (
    <section>
      <DeleteTaskModal ref={onDeleteTask} onCancel={handleStop} onConfirm={handleRemove} />
      <h2 className='text-2xl font-bold text-stone-700 mb-4'>Tasks</h2>
      <NewTask />
      {projectTasks.length === 0 && <p className='text-stone-800 my-4'>This project does not have any tasks yet.</p>}
      {projectTasks.length > 0 && <ul className='p-4 mt-8 rounded-md bg-stone-100'>
        {projectTasks.map(task => <li key={task.id} className='flex justify-between my-4'>
          <span>{task.text}</span>
          <button onClick={() => showModal(task.id)} className='text-stone-700 hover:text-red-500'>Clear</button>
        </li>)}
      </ul>}
    </section>
  );
};