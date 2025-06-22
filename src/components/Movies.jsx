import React, { useState } from 'react';
import LikeButton from './LikeButton';
import MovieOptionsBtn from './MovieOptionsBtn';
import FetchMovies from './FetchMovies';
import { Link } from 'react-router-dom';
import { SlOptionsVertical } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";

const Movies = ({ likedMovies, setLikedMovies, selectedMovies, setSelectedMovies, user }) => {
    const [showAll, setShowAll] = useState(false);

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
                const moviesToShow = showAll ? data : data.slice(0, 8);
                return (
                    <div className='container h-fit w-screen bg-white dark:bg-black m-auto' id='Movies'>
                        <div className="LikedAndOptions sticky top-5 flex gap-[20px] items-center text-xl z-10">
                            <Link to={'/watchinglistpage'}>
                                <SlOptionsVertical className=' cursor-pointer'/>
                            </Link>
                            <Link to={'/likedmoviespage'}>
                                <FaHeart className='cursor-pointer'/>
                            </Link>
                        </div>
                        {loading && <div>Loading...</div>}
                        {error && <div>Error loading movies.</div>}
                        <div className="cards w-[80%] m-auto flex flex-wrap gap-[20px] justify-center">
                            {moviesToShow.map((movie) => {
                                const selected = selectedMovies.find(m => m.id === movie.id);
                                return (
                                    <Link to={`/cardPage/${movie.id}`} className="card my-border scrollbar-hide relative" key={movie.id}>
                                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className='w-full h-full object-cover' />
                                        <div className="card-content space-y-5">
                                            <h2 className="card-title text-xl">{movie.title}</h2>
                                            <p className="card-description text-[12px]">{movie.overview.split(" ").slice(0, 15).join(" ")}</p>
                                        </div>
                                        <div className="card-options mt-2 flex justify-between">
                                            <MovieOptionsBtn
                                                selectedOption={selected ? selected.option : "None"}
                                                onOptionChange={option => handleOptionChange(movie, option)}
                                            />
                                            <LikeButton movie={movie} likedMovies={likedMovies} setLikedMovies={setLikedMovies} />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                        {data.length > 8 && !showAll && (
                            <div className="flex justify-center mt-8">
                                <button className="head-btn cursor-pointer" onClick={() => setShowAll(true)} > Show more </button>
                            </div>
                        )}
                        {data.length > 8 && showAll && (
                            <div className="flex justify-center mt-8">
                                <button className="head-btn cursor-pointer" onClick={() => setShowAll(false)} > Show less </button>
                            </div>
                        )}
                    </div>
                );
            }}
        </FetchMovies>
    );
}

export default Movies