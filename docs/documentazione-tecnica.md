# Documentazione Tecnica — Lions Club Massafra-Mottola "Le Cripte" ODV

## Indice

1. [Stack Tecnologico](#1-stack-tecnologico)
2. [Prerequisiti e Installazione](#2-prerequisiti-e-installazione)
3. [Variabili d'Ambiente](#3-variabili-dambiente)
4. [Struttura del Progetto](#4-struttura-del-progetto)
5. [Architettura e Routing](#5-architettura-e-routing)
6. [Autenticazione e Middleware](#6-autenticazione-e-middleware)
7. [Database — Supabase](#7-database--supabase)
8. [Componenti Principali](#8-componenti-principali)
9. [Sistema di Notifiche (Toast)](#9-sistema-di-notifiche-toast)
10. [Editor di Testo Ricco](#10-editor-di-testo-ricco)
11. [Design System e Stili](#11-design-system-e-stili)
12. [Configurazione del Sito](#12-configurazione-del-sito)
13. [Build e Deploy](#13-build-e-deploy)
14. [Linting e Qualità del Codice](#14-linting-e-qualità-del-codice)

---

## 1. Stack Tecnologico

| Layer | Tecnologia | Versione |
|-------|------------|----------|
| Framework | Next.js | 14.2.0 |
| UI Library | React | 18.x |
| Linguaggio | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.4.1 |
| Icone | Lucide React | 1.7.0 |
| Editor WYSIWYG | Tiptap | 3.21.0 |
| Backend / Auth | Supabase | 2.100.1 |
| SSR Auth | @supabase/ssr | 0.9.0 |
| Hosting | Netlify | — |
| Runtime | Node.js | 20.x |

---

## 2. Prerequisiti e Installazione

### Requisiti di sistema

- **Node.js** >= 20.x
- **npm** >= 10.x
- Accesso al progetto Supabase (URL e chiave anonima)

### Installazione locale

```bash
# 1. Clona il repository
git clone <repository-url>
cd lions-club-massafra-mottola

# 2. Installa le dipendenze
# Il flag --legacy-peer-deps è richiesto per compatibilità con Tiptap
npm install --legacy-peer-deps

# 3. Crea il file delle variabili d'ambiente
cp .env.example .env.local
# (Compila le variabili — vedi sezione 3)

# 4. Avvia il server di sviluppo
npm run dev
```

Il sito sarà disponibile su `http://localhost:3000`.

### Script disponibili

```bash
npm run dev      # Avvia Next.js in modalità sviluppo con hot-reload
npm run build    # Build di produzione
npm run start    # Avvia il server di produzione (dopo build)
npm run lint     # Esegue ESLint
```

---

## 3. Variabili d'Ambiente

Crea un file `.env.local` nella root del progetto con le seguenti variabili:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-public-key>
```

> Le variabili prefissate con `NEXT_PUBLIC_` sono esposte al browser. Non inserire mai la chiave `service_role` in queste variabili.

Su Netlify, queste variabili vanno configurate in:
**Site Settings → Environment Variables**

---

## 4. Struttura del Progetto

```
lions-club-massafra-mottola/
├── public/                     # Asset statici
│   ├── lions-logo.png          # Logo del club
│   ├── favicon.ico
│   └── apple-touch-icon.png
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (font, ToastProvider)
│   │   ├── page.tsx            # Homepage
│   │   ├── chi-siamo/          # Sezione "Chi Siamo"
│   │   │   ├── page.tsx
│   │   │   ├── statuto/page.tsx
│   │   │   ├── regolamenti/page.tsx
│   │   │   └── diventa-socio/page.tsx
│   │   ├── news/               # Sezione news pubblica
│   │   │   ├── page.tsx        # Lista news con filtri
│   │   │   └── [id]/page.tsx   # Dettaglio articolo
│   │   ├── contatti/page.tsx   # Pagina contatti
│   │   ├── login/page.tsx      # Pagina login
│   │   └── area-riservata/     # Area membri (protetta)
│   │       ├── layout.tsx      # Layout con sidebar
│   │       ├── page.tsx        # Dashboard
│   │       ├── news/
│   │       │   ├── page.tsx    # Gestione news
│   │       │   └── nuovo/page.tsx  # Crea/modifica articolo
│   │       ├── documenti/page.tsx  # Archivio documenti
│   │       └── profilo/page.tsx    # Profilo utente
│   ├── components/             # Componenti riutilizzabili
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LayoutWrapper.tsx
│   │   ├── Toast.tsx
│   │   └── RichTextEditor.tsx
│   ├── lib/                    # Utility e configurazioni
│   │   ├── siteConfig.ts       # Configurazione centralizzata del sito
│   │   └── supabase/
│   │       ├── client.ts       # Client Supabase lato browser
│   │       ├── server.ts       # Client Supabase lato server
│   │       └── middleware.ts   # Gestione sessione per middleware
│   └── middleware.ts           # Middleware Next.js per auth
├── docs/                       # Documentazione
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── netlify.toml
└── package.json
```

---

## 5. Architettura e Routing

Il progetto utilizza il **Next.js App Router** (introdotto in Next.js 13). Ogni cartella in `src/app/` corrisponde a un segmento di URL.

### Route pubbliche

| Percorso | File | Descrizione |
|----------|------|-------------|
| `/` | `app/page.tsx` | Homepage |
| `/chi-siamo` | `app/chi-siamo/page.tsx` | Presentazione del club |
| `/chi-siamo/statuto` | `app/chi-siamo/statuto/page.tsx` | Statuto del club |
| `/chi-siamo/regolamenti` | `app/chi-siamo/regolamenti/page.tsx` | Regolamenti interni |
| `/chi-siamo/diventa-socio` | `app/chi-siamo/diventa-socio/page.tsx` | Come iscriversi |
| `/news` | `app/news/page.tsx` | Elenco articoli (con ricerca e filtro) |
| `/news/[id]` | `app/news/[id]/page.tsx` | Dettaglio articolo |
| `/contatti` | `app/contatti/page.tsx` | Contatti e mappa |
| `/login` | `app/login/page.tsx` | Login membri |

### Route protette (autenticazione richiesta)

| Percorso | File | Descrizione |
|----------|------|-------------|
| `/area-riservata` | `app/area-riservata/page.tsx` | Dashboard |
| `/area-riservata/news` | `app/area-riservata/news/page.tsx` | Gestione articoli |
| `/area-riservata/news/nuovo` | `app/area-riservata/news/nuovo/page.tsx` | Crea/modifica articolo |
| `/area-riservata/documenti` | `app/area-riservata/documenti/page.tsx` | Archivio documenti |
| `/area-riservata/profilo` | `app/area-riservata/profilo/page.tsx` | Profilo utente |

### Route dinamiche

- `/news/[id]` — `id` è lo slug dell'articolo generato automaticamente dal titolo.

---

## 6. Autenticazione e Middleware

### Middleware (`src/middleware.ts`)

Il middleware intercetta tutte le richieste e applica la logica di autenticazione esclusivamente per le route `/area-riservata/*`.

**Flusso:**
1. Se la richiesta non riguarda `/area-riservata`, passa al layer successivo senza modifiche.
2. Chiama `updateSession()` di `@supabase/ssr` per aggiornare la sessione nei cookie.
3. Se non esiste una sessione utente valida, reindirizza a `/login?redirect=<percorso-originale>`.
4. Dopo il login, l'utente viene reindirizzato alla pagina che aveva richiesto.

### Client Supabase

Il progetto usa due istanze del client Supabase:

- **`src/lib/supabase/client.ts`** — Client lato browser (per componenti Client Components)
- **`src/lib/supabase/server.ts`** — Client lato server (per Server Components e API Routes)

Questa separazione è necessaria perché i client Supabase gestiscono i cookie in modo diverso tra server e browser.

---

## 7. Database — Supabase

### Tabelle principali

#### `news`

| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| `id` | uuid | Chiave primaria |
| `title` | text | Titolo dell'articolo |
| `slug` | text | URL-friendly identificativo (auto-generato) |
| `excerpt` | text | Sommario/anteprima |
| `content` | text | Corpo HTML dell'articolo |
| `image_url` | text | URL immagine di copertina |
| `published` | boolean | Stato pubblicazione |
| `published_at` | timestamptz | Data di pubblicazione |
| `author_id` | uuid | Riferimento a `auth.users` |

#### `documents`

Archivio documenti del club (dettagli nelle implementazioni future).

#### `profiles`

| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| `id` | uuid | Corrisponde a `auth.users.id` |
| `avatar_url` | text | URL dell'avatar utente |

### Storage

- **Bucket `news-images`** — Immagini caricate per gli articoli. Le immagini vengono caricate via client Supabase e l'URL pubblico è generato con `getPublicUrl()`.

### Row Level Security (RLS)

Si raccomanda di configurare RLS su Supabase per garantire che:
- La lettura di news pubblicate sia accessibile a tutti (anche anonimi).
- Le operazioni di scrittura/modifica/eliminazione siano riservate agli utenti autenticati.

---

## 8. Componenti Principali

### `Header.tsx`

Barra di navigazione principale con:
- Logo e nome del club
- Menu di navigazione orizzontale (desktop)
- Menu hamburger responsive (mobile)
- Link a tutte le sezioni pubbliche

### `Footer.tsx`

Footer con:
- Link rapidi alle sezioni
- Informazioni di contatto
- Link ai social media

### `LayoutWrapper.tsx`

Wrapper condiviso che applica `Header` e `Footer` a tutte le pagine pubbliche. Non viene applicato alle pagine dell'area riservata, che hanno un proprio layout (`area-riservata/layout.tsx`).

### Layout Area Riservata (`area-riservata/layout.tsx`)

- Sidebar di navigazione (dashboard, news, documenti)
- Header interno con menu profilo e logout
- Responsive: sidebar collassabile su mobile
- Controllo autenticazione lato client (secondo livello di sicurezza)

### `Toast.tsx`

Context React per le notifiche temporanee. Vedere sezione 9.

### `RichTextEditor.tsx`

Editor WYSIWYG basato su Tiptap. Vedere sezione 10.

---

## 9. Sistema di Notifiche (Toast)

Il sistema di toast è implementato tramite React Context in `src/components/Toast.tsx`.

### Utilizzo

```typescript
import { useToast } from '@/components/Toast';

function MyComponent() {
  const { showToast } = useToast();

  const handleAction = () => {
    showToast('Operazione completata!', 'success');
    // Tipi disponibili: 'success' | 'error' | 'info' | 'warning'
  };
}
```

Il `ToastProvider` è registrato nel root layout (`app/layout.tsx`) e disponibile globalmente.

---

## 10. Editor di Testo Ricco

`RichTextEditor.tsx` utilizza **Tiptap** con le seguenti estensioni:

| Estensione | Funzionalità |
|------------|-------------|
| `StarterKit` | Bold, italic, liste, titoli, paragrafi, citazioni, codice |
| `Underline` | Sottolineato |
| `TextStyle` + `Color` | Colore del testo |
| `TextAlign` | Allineamento (sinistra, centro, destra, giustificato) |
| `Image` | Inserimento immagini da URL |
| `Link` | Inserimento link con apertura in nuova scheda |
| `Table` + Header/Row/Cell | Tabelle complete |
| `Youtube` | Embed video YouTube |
| `Placeholder` | Testo segnaposto |

L'output è HTML serializzato (stringa). Il contenuto viene salvato nel campo `content` della tabella `news`.

Per il rendering lato client, il contenuto viene iniettato tramite `dangerouslySetInnerHTML` con le classi Tailwind `prose`.

---

## 11. Design System e Stili

### Palette colori (Tailwind custom)

```typescript
colors: {
  'lions-navy':       '#00338D',  // Blu primario
  'lions-dark-navy':  '#002244',  // Blu scuro
  'lions-gold':       '#EBB700',  // Oro — colore accento
  'lions-light-gold': '#FFF3CC',  // Oro chiaro
  'lions-white':      '#FFFFFF',
  'lions-light-gray': '#F5F5F5',
  'lions-dark-text':  '#1a1a2e',
  'lions-gray':       '#766A62',
  'lions-purple':     '#622567',
  'lions-light-blue': '#407CCA',
  'lions-green':      '#00AB68',
  'lions-orange':     '#CA7700',
}
```

### Font

- **Inter** — Testo corpo (sans-serif)
- **Playfair Display** — Titoli (serif)

Caricati tramite `next/font/google` nel root layout.

### Gradienti

```typescript
backgroundImage: {
  'lions-gradient': 'linear-gradient(135deg, #00338D, #EBB700)',
  'lions-hero':     'linear-gradient(135deg, #002244, #00338D, #002244)',
}
```

### Animazioni personalizzate

```typescript
animation: {
  'fade-in-up':     'fadeInUp 0.6s ease-out',
  'slide-in-left':  'slideInLeft 0.5s ease-out',
  'slide-in-right': 'slideInRight 0.5s ease-out',
  'scale-in-up':    'scaleInUp 0.4s ease-out',
  'scroll-arrow':   'scrollArrow 2s ease-in-out infinite',
}
```

---

## 12. Configurazione del Sito

Il file `src/lib/siteConfig.ts` centralizza tutti i testi e le immagini principali del sito:

```typescript
export const siteConfig = {
  hero: {
    backgroundImage: '...',
    title: 'LIONS CLUB',
    subtitle: 'Massafra-Mottola "Le Cripte" ODV',
    motto: '"Noi Serviamo" - We Serve',
    description: '...',
  },
  serviceImages: { visione, gioventu, sanita, ambiente, ... },
  ctaImage: '...',
  aboutImage: '...',
  contactInfo: {
    address: '...',
    email: 'info@lionsclubmassafra.it',
    phone: '+39 (0)99 123 456',
    meetingDay: 'Secondo lunedì del mese alle 19:30',
  },
};
```

Per modificare testi o immagini del sito senza toccare i componenti, intervenire su questo file.

---

## 13. Build e Deploy

### Build locale

```bash
npm run build
npm run start
```

### Deploy su Netlify

Il file `netlify.toml` configura il deploy:

```toml
[build]
  command   = "npm install --legacy-peer-deps && npm run build"
  publish   = ".next"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

**Passi per il deploy:**
1. Collega il repository a Netlify.
2. Aggiungi le variabili d'ambiente (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) nelle impostazioni del sito.
3. Il deploy avviene automaticamente ad ogni push su `main`.

### Note sulla configurazione Next.js

In `next.config.mjs` sono presenti queste opzioni non standard:

```javascript
images: { unoptimized: true }   // Compatibilità con Netlify static
eslint:     { ignoreDuringBuilds: true }
typescript: { ignoreBuildErrors: true }
```

> In produzione si consiglia di rimuovere le opzioni di ignore per ESLint e TypeScript e correggere eventuali errori.

---

## 14. Linting e Qualità del Codice

```bash
npm run lint     # Esegue ESLint con la configurazione Next.js
```

ESLint è configurato con `eslint-config-next` che include:
- Regole React
- Regole per l'accessibilità (`jsx-a11y`)
- Regole specifiche per Next.js

Il progetto usa TypeScript in modalità strict (`tsconfig.json`). Il path alias `@/*` è configurato per puntare a `src/*`.
