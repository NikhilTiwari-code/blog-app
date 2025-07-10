import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AllPosts from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
 
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        )
      },
      {
        path: "/allposts", 
        element: (
            <AuthLayout authentication = {true}>
                <AllPosts />
            </AuthLayout>
        ),
    },
    {
        path: "/addpost",
        element: (
            <AuthLayout authentication = {true}>
                <AddPost />
            </AuthLayout>
        ),
    },
    {
        path: "/editpost/:slug",
        element: (
            <AuthLayout authentication = {true}>
                <EditPost />
            </AuthLayout>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },
    ] 
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
   <RouterProvider router={router} />
  </Provider>
  </StrictMode>,
) 
