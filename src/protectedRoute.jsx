import { Navigate } from "react-router-dom";


// token => already login, protected routes access
// no token => public pages like register and login

const ProtectedRoute = ({children})=>{

    const token = sessionStorage.getItem('token');
    if(!token){
        return <Navigate to="/" />
    }

    return children;
}

export default ProtectedRoute