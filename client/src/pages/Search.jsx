import React, { useState } from 'react';
import BlogList from '../components/Blog/BlogList';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const [posts, setPosts] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/posts/search?keyword=${keyword}`, {
                method : "GET"
            });
            if(response.ok) {
                const data = await response.json();
                setPosts(data);
                console.log(data);
            }
    
        } catch (error) {
            console.log(error);
        }

        
    };

    return (
        <div>
            <h1>Search</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search posts"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <BlogList posts={posts} showFiltered={true} />
        </div>
    );
};

export default Search;
