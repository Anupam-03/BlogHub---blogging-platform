import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await axios.get('/api/categories');
            setCategories(data);
        };

        fetchCategories();
    }, []);

    return (
        <div>
            {categories.map((category) => (
                <div key={category._id}>
                    <h3>{category.name}</h3>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
