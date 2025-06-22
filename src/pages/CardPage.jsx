import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FetchMovies from '../components/FetchMovies';
import LikeButton from '../components/LikeButton';
import MovieOptionsBtn from '../components/MovieOptionsBtn';

const CardPage = ({ likedMovies, setLikedMovies, selectedMovies, setSelectedMovies }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const handleOptionChange = (movie, option) => {
    setSelectedMovies(prev => {
      if (option === null) {
        return prev.filter(m => m.id !== movie.id);
      } else {
        const exists = prev.find(m => m.id === movie.id);
        if (exists) {
          return prev.map(m => m.id === movie.id ? { ...m, option } : m);
        } else {
          return [...prev, { ...movie, option }];
        }
      }
    });
  };

  return (
    <FetchMovies>
      {({ data, loading, error }) => {
        if (loading) return <div className="flex-center h-screen text-2xl">Loading...</div>;
        if (error) return <div className="flex-center h-screen text-2xl text-red-500">Error loading movie.</div>;
        const movie = data.find(m => String(m.id) === String(movieId));
        if (!movie) return <div className="flex-center h-screen text-2xl">Movie not found.</div>;
        const selected = selectedMovies.find(m => m.id === movie.id);
        const isLiked = likedMovies.some(m => m.id === movie.id);
        return (
          <div className="min-h-screen flex flex-col items-center py-10 px-4">
            <button onClick={() => navigate(-1)} className="head-btn mb-8 self-start cursor-pointer">← Back</button>
            <div className="w-full max-w-4xl rounded-xl shadow-lg border-2 App-border flex flex-col md:flex-row overflow-hidden">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-full md:w-1/2 object-cover" />
              <div className="flex-1 p-8 flex flex-col gap-6 relative">
                <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                <p className="text-base mb-2"><span className="font-semibold">Release Date:</span> {movie.release_date}</p>
                <p className="text-base mb-2"><span className="font-semibold">Rating:</span> {movie.vote_average} / 10</p>
                <p className="text-base mb-2"><span className="font-semibold">Language:</span> {movie.original_language?.toUpperCase()}</p>
                <p className="text-base mb-2"><span className="font-semibold">Overview:</span> {movie.overview}</p>
                <div className="flex items-center gap-4 mt-4">
                  <LikeButton movie={movie} likedMovies={likedMovies} setLikedMovies={setLikedMovies} />
                  <div className="flex justify-between">
                    <MovieOptionsBtn
                      selectedOption={selected ? selected.option : "None"}
                      onOptionChange={option => handleOptionChange(movie, option)}
                    />
                    <span className="ml-2 text-base"><span className="font-semibold">{selected ? <span>Watching-Option:  {selected.option}</span> : ""}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </FetchMovies>
  );
};

export default CardPage;