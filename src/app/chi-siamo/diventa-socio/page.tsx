import Link from 'next/link';
import { Heart, Users, Zap, Globe, TrendingUp, Award } from 'lucide-react';

export default function DivientaSocio() {
  const benefits = [
    {
      icon: Heart,
      title: 'Fare la Differenza',
      description: 'Contribuire direttamente al benessere della tua comunità attraverso azioni concrete e progetti significativi.',
    },
    {
      icon: Users,
      title: 'Comunità di Leader',
      description: 'Conoscerai e collaborerai con individui di calibro morale e professionale eccellente provenienti da diversi ambiti.',
    },
    {
      icon: Globe,
      title: 'Rete Globale',
      description: 'Accesso a una rete mondiale di oltre 1.4 milioni di Lions in 208 paesi e aree geografiche.',
    },
    {
      icon: Zap,
      title: 'Crescita Personale',
      description: 'Sviluppare competenze di leadership, gestione di progetti e lavoro di squadra in un ambiente stimolante.',
    },
    {
      icon: TrendingUp,
      title: 'Impatto Misurabile',
      description: 'Vedere i risultati concreti dei tuoi sforzi e contribuire a cambimenti tangibili nel territorio.',
    },
    {
      icon: Award,
      title: 'Riconoscimento',
      description: 'Essere parte di un\'organizzazione prestigiosa con oltre 100 anni di storia e tradizione di eccellenza.',
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-lions-navy to-lions-navy/80 text-white py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 font-serif">Perché Diventare Socio</h1>
          <p className="text-xl text-lions-light-gold">
            Unisciti a una comunità di leader impegnati nel servizio e nel volontariato
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-lions-navy mb-6 font-serif text-center">
            I Vantaggi di Essere un Leo/Lion
          </h2>
          <div className="w-24 h-1 bg-lions-gold mx-auto mb-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="card">
                  <div className="flex items-start gap-4">
                    <Icon className="w-12 h-12 text-lions-gold flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-lions-navy mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="section-padding bg-lions-light-gray">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-lions-navy mb-6 font-serif text-center">
            Chi Può Diventare Socio
          </h2>
          <div className="w-24 h-1 bg-lions-gold mx-auto mb-16"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="bg-white rounded-lg p-8 shadow-lions">
                <h3 className="text-2xl font-bold text-lions-navy mb-6 font-serif">
                  Requisiti Essenziali
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-6 h-6 rounded-full bg-lions-gold text-lions-navy font-bold flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-gray-700">
                      <strong>Maggiore di 18 anni</strong> (oppure 12-30 anni per i Leo Lions)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-6 h-6 rounded-full bg-lions-gold text-lions-navy font-bold flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-gray-700">
                      <strong>Buona reputazione</strong> nella comunità
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-6 h-6 rounded-full bg-lions-gold text-lions-navy font-bold flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-gray-700">
                      <strong>Interessato al servizio volontario</strong> e al bene comune
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-6 h-6 rounded-full bg-lions-gold text-lions-navy font-bold flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-gray-700">
                      <strong>Disponibilità</strong> a partecipare attivamente
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-6 h-6 rounded-full bg-lions-gold text-lions-navy font-bold flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-gray-700">
                      <strong>Accettazione</strong> dei principi e valori Lions
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="bg-lions-navy text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6 font-serif">
                  Non Sei Un Candidato Ideale Se...
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-lions-light-gold">✗</span>
                    <span>Cerchi esclusivamente benefici personali o professionali</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-lions-light-gold">✗</span>
                    <span>
                      Non hai tempo da dedicare agli incontri e alle attività del club
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-lions-light-gold">✗</span>
                    <span>Non concordi con i valori e la mission dei Lions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-lions-light-gold">✗</span>
                    <span>Non sei disposto a sottoscrivere il nostro codice etico</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-lions-navy mb-6 font-serif text-center">
            Processo di Adesione
          </h2>
          <div className="w-24 h-1 bg-lions-gold mx-auto mb-16"></div>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-lions-gold text-lions-navy font-bold flex items-center justify-center text-xl font-serif">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-lions-navy mb-2">
                  Contattaci
                </h3>
                <p className="text-gray-600">
                  Inviaci una richiesta di informazioni tramite il modulo contatti o
                  telefonicamente. Riceverai informazioni dettagliate sulla nostra organizzazione.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-lions-gold text-lions-navy font-bold flex items-center justify-center text-xl font-serif">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-lions-navy mb-2">
                  Colloquio Conoscitivo
                </h3>
                <p className="text-gray-600">
                  Avremo un colloquio per conoscerti meglio e spiegare in dettaglio
                  i nostri progetti, gli impegni e le aspettative reciproche.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-lions-gold text-lions-navy font-bold flex items-center justify-center text-xl font-serif">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-lions-navy mb-2">
                  Presentazione al Club
                </h3>
                <p className="text-gray-600">
                  Se la candidatura è positiva, sarai presentato ai soci in una
                  riunione ordinaria del club per essere conosciuto.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-lions-gold text-lions-navy font-bold flex items-center justify-center text-xl font-serif">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-lions-navy mb-2">
                  Votazione
                </h3>
                <p className="text-gray-600">
                  I soci votano la tua ammissione. L'approvazione deve essere
                  unanime. Tutti i soci devono essere d'accordo.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-lions-gold text-lions-navy font-bold flex items-center justify-center text-xl font-serif">
                  5
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-lions-navy mb-2">
                  Cerimonia di Investitura
                </h3>
                <p className="text-gray-600">
                  Sarai formalmente investito come membro del club Lions con una
                  cerimonia speciale. Riceverai il distintivo Lions e la documentazione.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="section-padding bg-lions-light-gray">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-lions-navy mb-6 font-serif text-center">
            L'Impegno Richiesto
          </h2>
          <div className="w-24 h-1 bg-lions-gold mx-auto mb-16"></div>

          <div className="bg-white rounded-lg p-8 shadow-lions">
            <p className="text-gray-600 mb-6 text-lg">
              Diventare socio Lions significa assumersi alcuni impegni:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-lions-navy mb-4 flex items-center gap-2">
                  <span className="inline-block w-8 h-8 rounded-full bg-lions-gold text-lions-navy font-bold flex items-center justify-center text-sm">
                    T
                  </span>
                  Tempo
                </h3>
                <p className="text-gray-600">
                  Partecipazione alle riunioni mensili del club e disponibilità per
                  le attività di servizio (almeno 4-6 ore al mese). I Lions credono
                  nel "Noi Serviamo" con azioni concrete.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-lions-navy mb-4 flex items-center gap-2">
                  <span className="inline-block w-8 h-8 rounded-full bg-lions-gold text-lions-navy font-bold flex items-center justify-center text-sm">
                    R
                  </span>
                  Risorse
                </h3>
                <p className="text-gray-600">
                  Quota associativa annuale (importo variabile) e contributi per le
                  attività del club. Le quote finanziarie vengono utilizzate
                  esclusivamente per i service comunitari.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-lions-navy mb-4 flex items-center gap-2">
                  <span className="inline-block w-8 h-8 rounded-full bg-lions-gold text-lions-navy font-bold flex items-center justify-center text-sm">
                    V
                  </span>
                  Valori
                </h3>
                <p className="text-gray-600">
                  Adesione ai principi Lions di etica, integrità e rispetto reciproco.
                  Promozione del motto "We Serve" nella comunità e nel tuo operato
                  professionale.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-lions-navy mb-4 flex items-center gap-2">
                  <span className="inline-block w-8 h-8 rounded-full bg-lions-gold text-lions-navy font-bold flex items-center justify-center text-sm">
                    P
                  </span>
                  Partecipazione
                </h3>
                <p className="text-gray-600">
                  Contributo attivo alle decisioni del club, partecipazione ai
                  service, promozione dell'organizzazione e dei suoi ideali nella
                  tua rete personale e professionale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-lions-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lions-gold rounded-full blur-3xl"></div>
        </div>

        <div className="container max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-serif animate-fade-in-up">
            Sei Pronto a Fare la Differenza?
          </h2>
          <p className="text-xl text-lions-light-gold mb-12 max-w-2xl mx-auto animate-fade-in-up">
            Se riconosci te stesso in questi valori e sei interessato a unirti alla nostra
            comunità, contattaci oggi stesso. Saremo felici di discutere come puoi diventare
            parte della nostra missione di servizio.
          </p>

          <Link
            href="/contatti"
            className="px-8 py-4 bg-lions-gold text-lions-navy font-bold rounded-lg hover:bg-lions-light-gold transition-all inline-block hover:shadow-lg hover:scale-105 animate-fade-in-up"
          >
            Contattaci per Più Informazioni
          </Link>
        </div>
      </section>
    </>
  );
}
