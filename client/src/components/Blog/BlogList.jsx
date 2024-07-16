import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const BlogList = ({ posts, showFiltered = false }) => {

    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/posts", {
                    method: "GET"
                });

                if (response.ok) {
                    const data = await response.json();
                    setAllPosts(data);
                    // toast.success("Blog post successfully");
                    console.log("Showing Blogs");
                }
                // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const displayedPosts = showFiltered ? posts || [] : allPosts;


    return (
        <div>
            {displayedPosts.map((post) => (
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.content.substring(0, 100)}...</p>
                    <NavLink to={`/posts/${post._id}`}>Read more</NavLink>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
