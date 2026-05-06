const Select = ({ lable, option = [], value, onChange, name }) => {
  return (
    <div>
      <select name={name} value={value} onChange={onChange}>
        <option value="">Select {lable}</option>

        {option.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;