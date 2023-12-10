import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export const Modal = forwardRef (({ children }, ref) => {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    }
  })

  return (
    createPortal(<dialog ref={dialog}>
      {children}
    </dialog>, document.getElementById('modal-root'))
  );
});