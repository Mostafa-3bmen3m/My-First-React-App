import React, { useState } from 'react';
import LikedMovieCard from '../components/LikedMovieCard';
import { useNavigate } from 'react-router-dom';

const options = [
  'Watching',
  'On-Hold',
  'Plan To Watch',
  'Completed',
];

const WatchingListPage = ({ selectedMovies }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const navigate = useNavigate();

  const filteredMovies = selectedMovies.filter(
    (movie) => movie.option === selectedOption
  );

  return (
    <div className='min-h-screen w-screen'>
      <div className="WatchingListOptipons flex gap-[15px] fixed top-[20px] left-[50%] translate-x-[-50%] z-10">
        {options.map((option) => (
          <button
            key={option}
            className={`watching-list-options ${selectedOption === option ? 'bg-black text-white dark:bg-dark dark:text-black' : ''}`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="pt-[80px] flex flex-col items-center w-[80%] mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">{selectedOption} Movies</h1>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <LikedMovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="text-center text-lg mt-10">No movies in this category.</p>
        )}
      </div>
      <button onClick={() => navigate(-1)} className="head-btn fixed top-6 left-6 cursor-pointer">← Back</button>
    </div>
  );
};

export default WatchingListPage;