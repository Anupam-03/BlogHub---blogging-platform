import React from 'react';
import { NavLink } from 'react-router-dom';
import "./header.css";
import { useAuth } from '../../context/AuthContext';

const Header = () => {

    const { isLoggedIn, user } = useAuth();
    console.log("login or not", isLoggedIn);

    return (
        <>
            <header>
                <div className='container'>
                    <div className='logo-brand'>
                        <NavLink to="/">Anupam's Blogging platform</NavLink>
                    </div>

                    <nav>
                        <ul>
                            <li> <NavLink to="/"> Home </NavLink> </li>
                            <li> <NavLink to="/search"> Search </NavLink> </li>
                            {isLoggedIn ? (
                                <>
                                    <li> <NavLink to="/profile"> Profile  </NavLink> </li>
                                    <li> <NavLink to="/posts/create"> Create Post </NavLink> </li>
                                    {/* <li> <NavLink to="/posts/edit/:id"> Edit Post </NavLink> </li> */}
                                    <li> <NavLink to="/logout"> Logout </NavLink> </li>
                                </>
                            ) : (
                                <>
                                    <li> <NavLink to="/register"> Register </NavLink> </li>
                                    <li> <NavLink to="/login"> Login </NavLink> </li>
                                </>
                            )}
                            {user.isAdmin ? (
                                <li> <NavLink to="/admin"> Admin </NavLink> </li>
                            ) : (<></>)}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header;
