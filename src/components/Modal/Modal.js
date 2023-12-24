import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button";

export const Modal = forwardRef ((
  {
    children,
    buttonCaption,
    remove,
    stopRemove,
  }, ref) => {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    }
  })

  return (
    createPortal(<dialog ref={dialog} className='backdrop:bg-stone-900/90 p-4 rounded-md shadow-md'>
      {children}
      <form method='dialog' className='mt-4 text-right'>
        {remove ? (
          <>
            <Button
              onClick={stopRemove}
              className="px-4 py-2 mx-1 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
            >No</Button>
            <Button
              onClick={remove}
              className="px-4 py-2 mx-1 text-xs md:text-base rounded-md bg-stone-700 text-red-400 hover:bg-red-600 hover:text-stone-100"
            >Yes</Button>
          </>
        ) : (<Button className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
        >{buttonCaption}</Button>)}
      </form>
    </dialog>, document.getElementById('modal-root'))
  );
});