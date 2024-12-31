import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../context/User.context";

export default function ProtectedRoute({ children }) {
   let{token}=useContext(userContext)
    if (token) {
        return children
    } else {
        return <Navigate to="/login" />
    }
}