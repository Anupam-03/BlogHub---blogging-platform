import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await axios.get('/api/posts');
            setPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <BlogContext.Provider value={{ posts, setPosts }}>
            {children}
        </BlogContext.Provider>
    );
};

export { BlogContext, BlogProvider };

