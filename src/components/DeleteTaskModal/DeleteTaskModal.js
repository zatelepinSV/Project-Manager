import { createPortal } from "react-dom";
import { forwardRef, useRef, useImperativeHandle } from "react";

export const DeleteTaskModal = forwardRef (({ onConfirm, onCancel }, ref) => {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open :() => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className='backdrop:bg-stone-900/90 p-4 rounded-md shadow-md'>
      <div className='text-right'>
        <h2 className='text-xl font-bold text-stone-700 my-4'>Are you sure?</h2>
        <p className='my-4'>Do you really want to remove this Task?</p>
        <div>
          <button onClick={onCancel} className="px-4 py-2 mx-1 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100">
            No
          </button>
          <button onClick={onConfirm} className="px-4 py-2 mx-1 text-xs md:text-base rounded-md bg-stone-700 text-red-400 hover:bg-red-600 hover:text-stone-100">
            Yes
          </button>
        </div>
      </div>
    </dialog>,
    document.getElementById('modal-root')
  );
});