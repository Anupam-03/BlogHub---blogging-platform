import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
                    method: "GET"
                });

                if (response.ok) {
                    const data = await response.json();
                    setPost(data);
                    // toast.success("Blog post successfully");
                    console.log("Showing a Blog");
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPost();
    }, [id]);

    return (
        <div>
            <h1>{post.title}</h1>
            <p>Category: {post.category}</p>
            <p>{post.content}</p>
            <NavLink to={`/posts/edit/${post._id}`}>Edit</NavLink>
        </div>
    );

    // return (
    //     <>
    //         <main>
    //             <section className="section-contact">
    //                 <div className="contact-content container">
    //                     <h1 className="main-heading">{id ? 'Update' : 'Create'} Blog</h1>
    //                 </div>

    //                 {/* contact page main  */}
    //                 <div className="container grid grid-two-cols">
    //                     <div className="contact-image">
    //                         {/* <img
    //                             src="/images/support.png"
    //                             alt="we are always ready to help"
    //                             width="500"
    //                             height="500"
    //                         /> */}
    //                     </div>

    //                     {/* contact form content actual  */}
    //                     <section className="section-form">
    //                         <form onSubmit={handleSubmit}>
    //                             <div>
    //                                 <label htmlFor="title">Title</label>
    //                                 <input
    //                                     type="text"
    //                                     name="title"
    //                                     id="title"
    //                                     placeholder='Enter Title'
    //                                     autoComplete="off"
    //                                     value={blog.title}
    //                                     onChange={handleInput}
    //                                     required
    //                                 />
    //                             </div>

    //                             <div>
    //                                 <label htmlFor="category">category</label>
    //                                 <input
    //                                     type="text"
    //                                     name="category"
    //                                     id="category"
    //                                     placeholder='Enter Category'
    //                                     autoComplete="off"
    //                                     value={blog.category}
    //                                     onChange={handleInput}
    //                                     required
    //                                 />
    //                             </div>

    //                             <div>
    //                                 <label htmlFor="content">Write Content</label>
    //                                 <textarea
    //                                     name='content'
    //                                     id='content'
    //                                     autoComplete='off'
    //                                     value={blog.content}
    //                                     onChange={handleInput}
    //                                     required
    //                                     cols="12"
    //                                     rows="5" />
    //                             </div>
    //                             <div>
    //                                 {/* <button type="submit">submit</button> */}
    //                                 <button type="submit">{id ? 'Update' : 'Create'} Post</button>
    //                             </div>
    //                         </form>
    //                     </section>
    //                 </div>
    //             </section>
    //         </main>
    //     </>
    // );


};

export default BlogPost;
