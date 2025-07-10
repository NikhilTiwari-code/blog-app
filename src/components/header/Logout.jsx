import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice.js";
import {authService} from "../../appwrite/auth";   
import { useNavigate } from "react-router-dom";
import Button from "../Button";


function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
   
    const handleLogout = () => {
        authService.logout()
        .then(() => {
            dispatch(logout())
            navigate('/login')
        })
        .catch((error) => {
            console.log("Appwrite error while logging out", error ,"in logout button")
        })
        
    }

    return (
        <div>
            <Button
            className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 
            rounded-full"
            onClick={handleLogout}
            >Logout</Button>
        </div>
    )
}
export default LogoutBtn
