import './Checkbox.css';

function Checkbox({ value, onChange, name, titleOnTrue, titleOnFalse }) {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        name={name}
        className="checkbox__system-checkbox"
      />
      <span className="checkbox__label">
        {value ? titleOnTrue : titleOnFalse}
      </span>
    </label>
  );
}

export default Checkbox;
