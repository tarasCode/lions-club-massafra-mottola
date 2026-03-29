'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Lock, ExternalLink } from 'lucide-react';

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

  const isLoginPage = pathname === '/login';

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
    <header className="sticky top-0 z-50">
      {/* Top bar - Lions International style */}
      <div className="bg-lions-dark-navy text-white">
        <div className="container max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <a
              href="https://www.lionsclubs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-lions-gold transition-colors flex items-center gap-1"
            >
              LIONSCLUBS.ORG <ExternalLink size={10} />
            </a>
            <a
              href="https://www.lionsclubs.org/it/lcif"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block hover:text-lions-gold transition-colors"
            >
              LCIF
            </a>
          </div>
          <div className="flex items-center gap-4">
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg border-b border-gray-200'
            : 'bg-lions-navy'
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Club Name */}
            <Link
              href="/"
              className="flex items-center gap-3 no-underline transition-transform duration-200 hover:scale-[1.02]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/lions-logo.png"
                alt="Lions Club"
                className="w-11 h-11 flex-shrink-0 object-contain transition-all duration-300"
              />
              <div className="hidden sm:flex flex-col">
                <span className={`font-bold text-sm leading-tight ${isScrolled ? 'text-lions-navy' : 'text-white'}`}>
                  Lions Club
                </span>
                <span className={`text-[11px] font-semibold leading-tight ${isScrolled ? 'text-lions-gold' : 'text-lions-gold'}`}>
                  Massafra-Mottola Le Cripte
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 font-semibold text-sm transition-all duration-200 relative rounded-md ${
                    isScrolled
                      ? isActive(link.href)
                        ? 'text-lions-navy bg-lions-light-gray'
                        : 'text-gray-700 hover:text-lions-navy hover:bg-gray-100'
                      : isActive(link.href)
                        ? 'text-lions-gold'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <div
                      className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${
                        isScrolled ? 'bg-lions-gold' : 'bg-lions-gold'
                      }`}
                    />
                  )}
                </Link>
              ))}
              {!isLoginPage && (
                <Link
                  href="/area-riservata"
                  className={`flex items-center gap-2 px-5 py-2 rounded-md font-semibold text-sm ml-2 transition-all duration-200 ${
                    isScrolled
                      ? 'bg-lions-gold text-lions-dark-navy hover:bg-yellow-500'
                      : 'bg-lions-gold text-lions-dark-navy hover:bg-yellow-400'
                  }`}
                >
                  <Lock size={14} />
                  Area Riservata
                </Link>
              )}
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
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`lg:hidden border-t ${isScrolled ? 'bg-white border-gray-200' : 'bg-lions-navy border-white/10'}`}>
          <nav className="container max-w-7xl mx-auto px-4 py-3 animate-slide-in-left">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    isActive(link.href)
                      ? isScrolled
                        ? 'bg-lions-light-gray text-lions-navy'
                        : 'bg-white/10 text-lions-gold'
                      : isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!isLoginPage && (
                <Link
                  href="/area-riservata"
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm bg-lions-gold text-lions-dark-navy mt-2 w-fit"
                >
                  <Lock size={14} />
                  Area Riservata
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
