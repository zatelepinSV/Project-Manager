import { forwardRef, useImperativeHandle, useRef } from "react";

export const Input = forwardRef (({ label, isValid, textarea, ...props }, ref) => {
  const inputRef = useRef();
  const classes = 'w-full p-1 border-b-2 rounded-sm border-stone-300 text-stone-600 focus:outline-none focus:border-stone-600';
  const invalid = isValid === false ? 'bg-red-200' : 'bg-stone-200';
  // console.log(invalid);

  // useImperativeHandle(ref, () => {
  //   return {
  //     focus () {
  //       inputRef.current.focus();
  //     }
  //   }
  // })

  return (
    <p className='flex flex-col gap-1 my-4'>
      <label className='text-sm font-bold uppercase text-stone-500'>{label}</label>
      {textarea ? (
        <textarea ref={ref} className={`${classes} ${invalid}`} {...props}/>
      ) : (
        <input ref={ref} className={`${classes} ${invalid}`} {...props}/>
      )}
    </p>
  );
});