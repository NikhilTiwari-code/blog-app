import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../appwrite/auth";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "./Button";



function Signup(){

    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()

    const handleSignup = async (data) => {
        setError('')    
        try {
            const user = await authService.createAccount(data)
            console.log("User created successfully", user)
            if(user){
               const userData = await authService.getCurrentUser()
              if (userData) {
                dispatch(login(userData))
                navigate('/')
              }
            }
            navigate('/')
        } catch (error) {
          console.log("Appwrite error while creating account", error ,
            "in signup page")
          setError(error.message)
        }
    }
    return (
        <div>
            <h2 className="text-center text-2xl font-bold leading-tight">
                Sign Up to create account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all 
                    duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            
            <form onSubmit={handleSubmit(handleSignup)}>
            <Input
                label="Name"
                type="text"
                placeholder="Enter your name"
                {...register('name',{required: true,})}
            />
            <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...register('email',{required: true,
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
                {...register('password',{required: true,})}
            />
            <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default Signup
