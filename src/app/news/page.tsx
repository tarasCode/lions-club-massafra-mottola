'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Newspaper } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Try to fetch from Supabase
        // This is a placeholder - will be replaced with actual Supabase integration
        // when backend is set up
        const placeholderNews: NewsItem[] = [
          {
            id: '1',
            title: 'Campagna di Raccolta Fondi per l\'Educazione',
            excerpt:
              'Il nostro club ha lanciato una campagna per raccogliere fondi a supporto di progetti educativi nella comunità locale.',
            date: '2026-03-20',
          },
          {
            id: '2',
            title: 'Visita del Governatore Distrettuale',
            excerpt:
              'Abbiamo avuto l\'onore di ospitare il Governatore Distrettuale che ha apprezzato i nostri service e ha condiviso le direttive internazionali.',
            date: '2026-03-10',
          },
          {
            id: '3',
            title: 'Progetto Ambiente: Pulizia del Territorio',
            excerpt:
              'Oltre 40 soci hanno partecipato alla giornata di pulizia ambientale, raccogliendo oltre una tonnellata di rifiuti.',
            date: '2026-02-28',
          },
          {
            id: '4',
            title: 'Nuova Iniziativa per la Sanità Comunitaria',
            excerpt:
              'Avvio di un nuovo progetto in collaborazione con le strutture sanitarie locali per supportare i servizi medici della comunità.',
            date: '2026-02-15',
          },
          {
            id: '5',
            title: 'Cerimonia di Benvenuto per Nuovi Soci',
            excerpt:
              'Tre nuovi soci sono stati formalmente investiti come membri del Lions Club Massafra-Mottola Le Cripte durante una cerimonia solenne.',
            date: '2026-02-01',
          },
          {
            id: '6',
            title: 'Partecipazione alla Festa Comunitaria',
            excerpt:
              'Il nostro club ha organizzato uno stand informativo durante la festa comunitaria locale, raggiungendo centinaia di visitatori.',
            date: '2026-01-20',
          },
        ];

        setNews(placeholderNews);
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
            <h1 className="text-5xl font-bold font-serif">Notizie e Aggiornamenti</h1>
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
