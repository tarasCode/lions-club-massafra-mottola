'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Newspaper } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image_url?: string;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const supabase = createClient();

        const { data, error: fetchError } = await supabase
          .from('news')
          .select('id, title, excerpt, published_at, image_url')
          .eq('published', true)
          .order('published_at', { ascending: false });

        if (fetchError) throw fetchError;

        const mappedNews: NewsItem[] = (data || []).map((item: any) => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt || '',
          date: item.published_at || new Date().toISOString(),
          image_url: item.image_url,
        }));

        setNews(mappedNews);
      } catch (err) {
        setError(
          'Impossibile caricare le notizie. Per favore, riprova più tardi.'
        );
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const getYears = () => {
    const years = new Set<string>();
    news.forEach(item => {
      const year = new Date(item.date).getFullYear().toString();
      years.add(year);
    });
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  };

  const filteredNews = news.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchFilter.toLowerCase());

    const itemYear = new Date(item.date).getFullYear().toString();
    const matchesYear = !yearFilter || itemYear === yearFilter;

    return matchesSearch && matchesYear;
  });

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-lions-navy to-lions-navy/80 text-white py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Newspaper size={32} className="text-lions-gold" />
            <h1 className="text-5xl font-bold font-serif text-white">Notizie e Aggiornamenti</h1>
          </div>
          <p className="text-xl text-lions-light-gold">
            Rimani aggiornato sulle attività e i service del nostro club
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="section-padding bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Filter Bar */}
          {!loading && news.length > 0 && (
            <div className="mb-12 bg-lions-light-gray rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search Filter */}
                <div>
                  <label className="block text-sm font-semibold text-lions-navy mb-2">
                    Cerca
                  </label>
                  <input
                    type="text"
                    placeholder="Cerca per titolo o contenuto..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lions-gold"
                  />
                </div>

                {/* Year Filter */}
                <div>
                  <label className="block text-sm font-semibold text-lions-navy mb-2">
                    Anno
                  </label>
                  <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lions-gold"
                  >
                    <option value="">Tutti gli anni</option>
                    {getYears().map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lions-gold"></div>
              </div>
              <p className="mt-4 text-gray-600">Caricamento notizie...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-lions-light-gray rounded-lg">
              <p className="text-red-600 font-semibold">{error}</p>
              <p className="text-gray-600 mt-2">
                Le notizie saranno disponibili presto. Contattaci per aggiornamenti.
              </p>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-16">
              <Newspaper size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">
                Nessuna notizia disponibile al momento
              </p>
              <p className="text-gray-500 mt-2">
                Torna a visitare presto per gli ultimi aggiornamenti
              </p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-16">
              <Newspaper size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">
                Nessuna notizia corrisponde ai filtri selezionati
              </p>
              <p className="text-gray-500 mt-2">
                Prova a modificare i criteri di ricerca
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger">
                {filteredNews.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="card overflow-hidden group h-full flex flex-col no-underline cursor-pointer"
                  >
                    {/* Image */}
                    <div
                      className="h-48 rounded-lg mb-4 flex items-center justify-center text-white text-center p-4 group-hover:shadow-lg transition-all relative overflow-hidden"
                      style={{
                        backgroundImage: item.image_url
                          ? `url(${item.image_url})`
                          : 'linear-gradient(135deg, #00338D 0%, #EBB700 100%)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      {!item.image_url && (
                        <span className="opacity-50 font-serif text-lg relative z-10">
                          Notizia
                        </span>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-lions-navy/40 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-lg sm:text-xl font-bold text-lions-navy mb-3 group-hover:text-lions-gold transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 flex-grow">
                        {item.excerpt}
                      </p>

                      {/* Date and Read More */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar size={14} />
                          {formatDate(item.date)}
                        </div>
                        <span className="text-lions-gold group-hover:text-lions-navy font-semibold text-sm transition-colors">
                          Leggi →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination Info */}
              <div className="text-center mt-16 pt-8 border-t border-gray-200">
                <p className="text-gray-600 mb-4">
                  Mostrando {filteredNews.length} {filteredNews.length === 1 ? 'notizia' : 'notizie'} {news.length > filteredNews.length ? `(di ${news.length})` : ''}
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-lions-light-gray">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-lions-navy mb-4 font-serif">
            Non Perdere le Novità
          </h2>
          <p className="text-gray-600 mb-8">
            Contattaci per iscriverti alle nostre comunicazioni e ricevere gli
            aggiornamenti delle attività del club direttamente via email.
          </p>
          <Link
            href="/contatti"
            className="px-8 py-3 bg-lions-navy text-white font-bold rounded-lg hover:bg-lions-gold hover:text-lions-navy transition-all inline-block"
          >
            Rimanere Aggiornato
          </Link>
        </div>
      </section>
    </>
  );
}
