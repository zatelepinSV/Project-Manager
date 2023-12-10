import { useRef } from "react";
import { Input } from "../Input";
import { Modal } from "../Modal";

export const NewProject = ({onAddProject}) => {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  const saveHandler = () => {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === '') {
      modal.current.open();
      return;
    }

    onAddProject({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });

    title.current.value = '';
    description.current.value = '';
    dueDate.current.value = '';
  }

  return (
    <>
      <Modal ref={modal} />
      <div className='w-[35rem] mt-16'>
        <menu className='flex items-center justify-end gap-4 my-4'>
          <li>
            <button className='text-stone-800 hover:text-stone-950'>Cancel</button>
          </li>
          <li>
            <button onClick={saveHandler}
                    className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950'>Save
            </button>
          </li>
        </menu>
        <div>
          <Input type='text' label='Title' ref={title}/>
          <Input label='Description' ref={description} textarea/>
          <Input type='date' label='Due Date' ref={dueDate}/>
        </div>
      </div>
    </>
  );
};