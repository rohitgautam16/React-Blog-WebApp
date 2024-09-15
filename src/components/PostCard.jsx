import React,{useEffect} from 'react'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'

const PostCard = ({$id, title, featuredImage}) => {
  useEffect(() => {
    console.log('Post ID:', $id);
  }, [$id]);


  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
            {featuredImage ? (
                <img
                  src={appwriteService.getFilePreview(featuredImage)}
                  alt={title}
                  className='rounded-xl'
                />
              ) : (
                <p>No image available</p> // Fallback if there’s no featured image
              )}
            </div>
             <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard