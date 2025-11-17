
import React, { useState } from 'react';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(movie.originalLink);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2500);
    } catch (err) {
      console.error('Failed to copy link: ', err);
      alert('Could not copy link to clipboard.');
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };
  
  return (
    <>
      <a
        href={movie.originalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
        title={`Watch ${movie.title}`}
      >
        <div className="relative bg-white dark:bg-[#1E1E1E] rounded-lg shadow-lg dark:shadow-orange-500/10 overflow-hidden h-full flex flex-col transition-shadow duration-300 group-hover:shadow-xl dark:group-hover:shadow-orange-500/20">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex justify-between items-start p-3">
                <button onClick={handleLike} className={`text-2xl transition-transform duration-200 hover:scale-125 ${isLiked ? 'text-red-500' : 'text-white'}`} title="Add to Favorites">
                    {isLiked ? '❤️' : '🤍'}
                </button>
                <button onClick={handleShare} className="transition-transform duration-200 hover:scale-125" title="Share Movie">
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L16.04,7.15C16.56,7.62 17.24,7.92 18,7.92C19.66,7.92 21,6.58 21,5C21,3.42 19.66,2 18,2C16.34,2 15,3.42 15,5C15,5.24 15.04,5.47 15.09,5.7L7.96,9.85C7.44,9.38 6.76,9.08 6,9.08C4.34,9.08 3,10.42 3,12C3,13.58 4.34,15 6,15C6.76,15 7.44,14.62 7.96,14.15L15.09,18.3C15.04,18.53 15,18.76 15,19C15,20.58 16.34,22 18,22C19.66,22 21,20.58 21,19C21,17.42 19.66,16.08 18,16.08Z"/></svg>
                </button>
            </div>

            <img
                src={movie.imgSrc}
                alt={movie.altText || `Poster of ${movie.title}`}
                loading="lazy"
                className="w-full h-auto aspect-[2/3] object-cover bg-gray-200 dark:bg-gray-700 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="p-3 flex-grow flex flex-col justify-between">
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 leading-tight mb-1">{movie.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{movie.genre}</p>
            </div>
        </div>
      </a>
      {showNotification && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#2c3e50] text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium z-50 animate-fadeInUp">
              Successfully Copied Link!
          </div>
      )}
    </>
  );
};

export default MovieCard;
