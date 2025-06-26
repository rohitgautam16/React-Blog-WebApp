import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { PostCard, Container } from '../components';

const AllPost = () => {
    const [posts, setPosts] = useState([]); // State to store posts

    // Fetch posts on component mount
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await appwriteService.getPosts(); // Fetch all posts
                if (response) {
                    setPosts(response.documents); // Update state with fetched posts
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div className='w-full py-8 bg-cream min-h-[600px] lg:flex lg:min-h-screen'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard 
                                    post={post} 
                                    $id={post.$id} 
                                    title={post.title} 
                                    featuredImage={post.featuredImage} 
                                />
                            </div>
                        ))
                    ) : (
                        <p className='text-center w-full'>No posts available</p>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default AllPost;
