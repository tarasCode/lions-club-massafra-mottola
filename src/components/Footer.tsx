import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lions-navy text-white mt-20 border-t-4 border-lions-gold">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/lions-logo.png" alt="Lions Club" className="w-10 h-10 rounded-full object-cover" />
              <h3 className="text-lions-light-gold text-lg font-bold">Lions Club</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              "Noi Serviamo" - We Serve. Impegnati nel servizio verso le comunità di Massafra e Mottola dal 1992.
            </p>
            <p className="text-lions-gold text-xs font-semibold tracking-widest">
              ODV - Organizzazione di Volontariato
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.06s' }}>
            <h3 className="text-lions-light-gold text-lg font-bold mb-6 pb-3 border-b border-lions-gold/30">
              Link Utili
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/chi-siamo"
                  className="text-gray-300 hover:text-lions-gold transition-colors duration-200 text-sm font-medium"
                >
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link
                  href="/chi-siamo/statuto"
                  className="text-gray-300 hover:text-lions-gold transition-colors duration-200 text-sm font-medium"
                >
                  Statuto
                </Link>
              </li>
              <li>
                <Link
                  href="/chi-siamo/regolamenti"
                  className="text-gray-300 hover:text-lions-gold transition-colors duration-200 text-sm font-medium"
                >
                  Regolamenti
                </Link>
              </li>
              <li>
                <Link
                  href="/chi-siamo/diventa-socio"
                  className="text-gray-300 hover:text-lions-gold transition-colors duration-200 text-sm font-medium"
                >
                  Diventa Socio
                </Link>
              </li>
            </ul>
          </div>

          {/* International & News */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.12s' }}>
            <h3 className="text-lions-light-gold text-lg font-bold mb-6 pb-3 border-b border-lions-gold/30">
              Comunità
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.lionsclubs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-lions-gold transition-colors duration-200 text-sm font-medium flex items-center gap-2"
                >
                  Lions International <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-300 hover:text-lions-gold transition-colors duration-200 text-sm font-medium"
                >
                  News e Comunicati
                </Link>
              </li>
              <li>
                <Link
                  href="/contatti"
                  className="text-gray-300 hover:text-lions-gold transition-colors duration-200 text-sm font-medium"
                >
                  Contatti
                </Link>
              </li>
              <li>
                <a
                  href="https://www.lionsclubs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-lions-gold transition-colors duration-200 text-sm font-medium"
                >
                  208 Paesi e Aree
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.18s' }}>
            <h3 className="text-lions-light-gold text-lg font-bold mb-6 pb-3 border-b border-lions-gold/30">
              Contatti
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="flex-shrink-0 mt-0.5 text-lions-gold" />
                <span className="text-gray-300">Massafra-Mottola<br/>Puglia, Italia</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="flex-shrink-0 mt-0.5 text-lions-gold" />
                <a
                  href="mailto:info@lionsclubmassafra.it"
                  className="text-gray-300 hover:text-lions-gold transition-colors duration-200"
                >
                  info@lionsclubmassafra.it
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="flex-shrink-0 mt-0.5 text-lions-gold" />
                <a
                  href="tel:+39099123456"
                  className="text-gray-300 hover:text-lions-gold transition-colors duration-200"
                >
                  +39 (0)99 123 456
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-lions-gold/20 pt-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-400">
            <div className="animate-fade-in-up">
              <p className="flex items-center gap-1">
                <span>&copy; {currentYear} Lions Club Massafra-Mottola Le Cripte ODV.</span>
                <span className="text-lions-gold">Tutti i diritti riservati.</span>
              </p>
            </div>
            <div className="md:text-right animate-fade-in-up" style={{ animationDelay: '0.06s' }}>
              <p className="flex items-center justify-start md:justify-end gap-1">
                Fatto con{' '}
                <Heart size={14} className="text-lions-gold inline" />
                {' '}per la comunità. Parte di{' '}
                <a
                  href="https://www.lionsclubs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lions-gold hover:text-lions-light-gold transition-colors"
                >
                  Lions International
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
