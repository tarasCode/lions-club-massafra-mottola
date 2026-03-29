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
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger">
                {news.map((item) => (
                  <article
                    key={item.id}
                    className="card overflow-hidden group h-full flex flex-col"
                  >
                    {/* Image Placeholder */}
                    <div className="h-48 bg-gradient-to-br from-lions-navy to-lions-gold rounded-lg mb-4 flex items-center justify-center text-white text-center p-4 group-hover:shadow-lg transition-all">
                      <span className="opacity-50 font-serif text-lg">
                        Notizia
                      </span>
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
                        <Link
                          href={`/news/${item.id}`}
                          className="text-lions-gold hover:text-lions-navy font-semibold text-sm transition-colors"
                        >
                          Leggi →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination Info */}
              <div className="text-center mt-16 pt-8 border-t border-gray-200">
                <p className="text-gray-600 mb-4">
                  Mostrando {news.length} notizie
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
