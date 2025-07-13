# Test Funzionalità Cookie Facile

## 🎯 Obiettivo
Verificare che ogni utente possa accedere a:
1. **Personalizzazione banner** - Editor completo
2. **Analytics** - Statistiche consensi
3. **Cookie Scanner** - Scansione automatica

## 📋 Checklist Test

### 1. Accesso Utente
- [ ] Login con credenziali utente (non admin)
- [ ] Accesso alla dashboard
- [ ] Visualizzazione solo dei propri progetti

### 2. Personalizzazione Banner
- [ ] Clic su "✏️ Modifica" da un progetto
- [ ] Accesso alla pagina `/editor/[id]`
- [ ] Modifica colori, testi, posizione
- [ ] Salvataggio configurazione
- [ ] Anteprima live funzionante

### 3. Analytics
- [ ] Clic su "📊 Analytics" da un progetto  
- [ ] Accesso alla pagina `/analytics/[id]`
- [ ] Visualizzazione statistiche
- [ ] Grafici e tabelle funzionanti
- [ ] Esportazione CSV

### 4. Cookie Scanner
- [ ] Clic su "📋 Copia Script" da un progetto
- [ ] Script copiato correttamente
- [ ] Script caricabile da `/api/script/[id]`
- [ ] Banner apparisce sul sito
- [ ] Scansione automatica cookie attiva

## 🧪 Script di Test

### Test API Script
```javascript
// Testa se lo script viene servito correttamente
fetch('/api/script/YOUR_PROJECT_ID')
  .then(response => response.text())
  .then(script => {
    console.log('Script caricato:', script.length > 1000 ? 'OK' : 'ERRORE');
  });
```

### Test Cookie Scanner
```javascript
// Dopo aver caricato lo script
if (window.CookieConsent) {
  console.log('✅ Cookie system caricato');
  
  // Testa scansione
  const scanResults = window.CookieConsent.scanCookies();
  console.log('📊 Scan results:', scanResults);
  
  // Testa categorie
  console.log('🔍 Categorization test:');
  console.log('ga_test:', window.CookieConsent.categorizeByName('_ga_test'));
  console.log('fbp_test:', window.CookieConsent.categorizeByName('_fbp_test'));
  
} else {
  console.log('❌ Cookie system non disponibile');
}
```

## 🛠️ Risoluzione Problemi

### Errore 403 - Accesso negato
- Verificare che l'utente sia proprietario del progetto
- Admin possono accedere a tutti i progetti

### Errore 404 - Progetto non trovato
- Verificare che il progetto esista e sia attivo
- Controllare l'ID progetto nell'URL

### Script non carica
- Verificare che `/api/script/[id]` risponda
- Controllare console per errori CORS
- Testare con progetto default

## 🚀 Deployment Test

### Produzione
1. Deploy su Vercel
2. Testare tutti i link
3. Verificare che script sia servito correttamente
4. Testare su sito esterno

### Verifica Completa
- [ ] Registrazione nuovo utente
- [ ] Creazione progetto
- [ ] Personalizzazione banner
- [ ] Integrazione su sito test
- [ ] Monitoraggio analytics
- [ ] Scansione cookie attiva

## 💡 Note Tecniche

- **Editor**: Utilizza API `/api/projects/[id]` per caricamento/salvataggio
- **Analytics**: Utilizza API `/api/analytics/[id]` per statistiche
- **Scanner**: Integrato nello script generato da `/api/script/[id]`
- **Autenticazione**: Tutte le pagine verificano permessi utente
- **Sicurezza**: Utenti vedono solo i propri progetti 