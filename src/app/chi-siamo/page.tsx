import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ChiSiamo() {
  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-lions-navy to-lions-navy/80 text-white py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl font-bold mb-4 font-serif text-white">Chi Siamo</h1>
            <p className="text-xl text-lions-light-gold">
              La storia, la missione e i valori del Lions Club Massafra-Mottola
            </p>
          </div>
        </div>
      </section>

      {/* Chi Sono i Lions */}
      <section className="section-padding bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl font-bold text-lions-navy mb-6 font-serif">
                Chi Sono i Lions
              </h2>
              <div className="h-1 w-24 bg-lions-gold mb-6"></div>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Lions Clubs International è l'organizzazione di Club di Servizio
                più grande del Mondo.
              </p>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Conta quasi <span className="font-bold text-lions-navy">1.400.000 soci</span> distribuiti in
                più di <span className="font-bold text-lions-navy">45.000 club</span> diffusi in{' '}
                <span className="font-bold text-lions-navy">208 paesi e aree geografiche</span>.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                I Lions si impegnano nel servizio verso le comunità, con focus su
                educazione, sanità, ambiente, e riduzione della povertà.
              </p>
            </div>

            <div className="animate-slide-in-right">
              <div className="bg-lions-light-gray rounded-lg p-8 border-l-8 border-lions-gold">
                <h3 className="text-2xl font-bold text-lions-navy mb-6 font-serif">
                  I Nostri Valori
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-lions-gold mt-2"></span>
                    <span className="text-gray-700">
                      <strong>Servizio:</strong> Dedizione al benessere della comunità
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-lions-gold mt-2"></span>
                    <span className="text-gray-700">
                      <strong>Integrità:</strong> Onestà e trasparenza in ogni azione
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-lions-gold mt-2"></span>
                    <span className="text-gray-700">
                      <strong>Solidarietà:</strong> Lavoro unitario per il bene comune
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-lions-gold mt-2"></span>
                    <span className="text-gray-700">
                      <strong>Inclusione:</strong> Aperti a tutti, senza discriminazioni
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* La Storia */}
      <section className="section-padding bg-lions-light-gray">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-lions-navy mb-6 font-serif text-center">
            La Storia dei Lions
          </h2>
          <div className="w-24 h-1 bg-lions-gold mx-auto mb-16"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="bg-lions-navy text-white rounded-lg p-8">
                <h3 className="text-3xl font-bold mb-4 font-serif">1917</h3>
                <p className="text-lg mb-4 leading-relaxed">
                  Tutto inizia a Chicago quando Melvin Jones, un giovane
                  imprenditore, propone ai suoi colleghi un nuovo ideale: un
                  club di servizio che andasse oltre gli affari personali.
                </p>
                <p className="text-lg leading-relaxed">
                  Il primo Lions Club viene fondato il 17 giugno 1917, dando vita
                  a quello che sarebbe diventato il movimento di servizio più grande
                  del mondo.
                </p>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <div className="space-y-6">
                <div className="border-l-4 border-lions-gold pl-6 py-2">
                  <h4 className="text-xl font-bold text-lions-navy mb-2">1920s-1930s</h4>
                  <p className="text-gray-600">
                    Rapida espansione internazionale dei Lions Club in tutto il mondo
                  </p>
                </div>

                <div className="border-l-4 border-lions-gold pl-6 py-2">
                  <h4 className="text-xl font-bold text-lions-navy mb-2">1945</h4>
                  <p className="text-gray-600">
                    I Lions partecipano alla fondazione delle Nazioni Unite
                  </p>
                </div>

                <div className="border-l-4 border-lions-gold pl-6 py-2">
                  <h4 className="text-xl font-bold text-lions-navy mb-2">Oggi</h4>
                  <p className="text-gray-600">
                    Oltre 1.4 milioni di soci in 208 paesi operano per il bene
                    comune
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Il Club Massafra-Mottola */}
      <section className="section-padding bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-lions-navy mb-6 font-serif text-center">
            Lions Club Massafra-Mottola Le Cripte
          </h2>
          <div className="w-24 h-1 bg-lions-gold mx-auto mb-16"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="bg-lions-light-gray rounded-lg p-8">
                <h3 className="text-2xl font-bold text-lions-navy mb-4 font-serif">
                  Fondazione: 1992
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Il nostro club è nato nel 1992 da un gruppo di <strong>34 amici</strong> che
                  credevano nel potere del servizio volontario.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Situato nel cuore della Puglia, il club copre le due comunità di
                  Massafra e Mottola, con circa <strong>60 soci attivi</strong> impegnati in
                  diversi progetti di servizio.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Il nome "Le Cripte" richiama i luoghi storici e culturali della
                  nostra zona, simboleggiando le nostre radici e il nostro impegno
                  verso il territorio.
                </p>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="space-y-6">
                <div className="card">
                  <h4 className="text-lg font-bold text-lions-navy mb-2">
                    Territorio di Azione
                  </h4>
                  <p className="text-gray-600">
                    Massafra e Mottola, province di Taranto, Puglia
                  </p>
                </div>

                <div className="card">
                  <h4 className="text-lg font-bold text-lions-navy mb-2">
                    Numero Soci
                  </h4>
                  <p className="text-gray-600">Circa 60 soci attivi</p>
                </div>

                <div className="card">
                  <h4 className="text-lg font-bold text-lions-navy mb-2">
                    Fondazione
                  </h4>
                  <p className="text-gray-600">17 Giugno 1992</p>
                </div>

                <div className="card">
                  <h4 className="text-lg font-bold text-lions-navy mb-2">
                    Status
                  </h4>
                  <p className="text-gray-600">
                    Organizzazione di Volontariato (ODV)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* I Nostri Service */}
      <section className="section-padding bg-lions-light-gray">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-lions-navy mb-6 font-serif text-center">
            I Nostri Service
          </h2>
          <div className="w-24 h-1 bg-lions-gold mx-auto mb-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger">
            <div className="card border-l-4 border-lions-gold">
              <h3 className="text-xl font-bold text-lions-navy mb-4">Service Territoriali</h3>
              <p className="text-gray-600">
                Progetti diretti a favore delle comunità di Massafra e Mottola,
                con focus su educazione, sanità e supporto ai bisognosi.
              </p>
            </div>

            <div className="card border-l-4 border-lions-gold">
              <h3 className="text-xl font-bold text-lions-navy mb-4">Service di Distretto</h3>
              <p className="text-gray-600">
                Partecipazione a iniziative a livello di Distretto Lions,
                coordinandoci con altri club della regione.
              </p>
            </div>

            <div className="card border-l-4 border-lions-gold">
              <h3 className="text-xl font-bold text-lions-navy mb-4">Service Nazionali</h3>
              <p className="text-gray-600">
                Contributo a programmi nazionali dei Lions, come iniziative sulla
                disabilità, l'ambiente e l'educazione.
              </p>
            </div>

            <div className="card border-l-4 border-lions-gold">
              <h3 className="text-xl font-bold text-lions-navy mb-4">Service Internazionali</h3>
              <p className="text-gray-600">
                Supporto a progetti globali di Lions International, collaborando
                per cause umanitarie mondiali.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-sections Navigation */}
      <section className="section-padding bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-lions-navy mb-6 font-serif text-center">
            Approfondimenti
          </h2>
          <div className="w-24 h-1 bg-lions-gold mx-auto mb-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger">
            <Link href="/chi-siamo/statuto">
              <div className="card group cursor-pointer h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-lions-navy group-hover:text-lions-gold transition-colors">
                    Statuto
                  </h3>
                  <ArrowRight className="text-lions-gold group-hover:translate-x-2 transition-transform" />
                </div>
                <p className="text-gray-600">
                  I principi fondamentali e le regole che governano il nostro club.
                </p>
              </div>
            </Link>

            <Link href="/chi-siamo/regolamenti">
              <div className="card group cursor-pointer h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-lions-navy group-hover:text-lions-gold transition-colors">
                    Regolamenti
                  </h3>
                  <ArrowRight className="text-lions-gold group-hover:translate-x-2 transition-transform" />
                </div>
                <p className="text-gray-600">
                  Norme operative e procedure interne del Lions Club Massafra-Mottola.
                </p>
              </div>
            </Link>

            <Link href="/chi-siamo/diventa-socio">
              <div className="card group cursor-pointer h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-lions-navy group-hover:text-lions-gold transition-colors">
                    Diventa Socio
                  </h3>
                  <ArrowRight className="text-lions-gold group-hover:translate-x-2 transition-transform" />
                </div>
                <p className="text-gray-600">
                  Scopri come unirti al nostro club e iniziare il tuo percorso di
                  servizio.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
