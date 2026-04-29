import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
const Login = ()=>{

    const [form, setForm] = useState({
        email:"anil@gmail.com",
        password:"password"
    })

    const handleSubmit =()=>{
        console.log('handleSubmit is clicked');
    }

    return(
        <div className="flex items-center justify-center py-5 bg-gray-300">
            <form onSubmit={handleSubmit}>
                <h2 className="text-xl">Login</h2>
                <Input label="Email" name='email' value={form.email}></Input>
                <Input label="Password" name='password' type='password' value={form.password}></Input>
            </form>
        </div>
    )
}
export default Login;
