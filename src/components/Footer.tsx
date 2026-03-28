import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lions-navy text-white mt-20">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-lions-light-gold text-lg font-bold mb-4 border-b border-lions-light-gold pb-2">
              Lions Club Massafra-Mottola
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              "Noi Serviamo" - We Serve. Impegnati nel servizio verso le comunità di Massafra e Mottola dal 1992.
            </p>
            <p className="text-gray-400 text-xs">
              ODV - Organizzazione di Volontariato
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lions-light-gold text-lg font-bold mb-4 border-b border-lions-light-gold pb-2">
              Link Utili
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/chi-siamo"
                  className="text-gray-300 hover:text-lions-gold transition-colors text-sm"
                >
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link
                  href="/chi-siamo/statuto"
                  className="text-gray-300 hover:text-lions-gold transition-colors text-sm"
                >
                  Statuto
                </Link>
              </li>
              <li>
                <Link
                  href="/chi-siamo/regolamenti"
                  className="text-gray-300 hover:text-lions-gold transition-colors text-sm"
                >
                  Regolamenti
                </Link>
              </li>
              <li>
                <a
                  href="https://www.lionsclubs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-lions-gold transition-colors text-sm flex items-center gap-1"
                >
                  Lions International <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lions-light-gold text-lg font-bold mb-4 border-b border-lions-light-gold pb-2">
              Contatti
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-0.5 text-lions-light-gold" />
                <span className="text-gray-300">Massafra-Mottola, Puglia, Italia</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={16} className="flex-shrink-0 mt-0.5 text-lions-light-gold" />
                <a
                  href="mailto:info@lionsclubmassafra.it"
                  className="text-gray-300 hover:text-lions-gold transition-colors"
                >
                  info@lionsclubmassafra.it
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={16} className="flex-shrink-0 mt-0.5 text-lions-light-gold" />
                <a
                  href="tel:+39099123456"
                  className="text-gray-300 hover:text-lions-gold transition-colors"
                >
                  +39 (0)99 123 456
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-400">
            <div>
              <p>&copy; {currentYear} Lions Club Massafra-Mottola Le Cripte ODV. Tutti i diritti riservati.</p>
            </div>
            <div className="md:text-right">
              <p>
                Parte di{' '}
                <a
                  href="https://www.lionsclubs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lions-gold hover:text-lions-light-gold transition-colors"
                >
                  Lions Clubs International
                </a>
                {' '}- 208 paesi e aree geografiche
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
