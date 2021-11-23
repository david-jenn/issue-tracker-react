function TextAreaField({ label, id, name, className, rows, value, ...rest }) {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>{label}</label>
      <textarea name={name} id={id} className="form-control" rows={rows} value={value} {...rest}></textarea>
    </div>
  );
}

export default TextAreaField;
