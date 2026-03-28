import { Lock } from 'lucide-react';
import Link from 'next/link';

export default function AreaRiservata() {
  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-lions-navy to-lions-navy/80 text-white py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Lock size={32} className="text-lions-gold" />
            <h1 className="text-5xl font-bold font-serif">Area Riservata</h1>
          </div>
          <p className="text-xl text-lions-light-gold">
            Accesso riservato ai soci del Lions Club
          </p>
        </div>
      </section>

      {/* Login Section */}
      <section className="section-padding bg-white">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="card shadow-lions-lg">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-lions-gold/20 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-lions-gold" />
              </div>
              <h2 className="text-3xl font-bold text-lions-navy mb-2 font-serif">
                Login Richiesto
              </h2>
              <p className="text-gray-600">
                Accedi con le tue credenziali di socio per accedere ai contenuti riservati
              </p>
            </div>

            <div className="space-y-6">
              {/* Coming Soon Message */}
              <div className="bg-lions-light-gray border-l-4 border-lions-gold p-6 rounded">
                <h3 className="text-lg font-bold text-lions-navy mb-2">
                  Prossimamente
                </h3>
                <p className="text-gray-700 mb-4">
                  L'Area Riservata è in fase di sviluppo e sarà disponibile a breve.
                </p>
                <p className="text-gray-600 text-sm">
                  In questa sezione i soci potranno accedere a:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-600 text-sm">
                  <li>Documenti e regolamenti del club</li>
                  <li>Calendari e programmi delle riunioni</li>
                  <li>Elenco soci (se autorizzato)</li>
                  <li>Comunicazioni e circolari interne</li>
                  <li>Archivi fotografici e storici</li>
                  <li>Dati finanziari e bilanci</li>
                </ul>
              </div>

              {/* Contact for Login */}
              <div className="bg-lions-navy text-white rounded-lg p-6 text-center">
                <p className="mb-4">
                  Se sei un socio e non possiedi ancora le credenziali di accesso,
                </p>
                <Link
                  href="/contatti"
                  className="inline-block px-6 py-3 bg-lions-gold text-lions-navy font-bold rounded-lg hover:bg-lions-light-gold transition-all"
                >
                  Contattaci per Ricevere le Credenziali
                </Link>
              </div>

              {/* Information Message */}
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-700">
                  Questa area contiene informazioni e documenti esclusivamente per i soci del
                  Lions Club Massafra-Mottola Le Cripte ODV.
                </p>
                <p className="text-gray-600 text-sm mt-4">
                  L'accesso è protetto da password per mantenere la riservatezza delle
                  informazioni e dei dati condivisi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="section-padding bg-lions-light-gray">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-lions-navy mb-12 font-serif text-center">
            Come Accedere
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl font-bold text-lions-gold mb-4">1</div>
              <h3 className="text-lg font-bold text-lions-navy mb-3">Contatta il Club</h3>
              <p className="text-gray-600 text-sm">
                Se non possiedi le credenziali, contattaci tramite il form di contatto
                o telefono.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl font-bold text-lions-gold mb-4">2</div>
              <h3 className="text-lg font-bold text-lions-navy mb-3">Ricevi le Credenziali</h3>
              <p className="text-gray-600 text-sm">
                Ti invieremo via email username e password temporanea per accedere
                all'area riservata.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl font-bold text-lions-gold mb-4">3</div>
              <h3 className="text-lg font-bold text-lions-navy mb-3">Accedi e Esplora</h3>
              <p className="text-gray-600 text-sm">
                Accedi con le tue credenziali e esplora tutti i contenuti riservati
                ai soci.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-lions-navy mb-12 font-serif text-center">
            Domande Frequenti
          </h2>

          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-bold text-lions-navy mb-3">
                Chi può accedere all'Area Riservata?
              </h3>
              <p className="text-gray-600">
                Solo i soci del Lions Club Massafra-Mottola Le Cripte ODV in regola
                con le quote possono accedere all'Area Riservata.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-lions-navy mb-3">
                Come cambio la mia password?
              </h3>
              <p className="text-gray-600">
                Una volta effettuato l'accesso, puoi modificare la tua password dalla
                sezione Impostazioni Profilo.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-lions-navy mb-3">
                Ho dimenticato la mia password. Cosa faccio?
              </h3>
              <p className="text-gray-600">
                Usa la funzione "Password Dimenticata" nella pagina di accesso, oppure
                contatta direttamente l'amministratore del club.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-lions-navy mb-3">
                Posso condividere le mie credenziali con altri?
              </h3>
              <p className="text-gray-600">
                No. Le credenziali sono personali e non devono essere condivise.
                Per questioni di riservatezza, ogni socio ha accesso solo alle
                informazioni per lui autorizzate.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
