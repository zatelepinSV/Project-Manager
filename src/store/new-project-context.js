import {createContext, useReducer} from "react";

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

export const NewProjectContext = createContext({
  titleState: { value: '', isValid: null },
  descriptionState: { value: '', isValid: null },
  dateState: { value: '', isValid: null },
  titleChangeHandler: () => {},
  validateTitleHandler: () => {},
  descriptionChangeHandler: () => {},
  validateDescriptionHandler: () => {},
  dateChangeHandler: () => {},
  validateDateHandler: () => {},
});

export const NewProjectContextProvider = ({children}) => {
  const [titleState, dispatchTitleState] = useReducer(titleReducer, { value: '', isValid: null });
  const [descriptionState, dispatchDescriptionState] = useReducer(descriptionReducer, { value: '', isValid: null });
  const [dateState, dispatchDateState] = useReducer(dateReducer, { value: '', isValid: null });

  const titleChangeHandler = (event) => {
    event ? dispatchTitleState({
      type: 'USER_INPUT',
      value: event.target.value,
    }) : dispatchTitleState({
        type: 'USER_INPUT',
        value: '',
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

  const valueCtx = {
    titleState,
    descriptionState: descriptionState,
    dateState: dateState,
    titleChangeHandler: titleChangeHandler,
    validateTitleHandler: validateTitleHandler,
    descriptionChangeHandler: descriptionChangeHandler,
    validateDescriptionHandler: validateDescriptionHandler,
    dateChangeHandler: dateChangeHandler,
    validateDateHandler: validateDateHandler,
  }

  return (
    <NewProjectContext.Provider value={valueCtx}>
      {children}
    </NewProjectContext.Provider>
  )
}