import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function Statuto() {
  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-lions-navy to-lions-navy/80 text-white py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <FileText size={32} className="text-lions-gold" />
            <h1 className="text-4xl font-bold font-serif">Statuto</h1>
          </div>
          <p className="text-xl text-lions-light-gold">
            I principi fondamentali che governano il Lions Club Massafra-Mottola Le Cripte
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <div className="bg-lions-light-gray p-8 rounded-lg mb-8 border-l-4 border-lions-gold">
              <h2 className="text-2xl font-bold text-lions-navy mb-4 font-serif">
                Documento Completo
              </h2>
              <p className="text-gray-700 mb-4">
                Lo Statuto del Lions Club Massafra-Mottola Le Cripte ODV è il documento
                fondamentale che stabilisce:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Scopi e obiettivi del club</li>
                <li>Diritti e doveri dei soci</li>
                <li>Struttura organizzativa e governance</li>
                <li>Modalità di riunione e deliberazione</li>
                <li>Gestione finanziaria e patrimoniale</li>
                <li>Procedure di ammissione e recesso</li>
                <li>Norme disciplinari</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-lions-navy mb-6 font-serif">
              Sezioni Principali dello Statuto
            </h2>

            <div className="space-y-8">
              <div className="card">
                <h3 className="text-2xl font-bold text-lions-navy mb-4">I. Denominazione e Sede</h3>
                <p className="text-gray-600">
                  Il Club si denomina "Lions Club Massafra-Mottola Le Cripte" ed è un
                  Organizzazione di Volontariato (ODV) con sede legale nei territori
                  di Massafra e Mottola, provincia di Taranto, Puglia.
                </p>
              </div>

              <div className="card">
                <h3 className="text-2xl font-bold text-lions-navy mb-4">II. Scopi Sociali</h3>
                <p className="text-gray-600 mb-4">
                  Il Club Lions si propone di:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Creare uno spirito di comprensione tra i popoli del mondo</li>
                  <li>Promuovere i principi di buon governo e cittadinanza</li>
                  <li>Incoraggiare i massimi standard di etica</li>
                  <li>Favorire servizi comunitari che migliorano la qualità della vita</li>
                  <li>Promuovere le cause dell'educazione, della sanità e della cultura</li>
                  <li>Protegge l'ambiente naturale per le generazioni future</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-2xl font-bold text-lions-navy mb-4">III. Ammissione Soci</h3>
                <p className="text-gray-600">
                  Possono essere ammessi come soci del Club individui di integrità
                  morale, di buona reputazione, attivi nella vita professionale o civile,
                  che sottoscrivono i principi e gli scopi del Lions Club International
                  e sono interessati al servizio volontario.
                </p>
              </div>

              <div className="card">
                <h3 className="text-2xl font-bold text-lions-navy mb-4">IV. Diritti e Doveri dei Soci</h3>
                <p className="text-gray-600 mb-4">
                  <strong>Diritti:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>Partecipare alle riunioni del Club</li>
                  <li>Votare sulle decisioni del Club</li>
                  <li>Accedere alle informazioni del Club</li>
                  <li>Proporre iniziative e service</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  <strong>Doveri:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Pagare la quota associativa</li>
                  <li>Partecipare attivamente ai service</li>
                  <li>Rispettare lo statuto e i regolamenti</li>
                  <li>Mantenere la riservatezza su informazioni sensibili</li>
                  <li>Comportarsi in modo etico e coerente con i principi Lions</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-2xl font-bold text-lions-navy mb-4">V. Organi del Club</h3>
                <p className="text-gray-600 mb-4">
                  Il Club è organizzato secondo le seguenti strutture:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li><strong>Assemblea Generale:</strong> Esercita il potere supremo del Club</li>
                  <li><strong>Consiglio Direttivo:</strong> Gestisce l'amministrazione ordinaria</li>
                  <li><strong>Presidente:</strong> Rappresenta il Club e ne guida le attività</li>
                  <li><strong>Segretario:</strong> Mantiene i registri e gestisce la comunicazione</li>
                  <li><strong>Tesoriere:</strong> Gestisce le finanze del Club</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-2xl font-bold text-lions-navy mb-4">VI. Riunioni</h3>
                <p className="text-gray-600">
                  Il Club si riunisce regolarmente secondo un calendario stabilito dal
                  Consiglio Direttivo. Le riunioni ordinarie si tengono mensilmente. I soci
                  ricevono notifica con almeno 5 giorni di anticipo.
                </p>
              </div>

              <div className="card">
                <h3 className="text-2xl font-bold text-lions-navy mb-4">VII. Finanze</h3>
                <p className="text-gray-600">
                  Il Club si finanzia attraverso quote associative, donazioni, e ricavi
                  da attività di fundraising. Il bilancio è sottoposto ad approvazione
                  annuale dell'Assemblea Generale.
                </p>
              </div>
            </div>

            <div className="bg-lions-light-gray p-8 rounded-lg mt-12 border-l-4 border-lions-gold">
              <h3 className="text-xl font-bold text-lions-navy mb-4">Per il Documento Completo</h3>
              <p className="text-gray-700 mb-4">
                Per ottenere una copia completa dello Statuto in versione PDF o cartacea,
                contattare direttamente il Club all'indirizzo email o al telefono forniti
                nella pagina Contatti.
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
