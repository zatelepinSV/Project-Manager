import { useRef, useContext, useReducer } from "react";
import { ProjectContext } from "../../store/project-context";
import { Input } from "../Input";
import { Modal } from "../Modal";

const titleReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.trim() !== ''};
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim() !== ''};
  }
  return { value: '', isValid: false };
}

const descriptionReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.trim() !== ''};
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim() !== ''};
  }
  return { value: '', isValid: false };
}

const dateReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.trim() !== ''};
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim() !== ''};
  }
  return { value: '', isValid: false };
}

export const NewProject = () => {
  const [titleState, dispatchTitleState] = useReducer(titleReducer, { value: '', isValid: null });
  const [descriptionState, dispatchDescriptionState] = useReducer(descriptionReducer, { value: '', isValid: null });
  const [dateState, dispatchDateState] = useReducer(dateReducer, { value: '', isValid: null });
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const { addProject, onCancelAddProject } = useContext(ProjectContext);

  const saveHandler = () => {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === '') {
      modal.current.open();
      return;
    }
    addProject({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
    title.current.value = '';
    description.current.value = '';
    dueDate.current.value = '';
  }

  const titleChangeHandler = (event) => {
    dispatchTitleState({
      type: 'USER_INPUT',
      value: event.target.value,
    });
  }

  const validateTitleHandler = (event) => {
    dispatchTitleState({
      type: 'INPUT_BLUR',
      value: event.target.value,
    });
  }

  const descriptionChangeHandler = (event) => {
    dispatchDescriptionState({
      type: 'USER_INPUT',
      value: event.target.value,
    });
  }

  const validateDescriptionHandler = (event) => {
    dispatchDescriptionState({
      type: 'INPUT_BLUR',
      value: event.target.value,
    });
  }

  const dateChangeHandler = (event) => {
    dispatchDateState({
      type: 'USER_INPUT',
      value: event.target.value,
    });
  }

  const validateDateHandler = (event) => {
    dispatchDateState({
      type: 'INPUT_BLUR',
      value: event.target.value,
    });
  }

  const { isValid: titleIsValid } = titleState;
  const { isValid: descriptionIsValid } = descriptionState;
  const { isValid: dateIsValid } = dateState;

  // console.log(new Date());

  return (
    <>
      {/*<Modal ref={modal} buttonCaption='Close'  >
        <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Input</h2>
        <p className='text-stone-600 mb-4'>Oops... looks like you forgot to enter a value.</p>
        <p className='text-stone-600 mb-4'>Please make sure you provide a valid value for every input field.</p>
      </Modal>*/}
      <div className='w-[35rem] mt-16'>
        <menu className='flex items-center justify-end gap-4 my-4'>
          <li>
            <button className='text-stone-800 hover:text-stone-950' onClick={onCancelAddProject}>Cancel</button>
          </li>
          <li>
            <button onClick={saveHandler} disabled={!titleIsValid}
                    className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950'>Save
            </button>
          </li>
        </menu>
        <div>
          <Input
            type='text'
            label='Title'
            ref={title}
            onChange={titleChangeHandler}
            onBlur={validateTitleHandler}
            isValid={titleIsValid}
          />
          <Input
            label='Description'
            ref={description}
            onChange={descriptionChangeHandler}
            onBlur={validateDescriptionHandler}
            isValid={descriptionIsValid}
            textarea
          />
          <Input
            type='date'
            label='Due Date'
            ref={dueDate}
            onChange={dateChangeHandler}
            onBlur={validateDateHandler}
            isValid={dateIsValid}
          />
        </div>
      </div>
    </>
  );
};