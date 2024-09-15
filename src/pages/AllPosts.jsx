import React, {useState, useEffect} from 'react'
import appwriteService from '../appwrite/config'
import { PostCard, Container } from '../components'

const AllPost = () => {
    const [post, setPosts] = useState([])
    useEffect(() => {},[])
    appwriteService.getPosts([]).then((posts) => {
        if (posts){
            setPosts(posts.documents)
        }
    })

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {post.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard post={post}  $id={post.$id}  title={post.title} featuredImage={post.featuredImage} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPost