'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Lock } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lions border-b border-lions-light-gray">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Club Name */}
          <Link href="/" className="flex items-center gap-3 no-underline hover:opacity-80 transition-opacity">
            {/* Lions Logo Circle */}
            <div className="w-12 h-12 rounded-full bg-lions-gold flex items-center justify-center flex-shrink-0 shadow-lions">
              <span className="text-lions-navy font-bold text-lg font-serif">L</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lions-navy font-bold text-sm">Lions Club</span>
              <span className="text-lions-gold text-xs font-semibold">Massafra-Mottola Le Cripte</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-lions-dark-text hover:text-lions-gold font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/chi-siamo"
              className="text-lions-dark-text hover:text-lions-gold font-medium transition-colors"
            >
              Chi Siamo
            </Link>
            <Link
              href="/news"
              className="text-lions-dark-text hover:text-lions-gold font-medium transition-colors"
            >
              News
            </Link>
            <Link
              href="/contatti"
              className="text-lions-dark-text hover:text-lions-gold font-medium transition-colors"
            >
              Contatti
            </Link>
            <Link
              href="/area-riservata"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-lions-navy text-lions-gold hover:bg-lions-gold hover:text-lions-navy font-medium transition-all"
            >
              <Lock size={16} />
              Area Riservata
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-lions-light-gray transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className="text-lions-navy" />
            ) : (
              <Menu size={24} className="text-lions-navy" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-lions-light-gray pt-4 animate-fade-in-up">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={closeMenu}
                className="text-lions-dark-text hover:text-lions-gold font-medium transition-colors py-2"
              >
                Home
              </Link>
              <Link
                href="/chi-siamo"
                onClick={closeMenu}
                className="text-lions-dark-text hover:text-lions-gold font-medium transition-colors py-2"
              >
                Chi Siamo
              </Link>
              <Link
                href="/news"
                onClick={closeMenu}
                className="text-lions-dark-text hover:text-lions-gold font-medium transition-colors py-2"
              >
                News
              </Link>
              <Link
                href="/contatti"
                onClick={closeMenu}
                className="text-lions-dark-text hover:text-lions-gold font-medium transition-colors py-2"
              >
                Contatti
              </Link>
              <Link
                href="/area-riservata"
                onClick={closeMenu}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-lions-navy text-lions-gold hover:bg-lions-gold hover:text-lions-navy font-medium transition-all w-fit"
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
