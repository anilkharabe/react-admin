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

// <Select option={options} value={form.role} onChange = {handleChange} name="Role"></Select>



{/* <select name="role" value={form.role} onChange={handleChange}>
    <option value="">Select Role</option>
    <option value="admin">Admin</option>
    <option value="res_owner">Restaurant Owner</option>
</select> */}