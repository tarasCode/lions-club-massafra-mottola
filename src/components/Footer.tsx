import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lions-dark-navy text-white">
      {/* Gold accent bar */}
      <div className="h-1 bg-lions-gold" />

      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/lions-logo.png" alt="Lions Club" className="w-12 h-12 object-contain" />
              <div>
                <h3 className="text-white text-base font-bold leading-tight">Lions Club</h3>
                <p className="text-lions-gold text-xs font-semibold">Massafra-Mottola Le Cripte</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              &quot;Noi Serviamo&quot; - We Serve. Impegnati nel servizio verso le comunità di Massafra e Mottola dal 1992.
            </p>
            <p className="text-lions-gold text-xs font-semibold tracking-widest uppercase">
              ODV - Organizzazione di Volontariato
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.06s' }}>
            <h3 className="text-white text-sm font-bold mb-5 pb-3 border-b-2 border-lions-gold uppercase tracking-wider">
              Link Utili
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/chi-siamo"
                  className="text-gray-400 hover:text-lions-gold transition-colors duration-200 text-sm"
                >
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link
                  href="/chi-siamo/statuto"
                  className="text-gray-400 hover:text-lions-gold transition-colors duration-200 text-sm"
                >
                  Statuto
                </Link>
              </li>
              <li>
                <Link
                  href="/chi-siamo/regolamenti"
                  className="text-gray-400 hover:text-lions-gold transition-colors duration-200 text-sm"
                >
                  Regolamenti
                </Link>
              </li>
              <li>
                <Link
                  href="/chi-siamo/diventa-socio"
                  className="text-gray-400 hover:text-lions-gold transition-colors duration-200 text-sm"
                >
                  Diventa Socio
                </Link>
              </li>
            </ul>
          </div>

          {/* International & News */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.12s' }}>
            <h3 className="text-white text-sm font-bold mb-5 pb-3 border-b-2 border-lions-gold uppercase tracking-wider">
              Comunità
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.lionsclubs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-lions-gold transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  Lions International <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.lionsclubs.org/it/lcif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-lions-gold transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  LCIF Foundation <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-400 hover:text-lions-gold transition-colors duration-200 text-sm"
                >
                  News e Comunicati
                </Link>
              </li>
              <li>
                <Link
                  href="/contatti"
                  className="text-gray-400 hover:text-lions-gold transition-colors duration-200 text-sm"
                >
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.18s' }}>
            <h3 className="text-white text-sm font-bold mb-5 pb-3 border-b-2 border-lions-gold uppercase tracking-wider">
              Contatti
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="flex-shrink-0 mt-0.5 text-lions-gold" />
                <span className="text-gray-400">Massafra-Mottola<br/>Puglia, Italia</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="flex-shrink-0 mt-0.5 text-lions-gold" />
                <a
                  href="mailto:info@lionsclubmassafra.it"
                  className="text-gray-400 hover:text-lions-gold transition-colors duration-200"
                >
                  info@lionsclubmassafra.it
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="flex-shrink-0 mt-0.5 text-lions-gold" />
                <a
                  href="tel:+39099123456"
                  className="text-gray-400 hover:text-lions-gold transition-colors duration-200"
                >
                  +39 (0)99 123 456
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>
              &copy; {currentYear} Lions Club Massafra-Mottola Le Cripte ODV.{' '}
              <span className="text-lions-gold">Tutti i diritti riservati.</span>
            </p>
            <p className="flex items-center gap-1">
              Fatto con <Heart size={12} className="text-lions-gold" /> per la comunità &middot; Parte di{' '}
              <a
                href="https://www.lionsclubs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lions-gold hover:text-yellow-400 transition-colors"
              >
                Lions International
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
