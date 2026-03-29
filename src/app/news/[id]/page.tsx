'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ArrowLeft, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface NewsDetail {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image_url?: string;
  published_at: string;
  author_id: string;
}

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const supabase = createClient();
        const id = params.id as string;

        const { data, error: fetchError } = await supabase
          .from('news')
          .select('id, title, content, excerpt, image_url, published_at, author_id')
          .eq('id', id)
          .eq('published', true)
          .single();

        if (fetchError || !data) {
          setError('Notizia non trovata');
          return;
        }

        setNews(data);
      } catch (err) {
        setError('Errore nel caricamento della notizia');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchNews();
  }, [params.id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-lions-gold"></div>
          <p className="mt-4 text-gray-600">Caricamento notizia...</p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <>
        <section className="bg-gradient-to-r from-lions-navy to-lions-navy/80 text-white py-16">
          <div className="container max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold font-serif">Notizia non trovata</h1>
          </div>
        </section>
        <section className="section-padding bg-white">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <p className="text-gray-600 text-lg mb-8">
              {error || 'La notizia richiesta non esiste o non è stata pubblicata.'}
            </p>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 bg-lions-navy text-white rounded-lg hover:bg-lions-gold hover:text-lions-navy transition-all font-semibold"
            >
              <ArrowLeft size={18} />
              Torna alle News
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-24 overflow-hidden"
        style={{
          backgroundImage: news.image_url
            ? `url(${news.image_url})`
            : 'linear-gradient(135deg, #00338D 0%, #EBB700 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-lions-navy/75" />
        <div className="container max-w-4xl mx-auto px-4 relative z-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-lions-light-gold hover:text-white transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Tutte le News
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif leading-tight mb-4">
            {news.title}
          </h1>
          <div className="flex items-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar size={15} />
              {formatDate(news.published_at)}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container max-w-3xl mx-auto px-4">
          {news.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-lions-gold pl-6 italic">
              {news.excerpt}
            </p>
          )}

          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed news-content"
            dangerouslySetInnerHTML={{ __html: news.content || '<p>Contenuto non disponibile.</p>' }}
          />


          <div className="mt-16 pt-8 border-t border-gray-200 flex items-center justify-between">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-lions-gold hover:text-lions-navy transition-colors font-semibold"
            >
              <ArrowLeft size={18} />
              Torna alle News
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
