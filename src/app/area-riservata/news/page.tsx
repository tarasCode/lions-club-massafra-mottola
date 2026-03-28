'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  FileText,
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPublished, setFilterPublished] = useState<'all' | 'published' | 'draft'>('all');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [togglingPublish, setTogglingPublish] = useState<string | null>(null);

  const supabase = createClient();

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('id, title, excerpt, published, published_at, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setNews(data || []);
    } catch (error) {
      console.error('Errore nel caricamento delle notizie:', error);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa notizia?')) return;

    try {
      setDeleting(id);
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setNews(news.filter(n => n.id !== id));
    } catch (error) {
      console.error('Errore nell\'eliminazione:', error);
      alert('Errore nell\'eliminazione della notizia');
    } finally {
      setDeleting(null);
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      setTogglingPublish(id);
      const { error } = await supabase
        .from('news')
        .update({
          published: !currentStatus,
          published_at: !currentStatus ? new Date().toISOString() : null,
        })
        .eq('id', id);

      if (error) throw error;

      setNews(news.map(n =>
        n.id === id
          ? {
              ...n,
              published: !currentStatus,
              published_at: !currentStatus ? new Date().toISOString() : null,
            }
          : n
      ));
    } catch (error) {
      console.error('Errore nell\'aggiornamento:', error);
      alert('Errore nell\'aggiornamento dello stato di pubblicazione');
    } finally {
      setTogglingPublish(null);
    }
  };

  const filteredNews = news.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterPublished === 'published') return matchesSearch && item.published;
    if (filterPublished === 'draft') return matchesSearch && !item.published;
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Caricamento notizie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestione Notizie</h1>
          <p className="text-gray-600 mt-1">Gestisci tutte le notizie del sito</p>
        </div>
        <Link
          href="/area-riservata/news/nuovo"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          <Plus size={20} />
          Nuova Notizia
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Cerca notizie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {(['all', 'published', 'draft'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterPublished(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterPublished === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'all'
                ? 'Tutte'
                : status === 'published'
                ? 'Pubblicate'
                : 'Bozze'}
            </button>
          ))}
        </div>
      </div>

      {/* News List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredNews.length === 0 ? (
          <div className="p-8 text-center">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm || filterPublished !== 'all'
                ? 'Nessuna notizia trovata'
                : 'Nessuna notizia creata'}
            </p>
            <Link
              href="/area-riservata/news/nuovo"
              className="text-blue-600 hover:text-blue-800 font-semibold mt-4 inline-block"
            >
              Crea la prima notizia
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Titolo
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Stato
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Data
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredNews.map(item => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800">{item.title}</p>
                        <p className="text-sm text-gray-500 truncate">
                          {item.excerpt}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          item.published
                            ? 'bg-green-50 text-green-700'
                            : 'bg-yellow-50 text-yellow-700'
                        }`}
                      >
                        {item.published ? (
                          <>
                            <Eye size={14} />
                            Pubblicata
                          </>
                        ) : (
                          <>
                            <EyeOff size={14} />
                            Bozza
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(item.created_at).toLocaleDateString('it-IT')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleTogglePublish(item.id, item.published)}
                          disabled={togglingPublish === item.id}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 disabled:opacity-50"
                          title={item.published ? 'Nascondi' : 'Pubblica'}
                        >
                          {item.published ? (
                            <Eye size={18} />
                          ) : (
                            <EyeOff size={18} />
                          )}
                        </button>
                        <Link
                          href={`/area-riservata/news/nuovo?id=${item.id}`}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-blue-600"
                          title="Modifica"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={deleting === item.id}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-red-600 disabled:opacity-50"
                          title="Elimina"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
