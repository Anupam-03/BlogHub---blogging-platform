import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const URL = `http://localhost:8080/api/auth/register`;

const Register = () => {
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const { storeTokenInLS } = useAuth();

    // handling the input value
    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    // handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });

            const res_data = await response.json();
            console.log("res from server", res_data.extraDetails ? res_data.extraDetails : res_data.message);

            if (response.ok) {

                // stored the token in localhost
                storeTokenInLS(res_data.token);
                console.log("Registration Successful");
                console.log("User Login")
                toast.success("Registration Successful");
                toast.info("User Login")

                setUser({ name: "", email: "", password: "" });
                navigate("/");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
            // console.log(response);
        }
        catch (error) {
            console.log("register", error.message);
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className='section-registration'>
                        <div className='container grid grid-two-cols'>
                            <div className='registration-image reg-img'>
                                {/* <img src="/images/register.png" alt="" width="500" height="500" /> */}
                            </div>
                            <div className='registration-form'>
                                <h1 className='main-heading md-3'>registration form</h1>
                                <br />

                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="name">username</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder='enter your username'
                                            required
                                            autoComplete='off'
                                            value={user.name}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder='enter your email'
                                            id="email"
                                            required
                                            autoComplete='off'
                                            value={user.email}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password">password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder='enter your password'
                                            id="password"
                                            required
                                            autoComplete='off'
                                            value={user.password}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <br />

                                    <button type="submit" className='btn btn-submit'>
                                        Register Now
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//             />
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button type="submit">Register</button>
//         </form>
//     );

};

export default Register;
