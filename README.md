# Lions Club Massafra-Mottola "Le Cripte" ODV — Sito Web

Sito istituzionale del **Lions Club Massafra-Mottola "Le Cripte" ODV**, associazione di volontariato affiliata a Lions Club International, operante in provincia di Taranto (Puglia).

---

## Indice della Documentazione

- [Guida per chi non è tecnico](#-guida-per-chi-non-è-tecnico) — cos'è il sito e a cosa serve, spiegato a tutti
- [Documentazione Funzionale](#-documentazione-funzionale) — come usare il sistema (soci e operatori)
- [Documentazione Tecnica](#-documentazione-tecnica) — architettura, installazione e deploy (sviluppatori)

---

---

# 🦁 Guida per chi non è tecnico

## Di cosa si tratta?

Il **Lions Club Massafra-Mottola "Le Cripte" ODV** è un'associazione di volontariato che opera nelle città di Massafra e Mottola, in provincia di Taranto (Puglia). Fa parte del **Lions Club International**, la più grande organizzazione di volontariato al mondo, fondata nel 1917 e presente in oltre 200 paesi.

Questo sito è la **presenza digitale** del club: il posto online dove chiunque può conoscere le attività dell'associazione, leggere le notizie, scoprire come diventare socio o mettersi in contatto.

## A cosa serve il sito?

Il sito ha due utilizzi principali:

### 1. Informare il pubblico

Chiunque può visitare il sito per scoprire:
- **Chi sono i Lions** e cosa fanno nel mondo
- **Chi siamo noi**, la storia e la missione del club di Massafra-Mottola
- **Le nostre attività** nelle aree di salute, istruzione, ambiente, aiuto ai giovani e molto altro
- **Le ultime notizie** sulle iniziative e gli eventi del club
- **Come diventare socio** e far parte della famiglia Lions

### 2. Tenere aggiornati soci e comunità

I soci del club hanno un accesso speciale (l'**area riservata**) che permette loro di:
- Pubblicare notizie e aggiornamenti sul sito
- Caricare e gestire i documenti ufficiali del club
- Gestire il proprio profilo personale

## Come è organizzato il sito?

| Sezione | Cosa trovi |
|---------|------------|
| **Home** | La pagina principale con una panoramica del club e le ultime notizie |
| **Chi Siamo** | La storia del Lions Club, lo statuto, i regolamenti e come iscriversi |
| **Notizie** | Tutti gli articoli e aggiornamenti pubblicati dal club |
| **Contatti** | Dove siamo, come contattarci e un modulo per inviarci un messaggio |

## L'area riservata: cos'è e a cosa serve?

L'area riservata è una sezione del sito accessibile solo ai soci del club dopo aver effettuato l'accesso con le proprie credenziali (email e password).

Serve per **gestire i contenuti del sito** senza dover chiamare un tecnico ogni volta. Un socio può:

**Pubblicare e gestire le notizie**
I soci possono scrivere articoli su eventi, iniziative o comunicazioni del club. L'editor funziona un po' come Microsoft Word: si può aggiungere testo, immagini, video di YouTube, tabelle e molto altro, senza dover sapere nulla di programmazione.

**Gestire i documenti**
Il club può archiviare e organizzare i propri documenti ufficiali (verbali di riunione, comunicazioni, materiale istituzionale) direttamente online.

**Gestire il proprio profilo**
Ogni socio può aggiornare le proprie informazioni e caricare una foto del profilo.

## Come funziona la pubblicazione delle notizie?

Immagina di voler raccontare di un evento che il club ha organizzato:

1. Accedi al sito con il tuo nome utente e password
2. Vai nella sezione "Gestione News"
3. Clicca "Nuovo Articolo"
4. Scrivi il titolo e il testo (come faresti su un documento Word)
5. Aggiungi una foto se vuoi
6. Clicca "Pubblica"

Fatto! L'articolo apparirà subito nella sezione Notizie del sito, visibile a tutti.

Se invece non sei ancora pronto a pubblicarlo, puoi salvarlo come **bozza** e tornare a modificarlo in seguito.

## Come si contatta il club?

Chiunque — socio o non — può inviare un messaggio al club attraverso il **modulo di contatto** nella pagina "Contatti". Basta compilare nome, email e testo del messaggio e cliccare "Invia".

Sul sito si trovano anche:
- **Indirizzo** della sede
- **Numero di telefono**
- **Email**
- **Giorno e orario delle riunioni** (il secondo lunedì del mese alle 19:30)
- **Link ai profili social** del club (Facebook, Instagram, LinkedIn)

## Come si diventa soci?

Nella sezione **"Diventa Socio"** del sito (sotto "Chi Siamo") sono spiegate le modalità per iscriversi al club. È possibile anche inviare una richiesta tramite il modulo di contatto.

## Il sito è sicuro?

Sì. L'area riservata è protetta da un sistema di autenticazione: solo chi ha le credenziali giuste può accedervi. Nessun dato personale dei soci è visibile al pubblico.

## Glossario

| Termine | Significato semplice |
|---------|----------------------|
| **Login / Accesso** | Inserire email e password per entrare nell'area riservata |
| **Bozza** | Un articolo salvato ma non ancora pubblicato (non visibile al pubblico) |
| **Pubblicato** | Un articolo visibile a tutti sul sito |
| **Slug** | L'indirizzo web dell'articolo (es. `/news/nome-articolo`) — si crea automaticamente |
| **Avatar** | La foto del profilo del socio |
| **Dashboard** | La "scrivania" dell'area riservata, con un riepilogo delle attività |
| **Area riservata** | La zona del sito accessibile solo ai soci registrati |
| **ODV** | Organizzazione di Volontariato — qualifica ufficiale dell'associazione |

## Chi gestisce il sito?

Il sito è gestito dai soci del club attraverso l'area riservata. Per modifiche strutturali (aspetto grafico, nuove funzionalità) è necessario coinvolgere uno sviluppatore web con accesso al codice sorgente.

---

---

# 📋 Documentazione Funzionale

## Panoramica del Sistema

Il sito è composto da due macro-aree:

| Area | Accessibile a | Scopo |
|------|---------------|-------|
| **Sito Pubblico** | Tutti (nessun login) | Presentare il club, pubblicare notizie, ricevere contatti |
| **Area Riservata** | Solo soci autenticati | Gestire contenuti, documenti e profilo |

## Utenti e Ruoli

### Visitatore anonimo

Chi accede al sito senza login può:
- Navigare tutte le pagine pubbliche
- Leggere le notizie pubblicate
- Consultare statuto, regolamenti e come diventare socio
- Inviare un messaggio tramite il modulo di contatto

### Socio autenticato

Un socio loggato può inoltre:
- Accedere alla **dashboard** dell'area riservata
- **Creare, modificare ed eliminare** articoli di news
- **Pubblicare o mettere in bozza** gli articoli
- **Caricare immagini** per gli articoli
- **Gestire l'archivio documenti** del club
- **Modificare il proprio profilo** (incluso l'avatar)

> Attualmente il sistema prevede un unico livello di accesso per i soci. Non esiste un ruolo amministratore separato.

## Sito Pubblico

### Homepage (`/`)

- **Hero section** — Immagine di sfondo con titolo, motto del club e call-to-action
- **Contatori animati** — Anno di fondazione, soci, paesi Lions nel mondo, beneficiari
- **Aree di servizio** — Le 8 aree di impegno Lions (Visione, Gioventù, Salute, Ambiente, Istruzione, Comunità, Lotta alla Fame, Diritti Umani)
- **Ultime notizie** — Gli articoli più recenti
- **Call-to-action** — Invito a unirsi al club

### Chi Siamo (`/chi-siamo`)

Presenta il Lions Club International e il capitolo locale.

Sottosezioni:
- `/chi-siamo/statuto` — Statuto ufficiale
- `/chi-siamo/regolamenti` — Regolamento interno
- `/chi-siamo/diventa-socio` — Procedura e requisiti per l'iscrizione

### News (`/news`)

Elenco articoli pubblicati con:
- **Ricerca testuale** per parole chiave
- **Filtro per anno** di pubblicazione
- **Card di anteprima** con titolo, immagine, sommario e data

### Dettaglio articolo (`/news/[id]`)

- Immagine di copertina
- Titolo e data di pubblicazione
- Contenuto completo (testo formattato, immagini, video, tabelle)

### Contatti (`/contatti`)

- Modulo di contatto (nome, email, oggetto, messaggio)
- Indirizzo, email, telefono, giorno delle riunioni
- Mappa Google Maps integrata
- Link social media
- FAQ

## Area Riservata — Accesso

### Login (`/login`)

1. Andare su `/login`
2. Inserire **email** e **password**
3. Cliccare "Accedi"

Dopo il login si viene reindirizzati alla dashboard o alla pagina precedentemente richiesta.

### Logout

Dal menu profilo nella barra superiore → cliccare "Esci". La sessione termina e si torna alla homepage.

### Protezione delle route

Tutte le pagine sotto `/area-riservata/` richiedono autenticazione. Un utente non loggato viene automaticamente reindirizzato a `/login?redirect=<pagina-richiesta>`.

## Gestione News e Articoli

### Elenco articoli (`/area-riservata/news`)

Mostra tutti gli articoli (pubblicati e bozze) con le azioni **Modifica** ed **Elimina**.

### Creazione nuovo articolo (`/area-riservata/news/nuovo`)

1. Cliccare "Nuovo Articolo"
2. Compilare **Titolo** (genera lo slug automaticamente) e **Sommario**
3. Caricare opzionalmente un'**immagine di copertina**
4. Scrivere il **contenuto** con l'editor WYSIWYG
5. Scegliere **Salva come bozza** o **Pubblica**

### Editor di testo (WYSIWYG)

| Strumento | Descrizione |
|-----------|-------------|
| Grassetto, Corsivo, Sottolineato, Barrato | Formattazione inline |
| Titoli H1–H3 | Intestazioni di sezione |
| Liste puntate / numerate | Elenchi |
| Citazione | Blocco citazione |
| Allineamento | Sinistra, centro, destra, giustificato |
| Colore testo | Selettore colore |
| Link | Inserimento collegamento |
| Immagine | Inserimento tramite URL |
| Tabella | Tabelle complete |
| Video YouTube | Embed tramite URL |

### Pubblicazione e bozze

- **Bozza** — salvato ma non visibile al pubblico
- **Pubblicato** — visibile a tutti nella sezione News
- Lo stato si può cambiare in qualsiasi momento dalla pagina di modifica

### Eliminazione

Dalla lista articoli → "Elimina" → conferma. L'operazione è **irreversibile**.

## Archivio Documenti (`/area-riservata/documenti`)

Gestione dell'archivio documentale del club: verbali, comunicazioni, materiale istituzionale.

## Gestione Profilo (`/area-riservata/profilo`)

- Caricare o aggiornare l'**avatar** (foto profilo)
- Visualizzare le informazioni del proprio account

## Modulo di Contatto

Campi obbligatori: nome e cognome, email, oggetto, messaggio. Il formato email viene validato prima dell'invio.

## Flussi Principali

**Pubblicazione di una notizia:**
```
Login → /area-riservata/news → "Nuovo Articolo"
→ Titolo + Sommario + Contenuto → "Pubblica"
→ Articolo visibile su /news
```

**Accesso negato e redirect post-login:**
```
Utente non autenticato accede a /area-riservata/news
→ Redirect a /login?redirect=/area-riservata/news
→ Login effettuato → redirect alla pagina originale
```

---

---

# ⚙️ Documentazione Tecnica

## Stack Tecnologico

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

## Prerequisiti e Installazione

**Requisiti:** Node.js >= 20.x, npm >= 10.x, accesso al progetto Supabase.

```bash
# Clona il repository
git clone <repository-url>
cd lions-club-massafra-mottola

# Installa le dipendenze
# --legacy-peer-deps è richiesto per compatibilità con Tiptap
npm install --legacy-peer-deps

# Configura le variabili d'ambiente
cp .env.example .env.local

# Avvia il server di sviluppo
npm run dev
```

Il sito sarà disponibile su `http://localhost:3000`.

**Script disponibili:**

```bash
npm run dev      # Sviluppo con hot-reload
npm run build    # Build di produzione
npm run start    # Server di produzione (dopo build)
npm run lint     # ESLint
```

## Variabili d'Ambiente

Creare `.env.local` nella root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-public-key>
```

> Non inserire mai la chiave `service_role` nelle variabili `NEXT_PUBLIC_*`. Su Netlify configurare in **Site Settings → Environment Variables**.

## Struttura del Progetto

```
lions-club-massafra-mottola/
├── public/                      # Asset statici (logo, favicon)
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout (font, ToastProvider)
│   │   ├── page.tsx             # Homepage
│   │   ├── chi-siamo/           # Sezione "Chi Siamo" + sottopagine
│   │   ├── news/                # Lista e dettaglio articoli
│   │   ├── contatti/page.tsx
│   │   ├── login/page.tsx
│   │   └── area-riservata/      # Area protetta (layout + pagine)
│   │       ├── layout.tsx       # Sidebar + header con logout
│   │       ├── page.tsx         # Dashboard
│   │       ├── news/            # Gestione news + editor
│   │       ├── documenti/
│   │       └── profilo/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LayoutWrapper.tsx
│   │   ├── Toast.tsx            # Context notifiche
│   │   └── RichTextEditor.tsx   # Editor Tiptap
│   ├── lib/
│   │   ├── siteConfig.ts        # Testi e immagini centralizzati
│   │   └── supabase/
│   │       ├── client.ts        # Client browser
│   │       ├── server.ts        # Client server-side
│   │       └── middleware.ts    # Gestione sessione
│   └── middleware.ts            # Middleware Next.js
├── next.config.mjs
├── tailwind.config.ts
├── netlify.toml
└── package.json
```

## Architettura e Routing

Il progetto usa il **Next.js App Router**. Ogni cartella in `src/app/` corrisponde a un segmento URL.

**Route pubbliche:**

| Percorso | Descrizione |
|----------|-------------|
| `/` | Homepage |
| `/chi-siamo` | Presentazione del club |
| `/chi-siamo/statuto` | Statuto |
| `/chi-siamo/regolamenti` | Regolamenti |
| `/chi-siamo/diventa-socio` | Come iscriversi |
| `/news` | Elenco articoli con ricerca e filtro anno |
| `/news/[id]` | Dettaglio articolo (slug dinamico) |
| `/contatti` | Contatti e mappa |
| `/login` | Login membri |

**Route protette (`/area-riservata/*`):**

| Percorso | Descrizione |
|----------|-------------|
| `/area-riservata` | Dashboard |
| `/area-riservata/news` | Gestione articoli |
| `/area-riservata/news/nuovo` | Crea/modifica articolo |
| `/area-riservata/documenti` | Archivio documenti |
| `/area-riservata/profilo` | Profilo utente |

## Autenticazione e Middleware

Il middleware in `src/middleware.ts` protegge le route `/area-riservata/*`:

1. Se la route non è `/area-riservata/*` → passa senza modifiche
2. Chiama `updateSession()` di `@supabase/ssr` per aggiornare la sessione nei cookie
3. Se nessuna sessione valida → redirect a `/login?redirect=<percorso>`
4. Dopo il login → redirect alla pagina originariamente richiesta

**Due istanze del client Supabase:**
- `src/lib/supabase/client.ts` — lato browser (Client Components)
- `src/lib/supabase/server.ts` — lato server (Server Components, API)

## Database — Supabase

### Tabella `news`

| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| `id` | uuid | Chiave primaria |
| `title` | text | Titolo |
| `slug` | text | Identificativo URL (auto-generato) |
| `excerpt` | text | Sommario |
| `content` | text | Corpo HTML |
| `image_url` | text | URL immagine di copertina |
| `published` | boolean | Stato pubblicazione |
| `published_at` | timestamptz | Data di pubblicazione |
| `author_id` | uuid | FK su `auth.users` |

### Tabella `profiles`

| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| `id` | uuid | Corrisponde a `auth.users.id` |
| `avatar_url` | text | URL avatar |

### Storage

- **Bucket `news-images`** — immagini degli articoli; URL pubblici generati con `getPublicUrl()`.

### Row Level Security (RLS)

Raccomandato:
- Lettura news pubblicate → accessibile a tutti (anche anonimi)
- Scrittura/modifica/eliminazione → solo utenti autenticati

## Componenti Principali

**`Header.tsx`** — Navbar con logo, menu desktop e hamburger mobile.

**`Footer.tsx`** — Footer con link, contatti e social.

**`LayoutWrapper.tsx`** — Applica Header e Footer alle pagine pubbliche. Non usato nell'area riservata.

**`area-riservata/layout.tsx`** — Sidebar collassabile su mobile, header con menu profilo/logout.

**`Toast.tsx`** — Context React per notifiche temporanee.

```typescript
import { useToast } from '@/components/Toast';

const { showToast } = useToast();
showToast('Operazione completata!', 'success');
// Tipi: 'success' | 'error' | 'info' | 'warning'
```

**`RichTextEditor.tsx`** — Editor Tiptap con: bold/italic/underline/strikethrough, titoli H1-H3, liste, citazioni, allineamento, colore testo, link, immagini, tabelle, embed YouTube. Output: HTML serializzato salvato in `news.content`.

## Design System

**Palette colori (Tailwind custom):**

```
lions-navy:       #00338D   Blu primario
lions-dark-navy:  #002244   Blu scuro
lions-gold:       #EBB700   Oro (accento)
lions-light-gold: #FFF3CC   Oro chiaro
lions-purple:     #622567
lions-light-blue: #407CCA
lions-green:      #00AB68
lions-orange:     #CA7700
```

**Font:** Inter (corpo) e Playfair Display (titoli), caricati via `next/font/google`.

**Gradienti:**
```
lions-gradient: linear-gradient(135deg, #00338D, #EBB700)
lions-hero:     linear-gradient(135deg, #002244, #00338D, #002244)
```

**Animazioni:** `fade-in-up`, `slide-in-left`, `slide-in-right`, `scale-in-up`, `scroll-arrow`.

## Configurazione del Sito

`src/lib/siteConfig.ts` centralizza testi e immagini principali. Per modificare contenuti senza toccare i componenti, intervenire su questo file:

```typescript
export const siteConfig = {
  hero: { backgroundImage, title, subtitle, motto, description },
  serviceImages: { visione, gioventu, sanita, ambiente, ... },
  ctaImage,
  aboutImage,
  contactInfo: { address, email, phone, meetingDay },
};
```

## Build e Deploy

**Build locale:**
```bash
npm run build
npm run start
```

**Deploy su Netlify** — configurato in `netlify.toml`:

```toml
[build]
  command = "npm install --legacy-peer-deps && npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Passi:
1. Collegare il repository a Netlify
2. Aggiungere le variabili d'ambiente nelle impostazioni del sito
3. Il deploy avviene automaticamente ad ogni push su `main`

**Note `next.config.mjs`:**

```javascript
images: { unoptimized: true }        // Compatibilità Netlify
eslint:     { ignoreDuringBuilds: true }
typescript: { ignoreBuildErrors: true }
```

> In produzione si consiglia di rimuovere le opzioni `ignore` e correggere gli errori.

## Linting

```bash
npm run lint
```

ESLint configurato con `eslint-config-next` (regole React, accessibilità `jsx-a11y`, Next.js). TypeScript in modalità strict con path alias `@/*` → `src/*`.
