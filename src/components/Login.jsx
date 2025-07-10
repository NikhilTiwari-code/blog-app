import React, { useState } from "react";
import Input from "./Input";    
import {authService} from "../appwrite/auth";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, } from "react-redux";
import { login } from "../store/authSlice.js";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Login(){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const {register,handleSubmit} = useForm()
    const[error,setError] = useState('')

    const handleLogin = async (data) => {
        try {
            setError('')
            const session =await authService.login(data)
            if(session){
               const userData = await authService.getCurrentUser()
               if (userData) {
                dispatch(login(userData))
                navigate('/')
                }
            }
        } 
        catch (error) {
          console.log("Appwrite error while logging in", error ,"in login page")
          setError(error.message)
        }
    }   
    return(
        <div>
            <h2 className="text-center text-2xl font-bold leading-tight">
                Sign in to your account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration- 
                        200 hover:underline"
                    >
                    Sign Up
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8">{error}</p>} 

            {/* react-hook-form starts from here */}
            <form onSubmit={handleSubmit(handleLogin)}>
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    {...register('email',{
                        required: true,
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address"
                        }
                    })}
                />
                <Input
                    label="Password"    
                    type="password"
                    placeholder="Enter your password"
                    {...register('password', {required: true})}
                />
                <Button type="submit" bgColor="bg-transparent" textColor="text-blue-500">Login</Button>
            </form>
        </div>
    )
}

export default Login
