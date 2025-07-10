import React from 'react'
import {Link} from 'react-router-dom'
import appwriteService  from '../appwrite/dbConfig'

// function PostCard({$id, title, featuredImage}) { // WRONG: Prop name 'featuredImage' was a typo.
function PostCard({$id, title, featureImage}) { // FIX: Corrected to 'featureImage' for consistency.
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                                {/* <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl' /> */}
                {/* WRONG: This would crash if a post has no image, as 'featuredImage' would be undefined. */}
                {/* FIX: Added a check to render the image only if 'featureImage' exists. */}
                {featureImage && <img src={appwriteService.getFilePreview(featureImage)} alt={title} className='rounded-xl' />}
            </div> 
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard