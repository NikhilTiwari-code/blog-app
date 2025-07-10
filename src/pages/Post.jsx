import React ,{useState,useEffect}from "react";
import {Link,useNavigate,useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Button from "../components/Button"
import Container from "../components/container/Container"
import Service from "../appwrite/dbConfig";
 import parse from "html-react-parser"; 

export default function Post (){
   
    const [post,setPosts] = useState(null)
    const {slug} =useParams()
    const navigate = useNavigate()

        // const userDate = useSelector((state)=>state.auth.userDate) // WRONG: 'userDate' was a typo.
    // const isAuthor = post && userDate? post.userId === userDate.$id : false
    const userData = useSelector((state) => state.auth.userData); // FIX: Corrected to 'userData' to correctly identify the author.
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if(slug){
            Service.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }else{
                    navigate("/")
                }
            })
        }
    }, [slug,navigate])

    const deletePost =()=>{
        Service.deletePost(post.$id).then((status)=>{
            if(status){
            // Service.deleteFile(post.avatar) // WRONG: 'post.avatar' is not the correct property for the image.
                Service.deleteFile(post.featureImage) // FIX: Changed to 'post.featureImage' to correctly reference the image for deletion.
                navigate("/")
                }
            }
        )
    }
    
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border 
                 rounded-xl p-2"
                >
                    <img
                     // src={Service.getFilePreview(post.avatar)} // WRONG: 'post.avatar' is not the correct property for the image.
                        src={Service.getFilePreview(post.featureImage)} // FIX: Changed to 'post.featureImage' to display the correct image.
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 bg-white/80 backdrop-blur-sm p-1 rounded-md">
                                                        {/* <Link to={`/edit-post/${post.$id}`}> */}
                            {/* WRONG: The path '/edit-post/' did not match the route '/editpost/' defined in main.jsx. */}
                            <Link to={`/editpost/${post.$id}`}> {/* FIX: Corrected the link to match the defined route. */}
                                <Button bgColor="bg-blue-500" textColor="text-blue-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-blue-500" textColor="text-blue-500" className="border border-blue-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;

}
