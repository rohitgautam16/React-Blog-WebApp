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
                <div className="max-w-7xl w-full flex items-center">
                  <div className="w-1/2 pr-8">
                    <h1 className="text-6xl font-bold mb-6">Human stories & ideas</h1>
                    <p className="text-xl text-gray-600 mb-8">A place to read, write, and deepen your understanding</p>
                    <Button 
                     size="lg"
                     onClick={() => navigate('/login')}
                    >Start reading</Button>
                  </div>
                  <div className="w-1/2">
                    <img src={homeImg} alt="Decorative image" className="w-full h-auto object-cover" />
                  </div>
                </div>
              </main>
              {/* <footer className="py-4 px-6 text-center text-sm text-gray-500">
                <div className="flex justify-center space-x-4">
                  <a href="#" className="hover:text-gray-900">Help</a>
                  <a href="#" className="hover:text-gray-900">Status</a>
                  <a href="#" className="hover:text-gray-900">About</a>
                  <a href="#" className="hover:text-gray-900">Careers</a>
                  <a href="#" className="hover:text-gray-900">Blog</a>
                  <a href="#" className="hover:text-gray-900">Privacy</a>
                  <a href="#" className="hover:text-gray-900">Terms</a>
                </div>
              </footer> */}
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