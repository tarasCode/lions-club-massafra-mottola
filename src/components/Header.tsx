'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Lock } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/chi-siamo', label: 'Chi Siamo' },
    { href: '/news', label: 'News' },
    { href: '/contatti', label: 'Contatti' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-effect shadow-lg border-b border-lions-gold/10'
          : 'bg-lions-navy/40 backdrop-blur-sm'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Club Name */}
          <Link
            href="/"
            className="flex items-center gap-3 no-underline transition-transform duration-200 hover:scale-105"
          >
            {/* Lions Logo Circle */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                isScrolled
                  ? 'bg-lions-gold shadow-lions'
                  : 'bg-lions-gold/90 shadow-lions-float'
              }`}
            >
              <span className="text-lions-navy font-bold text-lg font-serif">L</span>
            </div>
            <div className="hidden sm:flex flex-col transition-colors duration-300">
              <span className={`font-bold text-sm ${isScrolled ? 'text-lions-navy' : 'text-white'}`}>
                Lions Club
              </span>
              <span className={`text-xs font-semibold ${isScrolled ? 'text-lions-gold' : 'text-lions-light-gold'}`}>
                Massafra-Mottola Le Cripte
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-all duration-200 relative py-2 ${
                  isScrolled
                    ? 'text-lions-dark-text hover:text-lions-gold'
                    : 'text-white hover:text-lions-light-gold'
                } ${isActive(link.href) ? (isScrolled ? 'text-lions-gold' : 'text-lions-light-gold') : ''}`}
              >
                {link.label}
                {isActive(link.href) && (
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 w-full rounded-full transition-all duration-300 ${
                      isScrolled ? 'bg-lions-gold' : 'bg-lions-light-gold'
                    }`}
                  />
                )}
              </Link>
            ))}
            <Link
              href="/area-riservata"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isScrolled
                  ? 'bg-lions-navy text-lions-gold hover:bg-lions-gold hover:text-lions-navy'
                  : 'bg-lions-gold/90 text-lions-navy hover:bg-lions-gold'
              }`}
            >
              <Lock size={16} />
              Area Riservata
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled
                ? 'text-lions-navy hover:bg-lions-light-gray'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-lions-gold/20 pt-4 animate-slide-in-left">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? 'bg-lions-gold/20 text-lions-gold'
                      : isScrolled
                        ? 'text-lions-dark-text hover:bg-lions-light-gray'
                        : 'text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/area-riservata"
                onClick={closeMenu}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 w-fit ${
                  isScrolled
                    ? 'bg-lions-navy text-lions-gold hover:bg-lions-gold hover:text-lions-navy'
                    : 'bg-lions-gold/90 text-lions-navy'
                }`}
              >
                <Lock size={16} />
                Area Riservata
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
