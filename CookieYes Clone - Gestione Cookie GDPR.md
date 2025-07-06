# CookieYes Clone - Gestione Cookie GDPR

Un clone completo di CookieYes costruito con Next.js, che include gestione dei consensi cookie, Google Consent Mode v2, dashboard analytics e molto altro.

## 🚀 Caratteristiche

### ✅ Autenticazione e Gestione Utenti
- Sistema di registrazione e login sicuro
- Autenticazione con NextAuth.js
- Gestione sessioni persistenti

### ✅ Gestione Progetti
- Creazione e gestione di più progetti/siti web
- Configurazione personalizzabile per ogni progetto
- Editor banner cookie in tempo reale

### ✅ Banner Cookie Avanzato
- Banner completamente personalizzabile (colori, testi, posizione)
- Modal di personalizzazione consensi
- Supporto per categorie: Necessari, Analytics, Marketing, Preferenze
- Design responsive e accessibile

### ✅ Google Consent Mode v2
- Implementazione completa di Google Consent Mode v2
- Aggiornamento automatico dello stato dei consensi
- Integrazione con Google Analytics e altri servizi

### ✅ Script Embed Intelligente
- Generazione automatica script embed per ogni progetto
- Gestione automatica script con `data-cookie-category`
- Attivazione/disattivazione script basata sui consensi

### ✅ Analytics e Reporting
- Dashboard analytics completa con grafici interattivi
- Statistiche in tempo reale sui consensi raccolti
- Grafici a torta per distribuzione consensi
- Andamento temporale dei consensi
- Tabelle dettagliate per analisi approfondita

### ✅ Privacy e Sicurezza
- Hashing degli indirizzi IP per privacy
- Conformità GDPR completa
- Gestione sicura dei dati sensibili

## 🛠️ Tecnologie Utilizzate

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Autenticazione**: NextAuth.js
- **Database**: Turso (SQLite), libSQL
- **Grafici**: Recharts
- **Deployment**: Vercel
- **Icone**: Lucide React

## 📦 Installazione

### Prerequisiti
- Node.js 18+ 
- npm o yarn
- Account Turso (per produzione)
- Account Vercel (per deployment)

### Setup Locale

1. **Clona il repository**
   ```bash
   git clone <repository-url>
   cd cookieyes-clone
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Configura le variabili d'ambiente**
   ```bash
   cp .env.example .env.local
   ```
   
   Modifica `.env.local` con i tuoi valori:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   # Per sviluppo locale, lascia vuoti TURSO_DATABASE_URL e TURSO_AUTH_TOKEN
   ```

4. **Avvia il server di sviluppo**
   ```bash
   npm run dev
   ```

5. **Apri l'applicazione**
   Vai su [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment su Vercel

### 1. Setup Database Turso

```bash
# Installa Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Crea un nuovo database
turso db create cookieyes-clone

# Ottieni l'URL del database
turso db show cookieyes-clone

# Crea un token di autenticazione
turso db tokens create cookieyes-clone
```

### 2. Deploy su Vercel

1. **Connetti il repository a Vercel**
   - Vai su [vercel.com](https://vercel.com)
   - Importa il tuo repository GitHub
   - Configura le variabili d'ambiente:

2. **Variabili d'ambiente Vercel**
   ```
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=your-production-secret
   TURSO_DATABASE_URL=libsql://your-database.turso.io
   TURSO_AUTH_TOKEN=your-turso-token
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

## 📖 Utilizzo

### 1. Registrazione e Login
- Crea un account sulla pagina di registrazione
- Accedi con le tue credenziali

### 2. Creazione Progetto
- Dalla dashboard, clicca "Nuovo Progetto"
- Inserisci nome e dominio del tuo sito web
- Configura le impostazioni del banner

### 3. Installazione Script
- Vai alla tab "Codice" del tuo progetto
- Copia lo script embed generato
- Incolla nel `<head>` del tuo sito web

### 4. Personalizzazione Banner
- Usa la tab "Impostazioni" per personalizzare:
  - Colori del banner
  - Testi e messaggi
  - Posizione del banner
  - Categorie di cookie

### 5. Monitoraggio Analytics
- Vai alla tab "Analytics" per vedere:
  - Statistiche sui consensi
  - Grafici di distribuzione
  - Andamento temporale
  - Dettagli per categoria

## 🔧 Configurazione Avanzata

### Categorie Cookie Personalizzate

Il sistema supporta 4 categorie di cookie:

1. **Necessari** (sempre attivi)
2. **Analytics** - Google Analytics, statistiche
3. **Marketing** - Pubblicità, remarketing
4. **Preferenze** - Impostazioni utente, personalizzazione

### Script con Categorie

Aggiungi l'attributo `data-cookie-category` ai tuoi script:

```html
<!-- Google Analytics -->
<script type="text/plain" data-cookie-category="analytics">
  // Il tuo codice Google Analytics
</script>

<!-- Facebook Pixel -->
<script type="text/plain" data-cookie-category="marketing">
  // Il tuo codice Facebook Pixel
</script>
```

### Google Consent Mode v2

Il sistema implementa automaticamente Google Consent Mode v2:

```javascript
// Stato iniziale (tutti negati)
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied'
});

// Aggiornamento basato sui consensi
gtag('consent', 'update', {
  'analytics_storage': 'granted', // Se analytics accettati
  'ad_storage': 'granted'        // Se marketing accettati
});
```

## 🧪 Testing

### Test Locali
```bash
# Test dell'applicazione
npm run test

# Test di build
npm run build
npm start
```

### Test del Banner Cookie
1. Apri la pagina di test: `/test.html`
2. Interagisci con il banner
3. Controlla la console per i log
4. Verifica Google Consent Mode nel dataLayer

## 📁 Struttura del Progetto

```
cookieyes-clone/
├── src/
│   ├── app/                    # App Router Next.js
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # Autenticazione
│   │   │   ├── projects/      # Gestione progetti
│   │   │   └── consent/       # Registrazione consensi
│   │   ├── dashboard/         # Dashboard utente
│   │   ├── login/             # Pagina login
│   │   ├── register/          # Pagina registrazione
│   │   └── embed/             # Script embed
│   ├── components/            # Componenti React
│   │   ├── ui/               # Componenti shadcn/ui
│   │   └── ConsentAnalytics.tsx
│   └── lib/                   # Utilities e configurazioni
│       ├── auth.ts           # Configurazione NextAuth
│       ├── db.ts             # Configurazione database
│       └── utils.ts          # Utility functions
├── public/                    # File statici
├── .env.example              # Esempio variabili d'ambiente
├── vercel.json               # Configurazione Vercel
└── README.md                 # Documentazione
```

## 🤝 Contribuire

1. Fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push del branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi `LICENSE` per maggiori informazioni.

## 🆘 Supporto

Per supporto e domande:
- Apri una issue su GitHub
- Consulta la documentazione
- Controlla gli esempi nella cartella `/examples`

## 🔄 Roadmap

- [ ] Esportazione dati CSV
- [ ] Filtri avanzati per analytics
- [ ] Integrazione con più servizi analytics
- [ ] API REST completa
- [ ] Webhook per notifiche
- [ ] Multi-lingua
- [ ] Temi personalizzabili
- [ ] A/B testing per banner

---

**Sviluppato con ❤️ usando Next.js e moderne tecnologie web**

