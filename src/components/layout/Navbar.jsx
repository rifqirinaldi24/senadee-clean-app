import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isHome ? 'glass' : 'bg-background/95 backdrop-blur-md border-b border-surface-container-low'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link
            to="/"
            id="navbar-logo"
            className="flex items-center gap-2 group outline-none"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Senadee Home"
          >
            <img src="/logo.png" alt="Senadee Logo" className="w-8 h-8 rounded-xl object-contain shadow-sm" />
            <span className="font-brand text-xl sm:text-2xl font-bold tracking-tight text-senadee-dark group-hover:text-senadee-primary transition-colors">
              Senadee
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 relative">
            <Link
              to="/"
              className="font-brand text-senadee-dark hover:text-senadee-primary font-bold transition-colors"
            >
              Beranda
            </Link>
            <Link
              to="/"
              className="font-brand text-senadee-dark hover:text-senadee-primary font-bold transition-colors"
            >
              Artikel
            </Link>
            <Link
              to="/kenali-tubuhmu"
              className="font-brand text-senadee-dark hover:text-senadee-primary font-bold transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">vital_signs</span>
              Kenali Tubuhmu
            </Link>
            <Link
              to="/"
              className="font-brand text-senadee-dark hover:text-senadee-primary font-bold transition-colors"
            >
              Komunitas
            </Link>
            
            {/* Dropdown Tentang Kita */}
            <div className="relative group">
              <button className="font-brand text-senadee-dark hover:text-senadee-primary font-bold transition-colors flex items-center gap-1 focus:outline-none">
                Tentang Kita
                <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:rotate-180">expand_more</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-surface-container-low opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <div className="py-2 flex flex-col">
                  <Link
                    to="/tentang-kita/cerita-senadee"
                    className="px-4 py-2 text-sm font-medium text-senadee-dark hover:bg-surface-container-low hover:text-primary transition-colors block"
                  >
                    Cerita Senadee
                  </Link>
                  <Link
                    to="/tentang-kita/tim-pioneers"
                    className="px-4 py-2 text-sm font-medium text-senadee-dark hover:bg-surface-container-low hover:text-primary transition-colors block"
                  >
                    Tim Pioneers
                  </Link>
                  <Link
                    to="/tentang-kita/kemitraan"
                    className="px-4 py-2 text-sm font-medium text-senadee-dark hover:bg-surface-container-low hover:text-primary transition-colors block"
                  >
                    Mari Bertumbuh Bersama
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-surface-container-low pt-3 animate-slide-down">
            <nav className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-brand font-bold text-senadee-dark hover:text-senadee-primary transition-colors"
              >
                Beranda
              </Link>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-brand font-bold text-senadee-dark hover:text-senadee-primary transition-colors"
              >
                Artikel
              </Link>
              <Link
                to="/kenali-tubuhmu"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-brand font-bold text-senadee-dark hover:text-senadee-primary transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">vital_signs</span>
                Kenali Tubuhmu
              </Link>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-brand font-bold text-senadee-dark hover:text-senadee-primary transition-colors"
              >
                Komunitas
              </Link>
              
              {/* Accordion Tentang Kita (Mobile) */}
              <div>
                <button
                  onClick={() => setIsAboutMenuOpen(!isAboutMenuOpen)}
                  className="w-full text-left flex items-center justify-between px-4 py-3 rounded-xl text-sm font-brand font-bold text-senadee-dark hover:text-senadee-primary transition-colors"
                >
                  <span>Tentang Kita</span>
                  <span className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${isAboutMenuOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {isAboutMenuOpen && (
                  <div className="flex flex-col pl-8 pr-4 py-1 gap-1 border-l-2 border-surface-container-low ml-6 mb-2 mt-1">
                    <Link
                      to="/tentang-kita/cerita-senadee"
                      onClick={() => setIsMenuOpen(false)}
                      className="py-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
                    >
                      Cerita Senadee
                    </Link>
                    <Link
                      to="/tentang-kita/tim-pioneers"
                      onClick={() => setIsMenuOpen(false)}
                      className="py-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
                    >
                      Tim Pioneers
                    </Link>
                    <Link
                      to="/tentang-kita/kemitraan"
                      onClick={() => setIsMenuOpen(false)}
                      className="py-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
                    >
                      Mari Bertumbuh Bersama
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
