'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      setUserEmail(user.email || null);

      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      if (profile?.full_name) {
        setUserName(profile.full_name);
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
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
    { href: '/area-riservata/profilo', label: 'Profilo', icon: User },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-50 flex flex-col w-64 bg-[#003366] text-white transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-blue-900">
          <h1 className="text-xl font-bold">Lions Club</h1>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-900 hover:text-white transition-colors group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon size={20} className="mr-3" />
                <span className="flex-1">{item.label}</span>
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}
        </nav>

        {/* User Info Section */}
        <div className="border-t border-blue-900 p-4 space-y-4">
          <div className="px-2">
            <p className="text-sm text-blue-200">Acceduto come</p>
            <p className="text-sm font-semibold truncate">{userName || userEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
          >
            <LogOut size={18} className="mr-2" />
            Esci
          </button>
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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shadow-sm">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>

          <div className="flex-1 md:flex-none">
            <h2 className="text-xl font-semibold text-gray-800">Area Riservata</h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-gray-600">Benvenuto</p>
              <p className="text-sm font-semibold text-gray-800">{userName || userEmail}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
              title="Esci"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
