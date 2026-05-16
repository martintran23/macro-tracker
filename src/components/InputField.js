function InputField({
  id,
  label,
  type = "number",
  min,
  max,
  step,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="input-group">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-control"
        required
      />
    </div>
  );
}

export default InputField;
