'use client';

import { Lock, Newspaper, Archive, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface DashboardStats {
  newsCount: number;
  documentCount: number;
}

export default function AreaRiservata() {
  const [stats, setStats] = useState<DashboardStats>({
    newsCount: 0,
    documentCount: 0,
  });
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const fetchStats = useCallback(async () => {
    try {
      const { count: newsCount } = await supabase
        .from('news')
        .select('*', { count: 'exact', head: true });

      const { count: docCount } = await supabase
        .from('documents')
        .select('*', { count: 'exact', head: true });

      setStats({
        newsCount: newsCount || 0,
        documentCount: docCount || 0,
      });
    } catch (error) {
      console.error('Errore nel caricamento delle statistiche:', error);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 mb-8 rounded-lg">
        <div className="px-6">
          <div className="flex items-center gap-4 mb-2">
            <Lock size={28} className="text-yellow-400" />
            <h1 className="text-4xl font-bold">Dashboard Area Riservata</h1>
          </div>
          <p className="text-lg text-blue-100">
            Benvenuto nella sezione amministrativa
          </p>
        </div>
      </section>

      {/* Stats Section */}
      {!loading && (
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* News Stats */}
            <Link href="/area-riservata/news" className="block">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Notizie</p>
                    <p className="text-4xl font-bold text-blue-600">{stats.newsCount}</p>
                  </div>
                  <div className="p-4 bg-blue-100 rounded-lg">
                    <Newspaper size={32} className="text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">Clicca per gestire</p>
              </div>
            </Link>

            {/* Documents Stats */}
            <Link href="/area-riservata/documenti" className="block">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Documenti</p>
                    <p className="text-4xl font-bold text-green-600">{stats.documentCount}</p>
                  </div>
                  <div className="p-4 bg-green-100 rounded-lg">
                    <Archive size={32} className="text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">Clicca per gestire</p>
              </div>
            </Link>

            {/* Profile */}
            <Link href="/area-riservata/profilo" className="block">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Profilo</p>
                    <p className="text-2xl font-bold text-purple-600 mt-2">Il Mio Profilo</p>
                  </div>
                  <div className="p-4 bg-purple-100 rounded-lg">
                    <User size={32} className="text-purple-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">Clicca per modificare</p>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Quick Links */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Accesso Rapido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/area-riservata/news/nuovo"
            className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <Newspaper size={24} className="text-blue-600" />
            <div>
              <p className="font-semibold text-gray-800">Nuova Notizia</p>
              <p className="text-sm text-gray-600">Crea una nuova notizia</p>
            </div>
          </Link>

          <Link
            href="/area-riservata/documenti"
            className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
          >
            <Archive size={24} className="text-green-600" />
            <div>
              <p className="font-semibold text-gray-800">Archivio Documenti</p>
              <p className="text-sm text-gray-600">Gestisci i documenti</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Information Section */}
      <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-3">Benvenuto nell'Area Riservata</h2>
        <p className="text-blue-800 mb-2">
          In questa sezione puoi gestire:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-blue-700 text-sm">
          <li>Notizie e comunicati del club</li>
          <li>Documenti organizzati per anno e categoria</li>
          <li>Il tuo profilo personale</li>
        </ul>
      </section>
    </>
  );
}
