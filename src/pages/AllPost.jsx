import React, {useState, useEffect} from 'react'
import  Container from '../components/container/Container'
import appwriteService from "../appwrite/dbConfig";
import { Query } from 'appwrite';
import PostCard from '../components/PostCard'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([Query.equal("status", "active")]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
   return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
   )
}

export default AllPosts