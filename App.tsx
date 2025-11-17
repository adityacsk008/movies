
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieGallery from './components/MovieGallery';
import MovieCard from './components/MovieCard';
import type { Movie } from './types';
import {
  allMovies,
  popularOttMoviesData,
  classicHindiMoviesData,
  latestHindiMoviesData,
  popularSouthMoviesData,
  popularWebSeriesData,
  financialScamMoviesData,
  politicalCrimeMoviesData,
  gangsterCrimeMoviesData,
  cyberCrimeMoviesData,
  latestPopularReleasesData
} from './data/movies';

type Theme = 'day' | 'night';

const Hero: React.FC = () => (
  <section id="home" className="hero-section bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center text-center text-white" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg')`}}>
    <div className="container mx-auto px-5">
      <h1 className="text-5xl md:text-6xl font-bold mb-4 opacity-0 animate-fadeInUp animate-delay-200">Discover Your Next Favorite Movie</h1>
      <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-0 animate-fadeInUp animate-delay-400">Explore a vast collection of films across all genres.</p>
    </div>
  </section>
);

const CategoriesOverview: React.FC = () => (
    <section id="categories-overview" className="py-12 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto text-center max-w-4xl">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Explore Categories</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
                Dive into our curated collections of movies and web series. Whether you love classic Bollywood, action-packed South Indian cinema, or binge-worthy shows, we have something for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                {['Hindi Movies', 'South Indian Movies', 'Bollywood Blockbusters', 'Trending Web Series', 'Indian Crime Movies'].map(category => (
                    <a href={`#${category.toLowerCase().replace(/ /g, '-')}`} key={category} className="px-6 py-3 bg-[#A0D9A2] dark:bg-[#FFB347] text-white dark:text-black font-semibold rounded-lg shadow-md hover:bg-[#8BCAA0] dark:hover:bg-[#E69A36] transition-all duration-200 transform hover:-translate-y-1">
                        {category}
                    </a>
                ))}
            </div>
        </div>
    </section>
);

const TagsSection: React.FC = () => (
    <section id="tags-section" className="py-12 px-4">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Popular Tags</h2>
            <div className="flex flex-wrap justify-center gap-3">
                 {['Bollywood Hits', 'South Indian Movies', 'OTT Releases', 'Trending Web Series', 'New Movie Releases', 'Action Movies', 'Romantic Movies', 'Comedy Movies', 'Thriller Movies', 'Crime Movies'].map(tag => (
                    <a href="#" key={tag} className="px-5 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded-full text-sm font-medium hover:bg-[#A0D9A2] dark:hover:bg-[#FFB347] hover:text-white dark:hover:text-black transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm hover:shadow-lg">
                        {tag}
                    </a>
                ))}
            </div>
        </div>
    </section>
);

const Contact: React.FC = () => (
    <section id="contact" className="py-12 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto text-center max-w-xl">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Contact Us</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">Have questions or suggestions? Reach out!</p>
            <p className="text-gray-800 dark:text-gray-200">Email: <a href="mailto:crommatoons@gmail.com" className="text-[#508D69] dark:text-[#FFB347] hover:underline">crommatoons@gmail.com</a></p>
        </div>
    </section>
);


const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('day');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = savedTheme || 'day';
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'night') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'day' ? 'night' : 'day'));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      const results = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
  };
  
  const handleScroll = useCallback(() => {
    const pageYOffset = window.scrollY;
    const headerHeight = 82;
    let currentSection = 'home';

    Object.entries(sectionRefs.current).forEach(([id, element]) => {
      // FIX: Use `instanceof HTMLElement` as a type guard to prevent an error
      // where TypeScript infers `element` as `unknown` and prevents access to `offsetTop`.
      if (element instanceof HTMLElement) {
        if (pageYOffset >= element.offsetTop - headerHeight) {
          currentSection = id;
        }
      }
    });

    setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className={`bg-gray-100 dark:bg-[#121212] text-gray-800 dark:text-gray-200 min-h-screen font-sans transition-colors duration-300`}>
      <Header theme={theme} toggleTheme={toggleTheme} onSearch={handleSearch} activeSection={activeSection} />
      <main>
        {searchQuery ? (
          <section id="search-results" className="py-12 px-4">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Search Results for "{searchQuery}"</h2>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                  {searchResults.map((movie) => (
                    <MovieCard key={`${movie.title}-${movie.imgSrc}`} movie={movie} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No movies found matching your search.</p>
              )}
            </div>
          </section>
        ) : (
          <>
            <div ref={el => sectionRefs.current['home'] = el}><Hero /></div>
            <div ref={el => sectionRefs.current['movie-gallery'] = el}>
                <MovieGallery 
                    id="movie-gallery" 
                    sectionTitle="Popular OTT Movies"
                    galleries={[{ title: '', movies: popularOttMoviesData }]}
                />
            </div>
            <div ref={el => sectionRefs.current['categories-overview'] = el}><CategoriesOverview /></div>
             <div ref={el => sectionRefs.current['hindi-movies'] = el}>
                <MovieGallery 
                    id="hindi-movies"
                    sectionTitle="Hindi Movies"
                    galleries={[
                        { title: 'Classic Hindi Movies', movies: classicHindiMoviesData },
                        { title: 'Latest Movies', movies: latestHindiMoviesData }
                    ]}
                />
            </div>
             <div ref={el => sectionRefs.current['south-indian-movies'] = el}>
                <MovieGallery 
                    id="south-indian-movies"
                    sectionTitle="South Indian Movies"
                    galleries={[
                        { title: 'Popular South Movies', movies: popularSouthMoviesData }
                    ]}
                />
            </div>
             <div ref={el => sectionRefs.current['trending-web-series'] = el}>
                <MovieGallery 
                    id="trending-web-series"
                    sectionTitle="Trending Web Series"
                    galleries={[
                        { title: 'Top Trending Shows', movies: popularWebSeriesData }
                    ]}
                />
            </div>
            <div ref={el => sectionRefs.current['indian-crime-movies'] = el}>
                <MovieGallery 
                    id="indian-crime-movies"
                    sectionTitle="Top Indian Crime Movies"
                    galleries={[
                        { title: 'Financial / Corporate Scam', movies: financialScamMoviesData },
                        { title: 'Government/Political Crime & Corruption', movies: politicalCrimeMoviesData },
                        { title: 'Underworld / Mafia / Gangster Crime', movies: gangsterCrimeMoviesData },
                        { title: 'Cyber / Tech & Digital Crime', movies: cyberCrimeMoviesData },
                    ]}
                />
            </div>
            <div ref={el => sectionRefs.current['tags-section'] = el}><TagsSection /></div>
            <div ref={el => sectionRefs.current['latest'] = el}>
               <MovieGallery 
                    id="latest"
                    sectionTitle="Latest Releases"
                    galleries={[
                        { title: 'High-Profile Latest Releases', movies: latestPopularReleasesData }
                    ]}
                />
            </div>
            <div ref={el => sectionRefs.current['contact'] = el}><Contact /></div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
