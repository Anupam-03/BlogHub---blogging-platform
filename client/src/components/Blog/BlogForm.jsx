import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { Button } from '@material-tailwind/react';


const defaultBlogForm = {
    title: "",
    category: "",
    content: "",
}

const BlogForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(defaultBlogForm);

    const { authorizationToken } = useAuth();

    const handleInput = (e) => {
        const { name, value } = e.target;

        setBlog((prev) => ({ ...prev, [name]: value }));
    };

    // useEffect(() => {
    //     if (id) {
    //         const fetchPost = async () => {
    //             const { data } = await axios.get(`/api/posts/${id}`);
    //             setTitle(data.title);
    //             setContent(data.content);
    //             setCategory(data.category);
    //         };

    //         fetchPost();
    //     }
    // }, [id]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
                    method: "GET"
                });

                if (response.ok) {
                    const data = await response.json();
                    setBlog(data);
                    // toast.success("Blog post successfully");
                    console.log("Editing blog");
                    console.log(data);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const postData = { title, content, category };

        if (id) {
            try {
                const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': authorizationToken
                    },
                    body: JSON.stringify(blog),
                });

                if (response.ok) {
                    setBlog(defaultBlogForm);
                    const data = await response.json();
                    console.log(data);

                    // toast.success("Blog post successfully");
                    console.log("Blog edited successfully");
                }
            } catch (error) {
                console.log(error.message)
            }

            // await axios.put(`/api/posts/${id}`, postData);
        } else {
            try {
                const response = await fetch("http://localhost:8080/api/posts", {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': authorizationToken
                    },
                    body: JSON.stringify(blog),
                });

                if (response.ok) {
                    setBlog(defaultBlogForm);
                    const data = await response.json();
                    console.log(data);

                    // toast.success("Blog post successfully");
                    console.log("Blog post successfully");
                }
            } catch (error) {
                console.log(error)
            }


            // await axios.post('/api/posts', postData);
        }

        navigate('/');
    };

    return (
        <>
            <main>
                <section className="section-contact">
                    <div className="contact-content container">
                        <h1 className="main-heading">{id ? 'Update' : 'Create'} Blog</h1>
                    </div>

                    {/* contact page main  */}
                    <div className="container grid grid-two-cols">
                        <div className="contact-image">
                            {/* <img
                                src="/images/support.png"
                                alt="we are always ready to help"
                                width="500"
                                height="500"
                            /> */}
                        </div>

                        {/* contact form content actual  */}
                        <section className="section-form">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder='Enter Title'
                                        autoComplete="off"
                                        value={blog.title}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="category">category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        id="category"
                                        placeholder='Enter Category'
                                        autoComplete="off"
                                        value={blog.category}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="content">Write Content</label>
                                    <textarea
                                        name='content'
                                        id='content'
                                        autoComplete='off'
                                        value={blog.content}
                                        onChange={handleInput}
                                        required
                                        cols="12"
                                        rows="5" />
                                </div>
                                <div className='flex justify-center items-center h-screen'>
                                    {/* <Button type='submit'>submit</Button> */}
                                    <Button type="submit">{id ? 'Update' : 'Create'} Post</Button>
                                </div>
                            </form>
                        </section>
                    </div>
                </section>
            </main>
        </>
    );

    // return (
    //     <form onSubmit={handleSubmit}>
    //         <input
    //             type="text"
    //             placeholder="Title"
    //             value={title}
    //             onChange={(e) => setTitle(e.target.value)}
    //         />
    //         <textarea
    //             placeholder="Content"
    //             value={content}
    //             onChange={(e) => setContent(e.target.value)}
    //         ></textarea>
    //         <input
    //             type="text"
    //             placeholder="Category"
    //             value={category}
    //             onChange={(e) => setCategory(e.target.value)}
    //         />
    //         <button type="submit">{id ? 'Update' : 'Create'} Post</button>
    //     </form>
    // );


};

export default BlogForm;
