# CookieYes Clone - Gestione Cookie GDPR

Una piattaforma SaaS completa per la gestione dei banner cookie conformi a GDPR, CCPA e Digital Markets Act con Google Consent Mode v2.

## 🚀 Caratteristiche

- **Banner Cookie Personalizzabili**: Layout, colori e testi completamente configurabili
- **Conformità GDPR/CCPA**: Gestione completa dei consensi con categorie multiple
- **Google Consent Mode v2**: Integrazione nativa con Google Analytics e Ads
- **Dashboard Analytics**: Statistiche dettagliate sui consensi
- **Multi-tenant**: Supporto per più progetti e domini
- **Autenticazione Sicura**: Sistema di login/registrazione con bcrypt
- **Database SQLite**: Utilizzo di Turso per scalabilità

## 🛠️ Tecnologie

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS, Radix UI, shadcn/ui
- **Database**: Turso SQLite con Drizzle ORM
- **Autenticazione**: NextAuth.js
- **Deployment**: Vercel
- **Charts**: Recharts

## 📦 Installazione

### Prerequisiti

- Node.js 18+
- npm o yarn
- Account Turso per il database

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

Aggiungi le seguenti variabili:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
TURSO_DATABASE_URL=your-turso-database-url
TURSO_AUTH_TOKEN=your-turso-auth-token
```

4. **Inizializza il database**
```bash
npm run db:migrate
npm run db:seed
```

5. **Avvia il server di sviluppo**
```bash
npm run dev
```

## 🚀 Deployment

### Vercel

1. **Connetti il repository a Vercel**
2. **Configura le variabili d'ambiente**:
   - `NEXTAUTH_URL`: URL del tuo dominio
   - `NEXTAUTH_SECRET`: Chiave segreta per NextAuth
   - `TURSO_DATABASE_URL`: URL del database Turso
   - `TURSO_AUTH_TOKEN`: Token di autenticazione Turso

3. **Deploy automatico** con GitHub Actions

### GitHub Actions

Il progetto include un workflow CI/CD che:
- Esegue i test
- Verifica il linting
- Builda l'applicazione
- Deploya su Vercel

## 📁 Struttura del Progetto

```
├── components/          # Componenti React
│   ├── ui/             # Componenti UI (shadcn/ui)
│   └── providers.tsx   # Provider per NextAuth
├── lib/                # Utility e configurazioni
│   ├── utils.ts        # Funzioni utility
│   └── db.ts          # Configurazione database
├── app/                # App Router di Next.js
├── auth.ts             # Configurazione NextAuth
├── db.ts               # Schema e funzioni database
├── globals.css         # Stili globali
└── tailwind.config.ts  # Configurazione Tailwind
```

## 🔧 Script Disponibili

- `npm run dev` - Avvia il server di sviluppo
- `npm run build` - Builda per la produzione
- `npm run start` - Avvia il server di produzione
- `npm run db:migrate` - Esegue le migrazioni del database
- `npm run db:seed` - Popola il database con dati di test

## 📊 Funzionalità

### Dashboard
- Panoramica dei progetti
- Statistiche sui consensi
- Configurazione banner

### Gestione Progetti
- Creazione nuovi progetti
- Configurazione domini
- Personalizzazione banner

### Analytics
- Grafici dei consensi
- Statistiche per categoria
- Export dati

### Banner Cookie
- Layout personalizzabile
- Colori configurabili
- Testi multilingua
- Categorie cookie

## 🔒 Sicurezza

- Password hashate con bcrypt
- Autenticazione JWT
- Protezione CSRF
- Validazione input
- Rate limiting

## 📈 Performance

- Ottimizzazione Next.js
- Lazy loading componenti
- Caching database
- CDN Vercel

## 🤝 Contribuire

1. Fork il progetto
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 🆘 Supporto

Per supporto o domande:
- Apri una issue su GitHub
- Contatta il team di sviluppo

## 🙏 Ringraziamenti

- [shadcn/ui](https://ui.shadcn.com/) per i componenti UI
- [Turso](https://turso.tech/) per il database
- [Vercel](https://vercel.com/) per il deployment
- [Next.js](https://nextjs.org/) per il framework 