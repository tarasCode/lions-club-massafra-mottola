'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  Home,
  Newspaper,
  Archive,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push('/login');
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error('Auth error:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: '/area-riservata', label: 'Dashboard', icon: Home },
    { href: '/area-riservata/news', label: 'Gestione News', icon: Newspaper },
    { href: '/area-riservata/documenti', label: 'Archivio Documenti', icon: Archive },
  ];

  const isActive = (href: string) => {
    if (href === '/area-riservata') return pathname === '/area-riservata';
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-50 flex flex-col w-64 bg-[#002244] text-white transition-transform duration-300 ease-in-out flex-shrink-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lions-logo.png" alt="Lions Club" className="w-9 h-9 flex-shrink-0 object-contain" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white leading-tight">Lions Club</span>
              <span className="text-[10px] text-lions-light-gold leading-tight">Area Riservata</span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors group ${
                  active
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon size={20} className="mr-3" />
                <span className="flex-1">{item.label}</span>
                <ChevronRight
                  size={16}
                  className={`transition-opacity ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Bottom copyright only */}
        <div className="border-t border-white/10 p-4 text-center">
          <p className="text-[10px] text-gray-500">
            &copy; {new Date().getFullYear()} Lions Club Le Cripte ODV
          </p>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - compact, no "Area Riservata" bar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 shadow-sm flex-shrink-0">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-gray-900"
          >
            <Menu size={22} />
          </button>

          {/* Current page title + subtitle */}
          <div className="flex-1 hidden md:block">
            <h2 className="text-base font-semibold text-gray-700 leading-tight">
              {pathname === '/area-riservata' && 'Dashboard Area Riservata'}
              {pathname.startsWith('/area-riservata/news') && 'Gestione News'}
              {pathname.startsWith('/area-riservata/documenti') && 'Archivio Documenti'}
              {pathname.startsWith('/area-riservata/profilo') && 'Il Mio Profilo'}
            </h2>
            <p className="text-xs text-gray-400 leading-tight">
              {pathname === '/area-riservata' && 'Benvenuto nella sezione amministrativa'}
              {pathname.startsWith('/area-riservata/news') && 'Crea, modifica e pubblica le notizie del club'}
              {pathname.startsWith('/area-riservata/documenti') && 'Gestisci i documenti per anno e categoria (max 5MB per file)'}
              {pathname.startsWith('/area-riservata/profilo') && 'Gestisci le tue informazioni personali'}
            </p>
          </div>

          {/* Profile icon with dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              title="Profilo"
            >
              <User size={18} className="text-gray-600" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                <Link
                  href="/area-riservata/profilo"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User size={16} />
                  Profilo
                </Link>
                <div className="border-t border-gray-100" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content - single scroll */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
