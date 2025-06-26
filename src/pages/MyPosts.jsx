import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { PostCard, Container } from "../components";
import { Query } from "appwrite";


const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData); // Assuming user data is in the redux store

    useEffect(() => {
        if (userData) {
            appwriteService
                .getPosts([
                    // Query to fetch posts created by the logged-in user
                    Query.equal("userId", userData.$id),
                ])
                .then((posts) => {
                    if (posts) {
                        setPosts(posts.documents);
                    }
                })
                .catch((error) => {
                    console.log("Error fetching user posts:", error);
                });
        }
    }, [userData]);

    return (
        <div className="w-full py-8 bg-cream min-h-[600px] lg:flex lg:min-h-screen">
            <Container>
                <div className="flex flex-wrap">
                    {posts.length === 0 ? (
                        <p>No posts found</p>
                    ) : (
                        posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard
                                    post={post}
                                    $id={post.$id}
                                    title={post.title}
                                    featuredImage={post.featuredImage}
                                />
                            </div>
                        ))
                    )}
                </div>
            </Container>
        </div>
    );
};

export default MyPosts;
