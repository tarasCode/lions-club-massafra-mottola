# Documentazione Funzionale — Lions Club Massafra-Mottola "Le Cripte" ODV

## Indice

1. [Panoramica del Sistema](#1-panoramica-del-sistema)
2. [Utenti e Ruoli](#2-utenti-e-ruoli)
3. [Sito Pubblico](#3-sito-pubblico)
4. [Area Riservata — Accesso](#4-area-riservata--accesso)
5. [Gestione News e Articoli](#5-gestione-news-e-articoli)
6. [Archivio Documenti](#6-archivio-documenti)
7. [Gestione Profilo](#7-gestione-profilo)
8. [Modulo di Contatto](#8-modulo-di-contatto)
9. [Flussi Principali](#9-flussi-principali)

---

## 1. Panoramica del Sistema

Il sito del **Lions Club Massafra-Mottola "Le Cripte" ODV** è un'applicazione web composta da due macro-aree:

| Area | Accessibile a | Scopo |
|------|---------------|-------|
| **Sito Pubblico** | Tutti (nessun login) | Presentare il club, pubblicare notizie, ricevere contatti |
| **Area Riservata** | Solo soci autenticati | Gestire contenuti, documenti e profilo |

---

## 2. Utenti e Ruoli

### Visitatore anonimo

Chi accede al sito senza effettuare il login può:
- Navigare tutte le pagine pubbliche
- Leggere le notizie pubblicate
- Consultare le informazioni sul club (statuto, regolamenti, come diventare socio)
- Inviare un messaggio tramite il modulo di contatto

### Socio autenticato (membro)

Un socio che ha effettuato il login può, in aggiunta a tutto quanto sopra:
- Accedere alla **dashboard** dell'area riservata
- **Creare, modificare ed eliminare notizie** (articoli del blog)
- **Pubblicare o mettere in bozza** gli articoli
- **Caricare immagini** per gli articoli
- **Gestire l'archivio documenti** del club
- **Modificare il proprio profilo** (incluso l'avatar)

> Attualmente il sistema prevede un unico livello di accesso per i soci. Non esiste un ruolo amministratore separato.

---

## 3. Sito Pubblico

### Homepage (`/`)

La homepage è la vetrina principale del club. Contiene:

- **Hero section** — Immagine di sfondo con titolo, motto del club e call-to-action
- **Contatori animati** — Anno di fondazione, numero soci, paesi Lions nel mondo, beneficiari raggiunti
- **Aree di servizio** — Le 8 aree di impegno dei Lions (Visione, Gioventù, Salute, Ambiente, Istruzione, Comunità, Lotta alla Fame, Diritti Umani), ciascuna con immagine e descrizione
- **Ultime notizie** — Gli articoli più recenti pubblicati dal club
- **Call-to-action** — Invito a unirsi al club o a contattarci

### Chi Siamo (`/chi-siamo`)

Presenta il Lions Club International e il capitolo locale. Include:
- Storia dell'organizzazione Lions nel mondo
- Presentazione del club Massafra-Mottola "Le Cripte"
- Missione e valori

**Sottosezioni:**
- `/chi-siamo/statuto` — Statuto ufficiale del club
- `/chi-siamo/regolamenti` — Regolamento interno
- `/chi-siamo/diventa-socio` — Procedura e requisiti per l'iscrizione

### News (`/news`)

Elenco di tutti gli articoli pubblicati dal club. Funzionalità:
- **Ricerca testuale** — Campo di testo per cercare negli articoli per parole chiave
- **Filtro per anno** — Menu a tendina per filtrare gli articoli per anno di pubblicazione
- **Anteprima articoli** — Ogni card mostra titolo, immagine, sommario e data

### Dettaglio articolo (`/news/[id]`)

Pagina completa dell'articolo con:
- Immagine di copertina
- Titolo e data di pubblicazione
- Contenuto completo in HTML (testo formattato, immagini, video, tabelle)
- Pulsante di navigazione "Torna alle notizie"

### Contatti (`/contatti`)

Pagina di contatto con:
- **Modulo di contatto** — Campi: nome, email, oggetto, messaggio
- **Informazioni di sede** — Indirizzo, email, telefono, giorno delle riunioni
- **Mappa** — Mappa Google Maps integrata dell'area Massafra-Mottola
- **Social media** — Link a Facebook, Instagram, LinkedIn
- **FAQ** — Domande frequenti sul club

---

## 4. Area Riservata — Accesso

### Login (`/login`)

Per accedere all'area riservata, il socio deve:
1. Recarsi su `/login`
2. Inserire la propria **email** e **password**
3. Cliccare su "Accedi"

In caso di credenziali errate, viene mostrato un messaggio di errore.

Dopo il login, si viene reindirizzati alla dashboard (`/area-riservata`) oppure alla pagina originalmente richiesta (se si era stati reindirizzati al login automaticamente).

### Logout

Il logout è accessibile dal menu profilo nella barra superiore dell'area riservata. Cliccando su "Esci" la sessione viene terminata e si viene reindirizzati alla homepage.

### Protezione delle route

Tutte le pagine sotto `/area-riservata/` sono protette: un utente non autenticato che tenta di accedervi viene automaticamente reindirizzato alla pagina di login.

---

## 5. Gestione News e Articoli

### Elenco articoli (`/area-riservata/news`)

La pagina mostra l'elenco di tutti gli articoli (pubblicati e bozze). Per ogni articolo sono visibili:
- Titolo
- Data di pubblicazione o stato "Bozza"
- Azioni: **Modifica** e **Elimina**

### Creazione di un nuovo articolo (`/area-riservata/news/nuovo`)

Per creare un articolo:
1. Cliccare su "Nuovo Articolo" dalla pagina di gestione news
2. Compilare i campi obbligatori:
   - **Titolo** — Genera automaticamente lo slug (URL dell'articolo)
   - **Sommario** — Breve descrizione che appare nelle anteprime
3. Compilare i campi opzionali:
   - **Immagine di copertina** — Caricare un'immagine dal proprio dispositivo (viene salvata sullo storage Supabase)
   - **Contenuto** — Corpo dell'articolo scritto con l'editor WYSIWYG (vedi sotto)
4. Scegliere se **salvare come bozza** o **pubblicare immediatamente**
5. Cliccare su "Salva" o "Pubblica"

### Modifica di un articolo esistente

1. Dalla lista articoli, cliccare il pulsante "Modifica"
2. L'editor si apre con i dati precompilati
3. Apportare le modifiche
4. Salvare

### Eliminazione di un articolo

1. Dalla lista articoli, cliccare il pulsante "Elimina"
2. Confermare l'operazione nel dialogo di conferma
3. L'articolo viene rimosso definitivamente (operazione irreversibile)

### Editor di testo (WYSIWYG)

L'editor permette di formattare il contenuto con una barra degli strumenti completa:

| Strumento | Descrizione |
|-----------|-------------|
| Grassetto, Corsivo, Sottolineato, Barrato | Formattazione inline del testo |
| Titoli H1–H3 | Intestazioni di sezione |
| Lista puntata / numerata | Elenchi |
| Citazione | Blocco citazione |
| Allineamento | Sinistra, centro, destra, giustificato |
| Colore testo | Selettore colore |
| Link | Inserimento collegamento ipertestuale |
| Immagine | Inserimento immagine tramite URL |
| Tabella | Inserimento e modifica tabelle |
| Video YouTube | Embed di video tramite URL YouTube |

### Pubblicazione e bozze

- **Bozza**: l'articolo è salvato ma non visibile sul sito pubblico
- **Pubblicato**: l'articolo è visibile a tutti nella sezione News del sito
- Lo stato può essere cambiato in qualsiasi momento dalla pagina di modifica

---

## 6. Archivio Documenti

La sezione `/area-riservata/documenti` permette la gestione dell'archivio documentale del club.

Le funzionalità includono la visualizzazione e gestione dei documenti ufficiali (verbali, comunicazioni, materiale istituzionale).

---

## 7. Gestione Profilo

Dalla pagina `/area-riservata/profilo`, il socio può:

- **Caricare o aggiornare l'avatar** — Selezionare un'immagine dal dispositivo; viene caricata sullo storage Supabase e associata al profilo
- Visualizzare le informazioni del proprio account

---

## 8. Modulo di Contatto

Il modulo nella pagina `/contatti` permette a chiunque di inviare un messaggio al club.

**Campi richiesti:**
- Nome e cognome
- Indirizzo email
- Oggetto del messaggio
- Testo del messaggio

**Validazione:**
- Tutti i campi sono obbligatori
- Il formato email viene verificato prima dell'invio

Dopo l'invio, viene mostrata una notifica di conferma.

---

## 9. Flussi Principali

### Flusso: pubblicazione di una notizia

```
Socio effettua login
    → Vai a /area-riservata/news
    → Clicca "Nuovo Articolo"
    → Compila titolo, sommario, contenuto
    → Carica immagine di copertina (opzionale)
    → Clicca "Pubblica"
    → Articolo visibile su /news
```

### Flusso: un visitatore legge una notizia

```
Visitatore apre /news
    → Vede la lista degli articoli pubblicati
    → Clicca su un articolo
    → Legge il contenuto completo su /news/[slug]
```

### Flusso: invio di un messaggio di contatto

```
Visitatore apre /contatti
    → Compila il modulo (nome, email, oggetto, messaggio)
    → Clicca "Invia"
    → Visualizza conferma
```

### Flusso: accesso negato e redirect post-login

```
Utente non autenticato tenta di accedere a /area-riservata/news
    → Middleware rileva assenza sessione
    → Reindirizza a /login?redirect=/area-riservata/news
    → Utente effettua login
    → Viene reindirizzato a /area-riservata/news (destinazione originale)
```
