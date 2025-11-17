
import React, { useState } from 'react';

interface NavLink {
  href: string;
  label: string;
  id: string;
}

const navLinks: NavLink[] = [
  { href: '#home', label: 'Home', id: 'home' },
  { href: '#movie-gallery', label: 'Popular OTT', id: 'movie-gallery' },
  { href: '#categories-overview', label: 'Categories', id: 'categories-overview' },
  { href: '#tags-section', label: 'Tags', id: 'tags-section' },
  { href: '#latest', label: 'Latest', id: 'latest' },
  { href: '#contact', label: 'Contact', id: 'contact' },
];

interface HeaderProps {
  theme: 'day' | 'night';
  toggleTheme: () => void;
  onSearch: (query: string) => void;
  activeSection: string;
}

const SearchBar: React.FC<{ onSearch: (query: string) => void, isMobile: boolean }> = ({ onSearch, isMobile }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };
  
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className={isMobile ? 'p-4 border-b border-green-200/20 dark:border-orange-200/20' : ''}>
      <div className="search-container animate-moveBorder relative flex items-center w-full md:w-[280px] rounded-full p-0.5">
        <div className="search-inner w-full flex items-center bg-black/15 dark:bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
          <span className="search-icon absolute left-[18px] text-lg text-white dark:text-[#FFB347]">🔍</span>
          <input
            type="text"
            className="search-box flex-1 border-none outline-none bg-transparent text-sm text-white dark:text-gray-200 pl-8 placeholder-white/70 dark:placeholder-gray-200/60"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <button
            className="go-button ml-2 px-4 py-1.5 border-none rounded-full bg-[#8BCAA0] dark:bg-[#FFB347] text-white dark:text-black text-sm font-bold cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg"
            onClick={handleSearch}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, onSearch, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#A0D9A2] dark:bg-[#080808] text-white dark:text-[#FFB347] p-4 sticky top-0 z-50 shadow-md h-[82px] md:h-[70px] sm:h-[60px] transition-colors duration-300">
      <div className="container mx-auto px-5 flex justify-between items-center h-full">
        <a href="#home" className="flex items-center transition-opacity hover:opacity-80">
          <img src="https://iili.io/F33LXDv.png" alt="MovieX Logo" className="h-12 md:h-11 sm:h-10" />
        </a>

        <nav className={`fixed top-0 ${isMenuOpen ? 'left-0' : '-left-full'} md:static md:left-auto w-[70%] max-w-xs h-full md:w-auto md:h-auto bg-[#A0D9A2] dark:bg-[#080808] md:bg-transparent md:dark:bg-transparent flex flex-col md:flex-row transition-all duration-300 ease-in-out shadow-lg md:shadow-none z-40`}>
          <ul className="flex flex-col md:flex-row items-center list-none pt-24 md:pt-0">
            {navLinks.map((link) => (
              <li key={link.href} className="w-full md:w-auto md:ml-2.5">
                <a
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block md:inline-block text-center md:text-left text-white dark:text-[#FFB347] px-3 py-4 md:py-2 rounded-md transition-colors duration-300 border-b md:border-none border-green-200/20 dark:border-orange-200/20 hover:bg-[#8BCAA0] dark:hover:bg-[#33281B] ${activeSection === link.id ? 'bg-[#79B48F] dark:bg-[#4D3A29]' : ''}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="block md:hidden w-full">
              <SearchBar onSearch={(q) => { onSearch(q); setIsMenuOpen(false); }} isMobile={true}/>
            </li>
          </ul>
        </nav>
        
        <div className="hidden md:flex items-center">
            <SearchBar onSearch={onSearch} isMobile={false}/>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'day' ? 'Night' : 'Day'} Mode`}
            title={`Switch to ${theme === 'day' ? 'Night' : 'Day'} Mode`}
            className="bg-transparent border-none text-white dark:text-[#FFB347] cursor-pointer text-2xl p-1.5 transition-transform duration-200 hover:scale-110"
          >
            {theme === 'day' ? '☀️' : '🌙'}
          </button>
          <button
            className="menu-toggle md:hidden z-50"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-6 h-0.5 bg-white dark:bg-[#FFB347] my-1.5 transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white dark:bg-[#FFB347] my-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white dark:bg-[#FFB347] my-1.5 transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </div>
      {isMenuOpen && <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/30 md:hidden z-30"></div>}
    </header>
  );
};

export default Header;
