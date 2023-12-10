export const Input = ({ label, textarea, ...props }) => {

  return (
    <p>
      <label>{label}</label>
      {textarea ? <textarea {...props}/> : <input {...props}/>}
    </p>
  )
}