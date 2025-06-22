import React, { useEffect, useState } from 'react'
import Movies from './components/Movies'
import Hero from './components/Hero'
import ToggleDarkMode from './components/ToggleDarkMode'
import CardPage from './pages/CardPage'
import { Routes, Route } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import LikedMoviesPage from './pages/LikedMoviesPage'
import WatchingListPage from './pages/WatchingListPage'
import OpinionsSlider from './components/OpinionsSlider'
import FormSection from './components/FormSection'
import LoginPage from './pages/LoginPage'

const initialOpinions = [
  { name: 'Alice Smith', email: 'alice@example.com', comment: 'Amazing website! The UI is super clean and easy to use.' },
  { name: 'Bob Johnson', email: 'bob@example.com', comment: 'I love the dark mode feature. Great job!' },
  { name: 'Charlie Lee', email: 'charlie@example.com', comment: 'The movie selection is fantastic. I found all my favorites.' },
  { name: 'Diana Prince', email: 'diana@example.com', comment: 'Fast and responsive. The best movie app I have used.' },
  { name: 'Ethan Hunt', email: 'ethan@example.com', comment: 'I appreciate the ability to save my favorite movies.' },
];

const App = () => {
  const [likedMovies, setLikedMovies] = useLocalStorage('likedMovies', []);
  const [selectedMovies, setSelectedMovies] = useLocalStorage('selectedMovies', []);
  const [opinions , setOpinions] = useLocalStorage("opinions" , initialOpinions);
  const [user, setUser] = useState(null);

  const loadUserMovies = (userObj) => {
    if (userObj) {
      const userLikedKey = `likedMovies_${userObj.username}`;
      const userSelectedKey = `selectedMovies_${userObj.username}`;
      setLikedMovies(JSON.parse(window.localStorage.getItem(userLikedKey) || '[]'));
      setSelectedMovies(JSON.parse(window.localStorage.getItem(userSelectedKey) || '[]'));
    } else {
      setLikedMovies([]);
      setSelectedMovies([]);
    }
  };

  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem('isLoggedIn');
    const userData = window.localStorage.getItem('user');
    if (isLoggedIn && userData) {
      const userObj = JSON.parse(userData);
      setUser(userObj);
      loadUserMovies(userObj);
    } else {
      setUser(null);
      loadUserMovies(null);
    }
    const handleLogin = () => {
      const userData = window.localStorage.getItem('user');
      if (userData) {
        const userObj = JSON.parse(userData);
        setUser(userObj);
        loadUserMovies(userObj);
      }
    };
    const handleLogout = () => {
      setUser(null);
      loadUserMovies(null);
    };
    window.addEventListener('userLogin', handleLogin);
    window.addEventListener('userLogout', handleLogout);
    return () => {
      window.removeEventListener('userLogin', handleLogin);
      window.removeEventListener('userLogout', handleLogout);
    };
  }, []);

  useEffect(() => {
    if (user) {
      const userLikedKey = `likedMovies_${user.username}`;
      window.localStorage.setItem(userLikedKey, JSON.stringify(likedMovies));
    }
  }, [likedMovies, user]);

  useEffect(() => {
    if (user) {
      const userSelectedKey = `selectedMovies_${user.username}`;
      window.localStorage.setItem(userSelectedKey, JSON.stringify(selectedMovies));
    }
  }, [selectedMovies, user]);

  const filteredOpinions = user
    ? opinions.filter(op => op.username === user.username || !op.username)
    : opinions;

  return (
    <div className='text-light dark:text-dark bg-white dark:bg-black'>
      <ToggleDarkMode/>
      <Routes>
        <Route path='/' element={
          <>
            <Hero/>
            <Movies
              likedMovies={likedMovies}
              setLikedMovies={setLikedMovies}
              selectedMovies={selectedMovies}
              setSelectedMovies={setSelectedMovies}
              user={user}
            />
            <OpinionsSlider opinions = {filteredOpinions} user={user} />
            <FormSection onAddOpinion={opinion => setOpinions(prev => [...prev, opinion])} user={user} />
          </>
        } />
        <Route path='/cardPage/:movieId' element={
          <CardPage
            likedMovies={likedMovies}
            setLikedMovies={setLikedMovies}
            selectedMovies={selectedMovies}
            setSelectedMovies={setSelectedMovies}
          />
        } />
        <Route path='/likedmoviespage' element={
          <LikedMoviesPage
            likedMovies = {likedMovies}
          />
        }/>
        <Route path='/watchinglistpage' element={
          <WatchingListPage
            selectedMovies = {selectedMovies}
          />
        }/>
        <Route path='/loginpage' element = {
          <LoginPage/>
        } />
      </Routes>
    </div>
  )
}

export default App