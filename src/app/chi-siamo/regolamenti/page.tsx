import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function Regolamenti() {
  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-lions-navy to-lions-navy/80 text-white py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <BookOpen size={32} className="text-lions-gold" />
            <h1 className="text-4xl font-bold font-serif">Regolamenti</h1>
          </div>
          <p className="text-xl text-lions-light-gold">
            Norme operative e procedure interne del Lions Club Massafra-Mottola Le Cripte
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <div className="bg-lions-light-gray p-8 rounded-lg mb-8 border-l-4 border-lions-gold">
              <h2 className="text-2xl font-bold text-lions-navy mb-4 font-serif">
                Regolamenti Interni
              </h2>
              <p className="text-gray-700 mb-4">
                I Regolamenti del Lions Club Massafra-Mottola Le Cripte forniscono
                le norme operative dettagliate che integrano lo Statuto, coprendo:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Organizzazione delle riunioni e modalità di partecipazione</li>
                <li>Procedure di elezione degli organi direttivi</li>
                <li>Gestione amministrativa e finanziaria</li>
                <li>Criteri e procedure per i service</li>
                <li>Codice di etica e condotta dei soci</li>
                <li>Sanzioni disciplinari</li>
                <li>Modifiche e interpretazione dei regolamenti</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-lions-navy mb-6 font-serif">
              Sezioni Principali dei Regolamenti
            </h2>

            <div className="space-y-8">
              <div className="card">
                <h3 className="text-2xl font-bold text-lions-navy mb-4">
                  Capitolo 1: Organizzazione delle Riunioni
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>Frequenza:</strong> Le riunioni ordinarie si tengono mensilmente
                  (generalmente il secondo lunedì del mese).
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Notifica:</strong> I soci ricevono notifica con almeno 5 giorni
                  di anticipo tramite email o metodi tradizionali.
                </p>
                <p className="text-gray-600">
                  <strong>Quorum:</strong> La riunione è valida se presenti almeno il 40%
                  dei soci. Le decisioni sono approvate a maggioranza semplice.
                </p>
              </div>

              <div className="card">
                <h3 className="text-2xl font-bold text-lions-navy mb-4">
                  Capitolo 2: Elezione degli Organi Direttivi
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>Elezioni Annuali:</strong> Si tengono entro il giugno di ogni anno
                  per l'esercizio che inizia a luglio.
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Eleggibilità:</strong> Possono candidarsi soci in regola da
                  almeno 2 anni con eccellente curriculum di partecipazione.
                </p>
                <p className="text-gray-600">
                  <strong>Mandato:</strong> Un anno con possibilità di rielezione fino a
                  un massimo di 3 mandati consecutivi.
                </p>
              </div>

              <div className="card">
                <h3 className="text-2xl font-bold text-lions-navy mb-4">
                  Capitolo 3: Gestione Amministrativa e Finanziaria
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>Bilancio:</strong> Esercizio finanziario da luglio a giugno.
                  Bilancio presentato e approvato entro settembre.
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Quote Associative:</strong> Stabilite annualmente dal Consiglio
                  Direttivo e approvate in Assemblea.
                </p>
                <p className="text-gray-600">
                  <strong>Trasparenza:</strong> Rendicontazione dettagliata di entrate e
                  uscite. Verifica contabile annuale da parte di revisori indipendenti.
                </p>
              </div>

              <div className="card">
                <h3 className="text-2xl font-bold text-lions-navy mb-4">
                  Capitolo 4: Criteri e Procedure per i Service
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>Identificazione:</strong> I service sono identificati sulla base
                  delle 8 aree di focus Lions International.
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Pianificazione:</strong> Pianificazione annuale con obiettivi
                  specifici e misurabili.
                </p>
                <p className="text-gray-600">
                  <strong>Partecipazione:</strong> Tutti i soci sono invitati a partecipare.
                  Documentazione e follow-up di ogni attività.
                </p>
              </div>

              <div className="card">
                <h3 className="text-2xl font-bold text-lions-navy mb-4">
                  Capitolo 5: Codice di Etica e Condotta
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>Principi Fondamentali:</strong> I soci Lions si impegnano a:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Agire con integrità e onestà in tutte le questioni</li>
                  <li>Evitare conflitti di interesse</li>
                  <li>Rispettare la dignità e i diritti di tutte le persone</li>
                  <li>Mantenere la riservatezza su informazioni sensibili</li>
                  <li>Non utilizzare il club per scopi personali o lucrativi</li>
                  <li>Sottoscrivere il motto "We Serve" (Noi Serviamo)</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-2xl font-bold text-lions-navy mb-4">
                  Capitolo 6: Sanzioni Disciplinari
                </h3>
                <p className="text-gray-600 mb-4">
                  <strong>Violazioni:</strong> Violazioni del codice di etica o dei
                  regolamenti possono portare a:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>Ammonizione scritta</li>
                  <li>Sospensione temporanea da attività del club</li>
                  <li>Esclusione dal club</li>
                </ul>
                <p className="text-gray-600">
                  <strong>Procedura:</strong> Procedimento disciplinare equo con diritto
                  di difesa.
                </p>
              </div>

              <div className="card">
                <h3 className="text-2xl font-bold text-lions-navy mb-4">
                  Capitolo 7: Modifiche ai Regolamenti
                </h3>
                <p className="text-gray-600">
                  I regolamenti possono essere modificati da delibera dell'Assemblea
                  Generale con approvazione di almeno 2/3 dei soci presenti, previa
                  comunicazione della proposta almeno 10 giorni prima della riunione.
                </p>
              </div>

              <div className="card">
                <h3 className="text-2xl font-bold text-lions-navy mb-4">
                  Concordanza con Lions International
                </h3>
                <p className="text-gray-600">
                  I regolamenti interni sono in concordanza con:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Statuto di Lions Clubs International</li>
                  <li>Constitution and Bylaws di Lions International</li>
                  <li>Codice di Etica di Lions International</li>
                  <li>Norme sulla governance di Lions International</li>
                </ul>
              </div>
            </div>

            <div className="bg-lions-light-gray p-8 rounded-lg mt-12 border-l-4 border-lions-gold">
              <h3 className="text-xl font-bold text-lions-navy mb-4">Per il Documento Completo</h3>
              <p className="text-gray-700 mb-4">
                Per ottenere una copia completa dei Regolamenti in versione PDF o cartacea,
                o per chiarimenti su specifiche disposizioni, contattare direttamente il
                Club tramite i canali indicati nella pagina Contatti.
              </p>
              <Link
                href="/contatti"
                className="inline-block px-6 py-3 bg-lions-navy text-white font-bold rounded-lg hover:bg-lions-gold hover:text-lions-navy transition-all"
              >
                Contattaci
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
