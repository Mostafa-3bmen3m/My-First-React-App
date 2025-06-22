import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const LoginBtn = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const updateUser = () => {
      const isLoggedIn = window.localStorage.getItem('isLoggedIn');
      const userData = window.localStorage.getItem('user');
      if (isLoggedIn && userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };
    updateUser();
    window.addEventListener('userLogin', updateUser);
    window.addEventListener('userLogout', updateUser);
    return () => {
      window.removeEventListener('userLogin', updateUser);
      window.removeEventListener('userLogout', updateUser);
    };
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('userLogout'));
    window.location.reload();
  };

  if (user) {
    return (
      <button className="head-btn cursor-pointer" onClick={handleLogout} title="Logout">
        {user.username}
      </button>
    );
  }

  return (
    <Link to={'/loginpage'}>
      <button className='border-2  p-3 cursor-pointer'>Login</button>
    </Link>
  )
}

export default LoginBtn