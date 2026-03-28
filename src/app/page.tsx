import Link from 'next/link';
import {
  Heart,
  Users,
  Globe,
  Eye,
  Lightbulb,
  Handshake,
  BookOpen,
  Zap,
} from 'lucide-react';

export default function Home() {
  const serviceAreas = [
    {
      title: 'Visione',
      icon: Eye,
      description: 'To be the global leader in community and humanitarian service',
    },
    {
      title: 'Gioventù',
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
      icon: Heart,
      description: 'Lotta alla fame e riduzione della povertà',
    },
    {
      title: 'Diritti Umani',
      icon: Users,
      description: 'Protezione e promozione dei diritti umani',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero relative h-screen bg-gradient-to-br from-lions-navy via-lions-navy to-lions-navy flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-lions-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-lions-light-gold rounded-full blur-3xl"></div>
        </div>

        <div className="hero-content relative z-10 px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 animate-fade-in-up">
            <div className="inline-block p-4 bg-lions-gold/20 rounded-full mb-6">
              <div className="w-20 h-20 rounded-full bg-lions-gold flex items-center justify-center shadow-lg">
                <span className="text-lions-navy font-bold text-4xl font-serif">L</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up font-serif">
            Lions Club Massafra-Mottola
          </h1>

          <p className="text-2xl sm:text-3xl text-lions-light-gold mb-8 font-serif animate-fade-in-up">
            "Noi Serviamo" - We Serve
          </p>

          <p className="text-lg sm:text-xl text-gray-200 mb-12 max-w-2xl mx-auto animate-fade-in-up">
            Impegnati nel servizio verso le comunità dal 1992. Organizzazione di
            Volontariato dedicata alla solidarietà, all'educazione e al benessere
            della comunità.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Link
              href="/chi-siamo"
              className="px-8 py-3 bg-lions-gold text-lions-navy font-bold rounded-lg hover:bg-lions-light-gold transition-all hover:shadow-lg hover:scale-105 inline-block"
            >
              Scopri di Più
            </Link>
            <Link
              href="/chi-siamo/diventa-socio"
              className="px-8 py-3 border-2 border-lions-light-gold text-lions-light-gold font-bold rounded-lg hover:bg-lions-light-gold hover:text-lions-navy transition-all hover:shadow-lg inline-block"
            >
              Diventa Socio
            </Link>
          </div>
        </div>
      </section>

      {/* Chi Siamo Section */}
      <section className="section-padding bg-lions-light-gray">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-lions-navy mb-4 font-serif">
              Chi Siamo
            </h2>
            <div className="w-24 h-1 bg-lions-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger">
            <div className="card text-center">
              <div className="text-5xl font-bold text-lions-gold mb-2 font-serif">
                1992
              </div>
              <h3 className="text-xl font-bold text-lions-navy mb-2">
                Fondazione
              </h3>
              <p className="text-gray-600">
                Il nostro club è stato fondato nel 1992 da un gruppo di 34 amici
                dedicati al servizio.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-5xl font-bold text-lions-gold mb-2 font-serif">
                ~60
              </div>
              <h3 className="text-xl font-bold text-lions-navy mb-2">Soci</h3>
              <p className="text-gray-600">
                Una comunità attiva di soci impegnati nel volontariato e nel
                servizio alla comunità.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-5xl font-bold text-lions-gold mb-2 font-serif">
                208
              </div>
              <h3 className="text-xl font-bold text-lions-navy mb-2">Paesi</h3>
              <p className="text-gray-600">
                Parte di Lions Clubs International, presente in 208 paesi e aree
                geografiche.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Service Areas */}
      <section className="section-padding bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-lions-navy mb-4 font-serif">
              Le 8 Aree di Servizio
            </h2>
            <div className="w-24 h-1 bg-lions-gold mx-auto"></div>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
              I Lions Clubs si impegnano in queste aree strategiche per creare un
              impatto positivo nelle comunità
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
            {serviceAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="card border-l-4 border-lions-gold hover:border-l-8 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <Icon className="w-8 h-8 text-lions-gold flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-lions-navy mb-2">
                        {area.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{area.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="section-padding bg-lions-light-gray">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-lions-navy mb-4 font-serif">
              Ultime News
            </h2>
            <div className="w-24 h-1 bg-lions-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-lions-navy to-lions-gold rounded-lg mb-4 flex items-center justify-center text-white text-center p-4">
                  <span className="opacity-50">Immagine News</span>
                </div>
                <h3 className="text-xl font-bold text-lions-navy mb-2">
                  Titolo della News #{item}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Descrizione breve della notizia. Ulteriori dettagli disponibili
                  nella sezione news completa.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">28 Marzo 2026</span>
                  <Link
                    href="/news"
                    className="text-lions-gold hover:text-lions-navy font-semibold text-sm transition-colors"
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
              className="px-8 py-3 bg-lions-navy text-white font-bold rounded-lg hover:bg-lions-gold hover:text-lions-navy transition-all inline-block"
            >
              Tutte le News
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-lions-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lions-gold rounded-full blur-3xl"></div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-serif animate-fade-in-up">
            Diventa Socio Lions
          </h2>
          <p className="text-xl text-lions-light-gold mb-12 max-w-2xl mx-auto animate-fade-in-up">
            Unisciti a una comunità di leader impegnati nel servizio verso la
            società. Scopri come puoi fare la differenza nella tua comunità.
          </p>

          <Link
            href="/chi-siamo/diventa-socio"
            className="px-8 py-4 bg-lions-gold text-lions-navy font-bold rounded-lg hover:bg-lions-light-gold transition-all inline-block hover:shadow-lg hover:scale-105 animate-fade-in-up"
          >
            Iscriviti Ora
          </Link>
        </div>
      </section>
    </>
  );
}
