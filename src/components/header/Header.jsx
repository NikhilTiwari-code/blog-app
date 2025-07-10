import React from "react";
import { useSelector } from "react-redux";
import LogoutBtn from "./Logout";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "../container/Container";
import Logo from "../../components/Logo";
import { Link } from "react-router-dom";



function Header (){
    const navigate = useNavigate()
    const location = useLocation()
    const authStatus = useSelector((state) => state.auth.status)  
    

    const navItems = [
        {name: "Home", slug: "/", active: true},
        {name: "Login", slug: "/login", active: !authStatus},
        {name: "Signup", slug: "/signup", active: !authStatus},
        {name :"Allposts" ,slug: "/allposts", active: authStatus},
        {name :"Addpost" ,slug: "/addpost", active: authStatus},
        
        // {name :"Editpost" ,slug: "/editpost/:slug", active: authStatus}, // WRONG: This static link was removed because it caused an error. The ':slug' is not a dynamic value here, leading to an invalid URL. The 'Edit' button now correctly lives on the Post page itself.
        
    ]

    return (
        <header
        className="py-3 shadow bg-gray-50 text-black"
        >
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to='/'>
                            <Logo width='120px' />

                            </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) => 
                        item.active ? (
                            <li key={item.name}>
                                <button
                                onClick={() => navigate(item.slug)}
                                className={`relative inline-block px-4 py-2 font-medium transition-colors ${location.pathname===item.slug ? 'text-blue-600 after:absolute after:inset-x-0 after:-bottom-1 after:border-b-2 after:border-dashed after:border-blue-600' : 'text-gray-700 hover:text-blue-600'}` }
                                style={{minWidth:'80px'}}
                                >
                                {item.name}
                                </button>
                            </li>
                        ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>

        </header>
    
    )

}

 export default Header