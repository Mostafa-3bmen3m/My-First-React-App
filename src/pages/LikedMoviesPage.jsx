import React from 'react'
import { useNavigate } from 'react-router-dom';
import LikedMovieCard from '../components/LikedMovieCard'

const LikedMoviesPage = ({likedMovies}) => {

    const navigate = useNavigate();

  return (
    <div className='w-screen min-h-screen'>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Your Favorite Movies</h1>
        <div className="movies-list flex flex-col items-center w-[80%] mx-auto">
          {likedMovies.length > 0 ? (
            likedMovies.map((movie) => (
              <LikedMovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p className="text-center text-lg">You haven't liked any movies yet.</p>
          )}
        </div>
      </div>
      <button onClick={() => navigate(-1)} className="head-btn fixed top-6 left-6 cursor-pointer">← Back</button>
    </div>
  )
}

export default LikedMoviesPage