import React from 'react';
import { Link } from 'react-router-dom';

const LikedMovieCard = ({ movie }) => {
  return (
    <Link to={`/cardPage/${movie.id}`} className="liked-movie-card my-border">
      <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} className='w-[100px] h-full object-cover' />
      <div className="card-content p-4">
        <h2 className="card-title text-xl">{movie.title}</h2>
        <p className="card-description text-sm mt-3">{movie.overview.split(" ").slice(0, 100).join(" ")}...</p>
      </div>
    </Link>
  );
};

export default LikedMovieCard; 