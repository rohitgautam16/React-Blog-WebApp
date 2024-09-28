import React, { useEffect, useState} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'
import { Button } from '@/components/ui/button'
import homeImg from '../assets/home-img.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts){
                setPosts(posts.documents)
            }
        })
    },[])

const navigate = useNavigate();    

    if (posts.length === 0){
      return (
        <div className="min-h-screen flex flex-col bg-white">
          <main className="flex-grow flex items-center justify-center px-4 py-12">
            <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center">
              {/* Text Section */}
              <div className="lg:w-1/2 w-full pr-8 pl-8 mb-8 lg:mb-0">
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-center lg:text-left">Human stories & ideas</h1>
                <p className="text-lg lg:text-xl text-gray-600 mb-8 text-center lg:text-left">A place to read, write, and deepen your understanding</p>
                <div className="flex justify-center lg:justify-start">
                  <Button 
                    size="lg"
                    onClick={() => navigate('/login')}
                  >
                    Start reading
                  </Button>
                </div>
              </div>
              {/* Image Section */}
              <div className="lg:w-1/2 w-full">
                <img src={homeImg} alt="Decorative image" className="w-full h-auto object-cover" />
              </div>
            </div>
          </main>
        </div>
      );
      
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home