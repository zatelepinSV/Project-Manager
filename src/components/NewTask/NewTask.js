import { useState, useContext } from "react";
import { ProjectContext } from "../../store/project-context";

export const NewTask = () => {
const [enteredTask, setEnteredTask] = useState('');
const { addTask } = useContext(ProjectContext);

const changeHandler = (event) => {
  setEnteredTask(event.target.value);
}

const clickHandler = () => {
  if (enteredTask.trim() === '') {
    return;
  }
  addTask(enteredTask);
  setEnteredTask('');
}

  return (
    <div className='flex items-center gap-4'>
      <input
        type='text'
        onChange={changeHandler}
        value={enteredTask}
        className='w-64 px-2 py-1 rounded-sm bg-stone-200'
      />
      <button className='text-stone-700 hover:text-stone-950' onClick={clickHandler}>Add Task</button>
    </div>
  );
};