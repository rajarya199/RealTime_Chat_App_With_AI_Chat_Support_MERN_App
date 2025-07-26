import React, { useState, useEffect } from 'react';
import { UserContext } from './user.context'; 
import axios from '../config/axios'; 

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); 

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoadingUser(false); // No token, no user to load
        return;
      }

      try {
        const res = await axios.get('/users/profile', {
          // headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
      } catch (err) {
        console.error('Failed to load user from /profile:', err.response?.data || err.message);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoadingUser(false); 
      }
    };

    loadUser();
  }, []); 
  if (loadingUser) {
    return <div>Loading user...</div>; 
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
