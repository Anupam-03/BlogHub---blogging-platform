// import React, { useContext } from 'react';

// const Profile = () => {
//     const { user } = useAuth();
//     console.log(user);

//     return (
//         <div>
//             <h1>Profile</h1>
//             {user ? (
//                 <div>
//                     <p>Name: {user.username}</p>
//                     <p>Email: {user.email}</p>
//                 </div>
//             ) : (
//                 <p>Please login to view your profile</p>
//             )}
//         </div>
//     );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { login, authorizationToken } = useAuth();
    const [getUser, setUser] = useState('');
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/users/profile", {
                    method: 'GET',
                    headers: {
                        "Authorization": authorizationToken,
                    }
                });
                // const { data } = await axios.put('/api/users/profile', { name, email, password }, config);

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setUser(data);
                    setMessage('Profile Showing successfully');
                }
            } catch (error) {
                setMessage(error.response.data.message || 'Error showing profile');
            }
        };

        fetchUser();
    }, []);

    // if (user) {
    //     setName(user.name);
    //     setEmail(user.email);
    // }

    const handleInput = (e) => {
        const { name, value } = e.target;

        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/users/profile", {
                method: 'Put',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": authorizationToken,
                },
                body: JSON.stringify(getUser),
            });
            // const { data } = await axios.put('/api/users/profile', { name, email, password }, config);

            if (response.ok) {
                const data = await response.json();
                // login(data);
                setUser(data);
                console.log(data)
                setMessage('Profile updated successfully');
            }
        } catch (error) {
            setMessage(error.response.data.message || 'Error updating profile');
        }
    };

    return (
        <div>
            <h1>Profile</h1>
            {message && <p>{message}</p>}
            {getUser ? (
                <form onSubmit={handleUpdate}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={getUser.name}
                            onChange={handleInput}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={getUser.email}
                            onChange={handleInput}
                        />
                    </div>
                    <button type="submit">Update Profile</button>
                </form>
            ) : (
                <p>Please login to view and update your profile</p>
            )}
        </div>
    );
};

export default Profile;

