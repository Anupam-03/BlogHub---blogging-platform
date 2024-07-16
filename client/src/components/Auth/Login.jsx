import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function Login () {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        })
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const { data } = await axios.post('/api/auth/login', { email, password });
    //         console.log(data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(user)
            });

            const res_data = await response.json();
            if (response.ok) {
                console.log("res from server", res_data);

                // stored the token in localhost
                storeTokenInLS(res_data.token);

                toast.success("Login Successful");
                setUser({ email: "", password: "" });
                navigate("/");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                console.log("Invalid Credential");
            }
            console.log(response)
        } catch (error) {
            console.log("login", error);
        }
    }

    return (
        <>
            <section>
                <main>
                    <div className='section-registration'>
                        <div className='container grid grid-two-cols'>
                            <div className='login-image'>
                                {/* <img src="/images/login.png" alt="" width="500" height="500" /> */}
                            </div>

                            <div className='registration-form'>
                                <h1 className='main-heading md-3'>login form</h1>
                                <br />

                                <form onSubmit={handleSubmit}>
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
                                        Login Now
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );

    // return (
    //     <form onSubmit={handleSubmit}>
    //         <input
    //             type="email"
    //             placeholder="Email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <input
    //             type="password"
    //             placeholder="Password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <button type="submit">Login</button>
    //     </form>
    // );
};

export default Login;
