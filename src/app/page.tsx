'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Heart,
  Users,
  Globe,
  Eye,
  Lightbulb,
  Handshake,
  BookOpen,
  Zap,
  ChevronDown,
  Award,
  Target,
  Calendar,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { siteConfig } from '@/lib/siteConfig';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  published_at: string;
  image_url?: string;
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [stats, setStats] = useState({ founded: 0, members: 0, countries: 0, beneficiaries: 0 });
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch latest news from Supabase
  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('news')
          .select('id, title, excerpt, published_at, image_url')
          .eq('published', true)
          .order('published_at', { ascending: false })
          .limit(3);

        if (!error && data) {
          setLatestNews(data);
        }
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };

    fetchLatestNews();
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Animate counters
  useEffect(() => {
    const animateCounter = (setter: (v: any) => void) => {
      let founded = 0, members = 0, countries = 0, beneficiaries = 0;
      const interval = setInterval(() => {
        if (founded < 1992) founded = Math.min(founded + 20, 1992);
        if (members < 60) members = Math.min(members + 1, 60);
        if (countries < 208) countries = Math.min(countries + 2, 208);
        if (beneficiaries < 45000) beneficiaries = Math.min(beneficiaries + 500, 45000);

        if (founded === 1992 && members === 60 && countries === 208 && beneficiaries === 45000) {
          clearInterval(interval);
        }
        setter({ founded, members, countries, beneficiaries });
      }, 16);
    };

    animateCounter(setStats);
  }, []);

  const serviceAreas = [
    {
      title: 'Visione Globale',
      icon: Eye,
      description: 'Leader globale nel servizio comunitario e umanitario',
      image: siteConfig.serviceImages.visione,
    },
    {
      title: 'Gioventù & Educazione',
      icon: Zap,
      description: 'Supporto ai giovani e alle future generazioni',
      image: siteConfig.serviceImages.gioventu,
    },
    {
      title: 'Sanità',
      icon: Heart,
      description: 'Programmi per la salute e il benessere della comunità',
      image: siteConfig.serviceImages.sanita,
    },
    {
      title: 'Ambiente',
      icon: Globe,
      description: 'Protezione e conservazione dell\'ambiente naturale',
      image: siteConfig.serviceImages.ambiente,
    },
    {
      title: 'Istruzione',
      icon: BookOpen,
      description: 'Promozione dell\'educazione e dello sviluppo personale',
      image: siteConfig.serviceImages.istruzione,
    },
    {
      title: 'Comunità',
      icon: Handshake,
      description: 'Sviluppo sostenibile delle comunità locali',
      image: siteConfig.serviceImages.comunita,
    },
    {
      title: 'Fame e Povertà',
      icon: Target,
      description: 'Lotta alla fame e riduzione della povertà',
      image: siteConfig.serviceImages.fame,
    },
    {
      title: 'Diritti Umani',
      icon: Users,
      description: 'Protezione e promozione dei diritti umani',
      image: siteConfig.serviceImages.diritti,
    },
  ];

  const achievements = [
    { number: 1992, label: 'Anno di Fondazione' },
    { number: 60, label: 'Soci Attivi' },
    { number: 208, label: 'Paesi Aderenti' },
    { number: 45000, label: 'Beneficiari Aiutati' },
  ];

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
      {/* Hero Jumbotron Section with Background Image */}
      <section className="hero relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${siteConfig.hero.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 z-1 bg-lions-navy/75" />
        {/* Gold accent radials */}
        <div
          className="absolute inset-0 z-2 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(200, 169, 81, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(200, 169, 81, 0.1) 0%, transparent 50%)
            `,
          }}
        />

        {/* Hero content */}
        <div className="hero-content relative z-10 px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          {/* Emblem */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lions-logo.png"
            alt="Lions Club International"
            className="w-32 h-32 object-contain mx-auto mb-8 animate-scale-in-up drop-shadow-2xl"
          />

          {/* Main title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 animate-fade-in-up font-serif tracking-tight">
            {siteConfig.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-2xl sm:text-3xl text-lions-light-gold mb-6 font-serif animate-fade-in-up font-bold">
            {siteConfig.hero.subtitle}
          </p>

          {/* Tagline */}
          <div className="h-1 w-32 bg-gradient-to-r from-lions-gold to-lions-light-gold mx-auto mb-8 animate-fade-in-up" />

          <p className="text-xl sm:text-2xl text-lions-light-gold mb-4 font-serif animate-fade-in-up italic">
            {siteConfig.hero.motto}
          </p>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            {siteConfig.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Link
              href="/chi-siamo"
              className="btn btn-primary"
            >
              Scopri di Più
            </Link>
            <Link
              href="/chi-siamo/diventa-socio"
              className="btn btn-outline"
            >
              Diventa Socio
            </Link>
          </div>
        </div>

        {/* Scroll indicator with bouncing animation */}
        <div className="scroll-indicator">
          <span className="text-sm font-medium">Scorri</span>
          <div className="scroll-arrow-container">
            <ChevronDown className="scroll-chevron" />
            <ChevronDown className="scroll-chevron scroll-chevron-delayed" />
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="section-padding bg-white border-t-4 border-lions-gold">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="counter mb-2">
                  {index === 0 ? stats.founded.toLocaleString('it-IT')
                    : index === 1 ? stats.members.toLocaleString('it-IT')
                    : index === 2 ? stats.countries.toLocaleString('it-IT')
                    : stats.beneficiaries.toLocaleString('it-IT')}
                </div>
                <p className="text-lg text-lions-navy font-semibold">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas - Material Design Tiles with Background Photos */}
      <section className="section-padding bg-lions-light-gray" data-animate>
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-lions-navy mb-4 font-serif">
              I Nostri Service
            </h2>
            <div className="accent-divider" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Otto aree strategiche di impegno per creare un impatto positivo nelle comunità
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
            {serviceAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="service-tile group"
                >
                  {/* Background image */}
                  <div
                    className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${area.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 z-1 bg-lions-navy/60 group-hover:bg-lions-navy/50 transition-colors duration-300" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-start h-full justify-end">
                    <div className="p-2.5 bg-lions-gold/90 rounded-lg mb-3 shadow-lg">
                      <Icon className="w-5 h-5 text-lions-navy" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1.5">
                      {area.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest News Section - fetches from DB */}
      <section className="section-padding bg-white" data-animate>
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-lions-navy mb-4 font-serif">
              Ultime News
            </h2>
            <div className="accent-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger">
            {latestNews.length > 0 ? (
              latestNews.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`} className="card card-lift overflow-hidden block no-underline cursor-pointer group">
                  <div
                    className="h-48 rounded-lg mb-6 flex items-center justify-center text-white text-center p-6 relative overflow-hidden"
                    style={{
                      backgroundImage: item.image_url
                        ? `url(${item.image_url})`
                        : 'linear-gradient(135deg, #00338D 0%, #EBB700 100%)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-lions-navy/70 to-transparent" />
                  </div>
                  <h3 className="text-xl font-bold text-lions-navy mb-2 group-hover:text-lions-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar size={14} />
                      {formatDate(item.published_at)}
                    </div>
                    <span className="text-lions-gold group-hover:text-lions-navy font-bold text-sm transition-colors duration-150">
                      Leggi →
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              [1, 2, 3].map((item) => (
                <div key={item} className="card card-lift overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-lions-navy via-lions-gold/40 to-lions-gold rounded-lg mb-6 flex items-center justify-center text-white text-center p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-lions-navy/50 to-transparent" />
                    <span className="relative text-lg font-bold">News #{item}</span>
                  </div>
                  <h3 className="text-xl font-bold text-lions-navy mb-2">
                    Prossimamente
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Le ultime notizie del club saranno disponibili qui.
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500 font-medium">In arrivo</span>
                    <Link
                      href="/news"
                      className="text-lions-gold hover:text-lions-navy font-bold text-sm transition-colors duration-150"
                    >
                      News →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/news"
              className="btn btn-secondary"
            >
              Tutte le News
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section with background image */}
      <section className="section-padding relative overflow-hidden" data-animate>
        {/* Background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${siteConfig.ctaImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 z-1 bg-lions-navy/85" />

        <div className="container max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-serif animate-fade-in-up">
            Unisciti ai Lions
          </h2>
          <p className="text-xl text-lions-light-gold mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Diventa parte di una comunità globale di leader impegnati nel servizio verso la società.
            Scopri come puoi fare la differenza nella tua comunità.
          </p>

          <Link
            href="/chi-siamo/diventa-socio"
            className="btn btn-primary animate-fade-in-up"
          >
            Diventa Socio Oggi
          </Link>
        </div>
      </section>
    </>
  );
}
