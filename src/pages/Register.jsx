import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { useNavigate } from "react-router-dom";
import { regiterUser } from "../services/authServices";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("form data", form);
    const data = await regiterUser(form);
    console.log('register call data', data)
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center py-5 bg-gray-300">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl">Register User</h2>

        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        ></Input>

        <Input
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        ></Input>
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        ></Input>
        <Button text="Register" type="submit"></Button>
      </form>
    </div>
  );
};
export default Register;
