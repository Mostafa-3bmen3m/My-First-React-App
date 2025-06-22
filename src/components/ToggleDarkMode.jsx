import React, { useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import LoginBtn from './LoginBtn';

const ToggleDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    useEffect(() => {
        const isLoggedIn = window.localStorage.getItem('isLoggedIn');
        const userData = window.localStorage.getItem('user');
        if (isLoggedIn && userData) {
            setUser(JSON.parse(userData));
        } else {
            setUser(null);
        }
    }, []);

    const Toggle = () => {
        setIsDarkMode(!isDarkMode);
    }

    const handleLogout = () => {
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('isLoggedIn');
        window.location.reload();
    }

  return (
    <div className='fixed flex gap-3 top-5 right-5 z-10'>
        {user ? (
            <button className="head-btn cursor-pointer" onClick={handleLogout} title="Logout">
                {user.username}
            </button>
        ) : (
            <LoginBtn/>
        )}
        <button onClick={Toggle} className='darkmodebtn'>
            {isDarkMode ? "Dark Theme" : "Light Theme"}
        </button>
    </div>
  )
}

export default ToggleDarkMode