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
} from 'lucide-react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [stats, setStats] = useState({ founded: 0, members: 0, countries: 0, beneficiaries: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    },
    {
      title: 'Gioventù & Educazione',
      icon: Zap,
      description: 'Supporto ai giovani e alle future generazioni',
    },
    {
      title: 'Sanità',
      icon: Heart,
      description: 'Programmi per la salute e il benessere della comunità',
    },
    {
      title: 'Ambiente',
      icon: Globe,
      description: 'Protezione e conservazione dell\'ambiente naturale',
    },
    {
      title: 'Istruzione',
      icon: BookOpen,
      description: 'Promozione dell\'educazione e dello sviluppo personale',
    },
    {
      title: 'Comunità',
      icon: Handshake,
      description: 'Sviluppo sostenibile delle comunità locali',
    },
    {
      title: 'Fame e Povertà',
      icon: Target,
      description: 'Lotta alla fame e riduzione della povertà',
    },
    {
      title: 'Diritti Umani',
      icon: Users,
      description: 'Protezione e promozione dei diritti umani',
    },
  ];

  const achievements = [
    { number: 1992, label: 'Anno di Fondazione', icon: '📅' },
    { number: 60, label: 'Soci Attivi', icon: '👥' },
    { number: 208, label: 'Paesi Aderenti', icon: '🌍' },
    { number: 45000, label: 'Beneficiari Aiutati', icon: '❤️' },
  ];

  return (
    <>
      {/* Hero Jumbotron Section */}
      <section className="hero relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(135deg, #003366 0%, #1a4d7a 25%, #003366 50%, #1a4d7a 75%, #003366 100%),
              radial-gradient(circle at 20% 50%, rgba(200, 169, 81, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(200, 169, 81, 0.15) 0%, transparent 50%)
            `,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />

        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] z-1" style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(200, 169, 81, 0.1) 35px, rgba(200, 169, 81, 0.1) 70px)
          `,
        }} />

        {/* Hero content */}
        <div className="hero-content relative z-10 px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          {/* Emblem */}
          <div className="hero-emblem animate-scale-in-up mb-8">
            L
          </div>

          {/* Main title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 animate-fade-in-up font-serif tracking-tight">
            LIONS CLUB
          </h1>

          {/* Subtitle */}
          <p className="text-2xl sm:text-3xl text-lions-light-gold mb-6 font-serif animate-fade-in-up font-bold">
            Massafra-Mottola "Le Cripte" ODV
          </p>

          {/* Tagline */}
          <div className="h-1 w-32 bg-gradient-to-r from-lions-gold to-lions-light-gold mx-auto mb-8 animate-fade-in-up" />

          <p className="text-xl sm:text-2xl text-lions-light-gold mb-4 font-serif animate-fade-in-up italic">
            "Noi Serviamo" - We Serve
          </p>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            Dal 1992, impegnati nel servizio verso le comunità. Organizzazione di Volontariato dedicata
            alla solidarietà, all'educazione e al benessere della comunità di Massafra e Mottola.
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

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span className="text-sm font-medium">Scorri per continuare</span>
          <ChevronDown className="animate-scroll-arrow" />
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="section-padding bg-white border-t-4 border-lions-gold">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="text-5xl mb-2">{achievement.icon}</div>
                <div className="counter mb-2">
                  {achievement.number.toLocaleString('it-IT')}
                </div>
                <p className="text-lg text-lions-navy font-semibold">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* I Nostri Service Highlight Section */}
      <section className="section-padding bg-gradient-to-br from-lions-light-gray to-white" data-animate>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
            {serviceAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="card card-lift card-border-accent group"
                >
                  <div className="flex flex-col items-start">
                    <div className="p-3 bg-lions-gold/10 rounded-lg mb-4 group-hover:bg-lions-gold/20 transition-colors duration-200">
                      <Icon className="w-6 h-6 text-lions-gold group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <h3 className="text-lg font-bold text-lions-navy mb-2">
                      {area.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="section-padding bg-lions-light-gray" data-animate>
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-lions-navy mb-4 font-serif">
              Ultime News
            </h2>
            <div className="accent-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card card-lift overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-lions-navy via-lions-gold/40 to-lions-gold rounded-lg mb-6 flex items-center justify-center text-white text-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-lions-navy/50 to-transparent" />
                  <span className="relative text-lg font-bold">News #{item}</span>
                </div>
                <h3 className="text-xl font-bold text-lions-navy mb-2">
                  Titolo della News #{item}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Descrizione breve della notizia. Ulteriori dettagli disponibili
                  nella sezione news completa.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500 font-medium">28 Marzo 2026</span>
                  <Link
                    href="/news"
                    className="text-lions-gold hover:text-lions-navy font-bold text-sm transition-colors duration-150"
                  >
                    Leggi →
                  </Link>
                </div>
              </div>
            ))}
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

      {/* CTA Section */}
      <section className="section-padding bg-lions-navy relative overflow-hidden" data-animate>
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-[0.08] z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lions-gold rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lions-gold rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

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
