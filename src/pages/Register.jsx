import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { useNavigate } from "react-router-dom";
import { regiterUser } from "../services/authServices";
import { useMutation } from "@tanstack/react-query";
import Select from "../common/Select";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "owner",
  });

  const options = [
    {label:"Admin", value:"admin"},
    {label:"Restaurant Owner", value:"owner"}
  ]

  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.name)
    console.log(e.target.value)
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
    console.log('form', form)
  };

  const { mutate } = useMutation({
    mutationFn: regiterUser,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: (data) => {
        navigate("/");
      },
      onError: (err) => {
        console.log("error while login");
      },
    });
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

        <Select lable="Role" option={options} value={form.role} onChange = {handleChange} name="role"></Select>
        <Button text="Register" type="submit"></Button>
      </form>
    </div>
  );
};
export default Register;
