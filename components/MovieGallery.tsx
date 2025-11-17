
import React from 'react';
import type { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieGalleryProps {
  id: string;
  sectionTitle: string;
  galleries: {
    title: string;
    movies: Movie[];
  }[];
}

const MovieGallery: React.FC<MovieGalleryProps> = ({ id, sectionTitle, galleries }) => {
  return (
    <section id={id} className="py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">{sectionTitle}</h2>
        {galleries.map((gallery, index) => (
          <div key={index} className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 pb-2 border-b-2 border-[#A0D9A2] dark:border-[#FFB347] inline-block">
              {gallery.title}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {gallery.movies.map((movie) => (
                <MovieCard key={`${movie.title}-${movie.imgSrc}`} movie={movie} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieGallery;
