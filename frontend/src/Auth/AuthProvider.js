import React, { createContext, useState, useEffect } from 'react';
import config from '../config';
import { Navigate } from 'react-router-dom';

const API_URL = config.API_URL;

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    if (token && expirationDate) {
      const expirationTime = new Date(expirationDate).getTime() - new Date().getTime();
      if (expirationTime > 0) {
        console.log(expirationTime);
        setIsLoggedIn(true);
        autoLogout(expirationTime);
      } else {
        logout();
      }
    }
  }, []);

  const autoLogout = (expirationTime) => {
    console.log('autoLogout');
    setTimeout(() => {
      logout();
    }, expirationTime);
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Authentication failed');
      }
      const data = await response.json();
  
      localStorage.setItem('token', data.token);
      const expirationDate = new Date(data.expiresIn);
      localStorage.setItem('expirationDate', expirationDate.toISOString()); 
      setIsLoggedIn(true);
      console.log('Login successful');
      return <Navigate to="/add" />;
    } catch (error) {
      console.error(error);
    }
  };
  


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    setIsLoggedIn(false);
  };

  const value = { isLoggedIn, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
