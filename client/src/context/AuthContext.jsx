import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    // const [isLoading, setIsLoading] = useState(true);

    const authorizationToken = `Bearer ${token}`;

    // function to stored the token in local storage
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem('token', serverToken);
    };

    // This is the get the value in either true or false in the original state of token
    let isLoggedIn = !!token;
    console.log("isLoggedIn", isLoggedIn);
    console.log("token", token);

    const login = (userData) => {
        setUser(userData);
    };

    // to check whether is loggedIn or not
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem('token');
    }

    // JWT Authentication - to get currently login user data

    const userAuthentication = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:8080/api/users/profile",
                {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    },
                });

            if (response.ok) {
                const data = await response.json();
                console.log("user data", data.userData);
                setUser(data.userData);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }

        } catch (error) {
            console.log("Error fetching user data");
        }
    };

    return (
        <AuthContext.Provider value={{ user, storeTokenInLS, login, LogoutUser, isLoggedIn, authorizationToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }

    return authContextValue;
}
