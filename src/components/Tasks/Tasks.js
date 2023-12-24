import { NewTask } from "../NewTask";
import { useContext, useRef } from "react";
import { ProjectContext } from "../../store/project-context";
import { Modal } from "../Modal";

export const Tasks = () => {
  const { tasks, deleteTask, selectedProjectId } = useContext(ProjectContext);
  const onDeleteTask = useRef();
  const taskId = useRef();
  const projectTasks = tasks.filter(item => item.projectId === selectedProjectId);

  const showModal = (id) => {
    onDeleteTask.current.open();
    taskId.current = id;
  }
  const handleStop = () => {
    onDeleteTask.current.close();
  }

  const handleRemove = () => {
    onDeleteTask.current.close();
    deleteTask(taskId.current);
  }

  return (
    <section>
      <Modal ref={onDeleteTask} stopRemove={handleStop} remove={handleRemove}>
        <div className='text-right'>
          <h2 className='text-xl font-bold text-stone-700 my-4'>Are you sure?</h2>
          <p className='my-4'>Do you really want to remove this Task?</p>
        </div>
      </Modal>
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