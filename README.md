# Lions Club Massafra-Mottola "Le Cripte" ODV — Sito Web

Sito istituzionale del **Lions Club Massafra-Mottola "Le Cripte" ODV**, un'associazione di volontariato affiliata a Lions Club International operante in provincia di Taranto (Puglia).

## Documentazione

| Documento | Destinatari | Descrizione |
|-----------|-------------|-------------|
| [Documentazione Tecnica](docs/documentazione-tecnica.md) | Sviluppatori | Stack, architettura, installazione, API, deploy |
| [Documentazione Funzionale](docs/documentazione-funzionale.md) | Operatori / Soci | Come usare il sistema, flussi operativi, funzionalità |
| [Guida Non Tecnica](docs/guida-non-tecnica.md) | Tutti | Cos'è il sito e a cosa serve, in linguaggio semplice |

## Quick Start

```bash
# Installa le dipendenze
npm install --legacy-peer-deps

# Configura le variabili d'ambiente
cp .env.example .env.local
# Aggiungi NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY

# Avvia il server di sviluppo
npm run dev
```

Il sito sarà disponibile su [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** con palette Lions personalizzata
- **Supabase** (database PostgreSQL + autenticazione + storage)
- **Tiptap** per l'editor di testo ricco
- Deploy su **Netlify**

## Struttura principale

```
src/
├── app/              # Pagine (Next.js App Router)
├── components/       # Componenti riutilizzabili
└── lib/              # Utility, client Supabase, configurazione sito
```

Per la documentazione completa, consultare la cartella [`docs/`](docs/).
