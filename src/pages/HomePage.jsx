import React, { useEffect, useState } from 'react'
import  appwriteService  from '../appwrite/dbConfig'
import Container from "../components/container/Container"
import PostCard from "../components/PostCard"
import { Query } from 'appwrite';
import { useSelector } from 'react-redux';
function HomePage() {
    const { status: isLoggedIn, userData } = useSelector(state => state.auth)

    const [posts ,setPosts] = useState(null)
    
    useEffect(() => {
        const baseQuery = [Query.equal("status", "active")];
        if (isLoggedIn && userData?.$id) {
            baseQuery.push(Query.equal("userId", userData.$id));
        }
        appwriteService.getPosts(baseQuery).then((posts)=>{
          if(posts){
            setPosts(posts.documents)
          } else {
            setPosts([])
          }
        })  
    }, [])  
    if (posts?.length === 0) {
      const heading = isLoggedIn ? `Welcome ${userData?.name || userData?.email || ''}!` : 'Login to read posts';
      return (
          <div className="w-full py-8 mt-4 text-center">
              <Container>
                  <div className="flex flex-wrap">
                      <div className="p-2 w-full">
                          <h1 className="text-2xl font-bold hover:text-gray-500">
                              {heading}
                          </h1>
                      </div>
                  </div> 
              </Container>
          </div>
      )
  }

    
    
  return (
    <div className='w-full py-8'>
    <Container>
        <div className='flex flex-wrap'>
            {posts?.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...post} />
                        
                </div>
            ))}
        </div>
    </Container>
</div>
)

}

export default HomePage
