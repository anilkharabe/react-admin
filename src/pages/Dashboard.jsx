import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Dashboard = ()=>{

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = ()=>{
        dispatch(logout())
        navigate("/");
    }

    return(
       <div className="text-center p-6 m-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-4xl">Welcome to Restaurant Admin Panel</p>
        <Button  text="Logout" onClick = {handleLogout}></Button>
       </div>
    )
}
export default Dashboard;
