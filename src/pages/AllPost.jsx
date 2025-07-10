import React, {useState, useEffect} from 'react';
import  Container from '../components/container/Container';
import appwriteService from "../appwrite/dbConfig";
import { Query } from 'appwrite';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';

function AllPosts() {
    const { status: isLoggedIn, userData } = useSelector(state => state.auth);
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const baseQuery = [Query.equal("status", "active"), Query.equal("userId", userData.$id)];
        if (isLoggedIn && userData?.$id) {
            baseQuery.push(Query.equal("userId", userData.$id));
        }
        appwriteService.getPosts(baseQuery).then((posts) => {
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