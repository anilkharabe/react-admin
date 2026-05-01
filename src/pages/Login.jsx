import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authServices";
import { useDispatch } from "react-redux";
import {setCredentials} from '../redux/authSlice';
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const {mutate} = useMutation({
    mutationFn: loginUser
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // we can make API request
      // const data = await loginUser(form);

      mutate(form, {
        onSuccess:(data)=>{
          dispatch(setCredentials(data.data))
          navigate("/dashboard");
        },
        onError:(err)=>{
          console.log('error while login')
        }
      })
    } catch (error) {
        console.error('Login error', error)
    }
  };

  return (
    <div className="flex items-center justify-center py-5 bg-gray-300">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl">Login</h2>
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
        <Button text="Login" type="submit"></Button>
        <p className="mt-5 text-sm">
           Don't Have an account
           <Link className="p-5 font-bold text-blue-400" to='/register'>Register</Link> 
        </p>
      </form>
    </div>
  );
};
export default Login;
