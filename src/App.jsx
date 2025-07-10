
import './App.css'
import {authService} from "./appwrite/auth"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/footer/Footer"
import { login, logout } from "./store/authSlice"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  

  /*

  useEffect(() => {
  const getCurrentUser = async () => {
      try {
        const user = await AuthService.getCurrentUser()
        if(user) {
          dispatch(setUser(user))
        }
      } catch (error) {
        console.error("App :: getCurrentUser :: error", error)
      } finally {
        setLoading(false)
      }
    }
    getCurrentUser()
  },[])
  */
  useEffect(() => {
    authService.getCurrentUser()
    .then((user) => {
      if(user) {
        dispatch(login(user))
      }else{
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.error("App :: getCurrentUser :: error", error)
    })
    .finally(() => {
      setLoading(false)
    })
  },[])

  return !loading ? (
      <div className='min-h-screen flex flex-wrap 
      content-between bg-white text-black w-full p-5'>
        <div className="w-full">
          <Header />  
          <main className='w-full block'>
            <Outlet />
          </main>
          <Footer />
        </div>
       
      </div> 
  ) : null
}

export default App
