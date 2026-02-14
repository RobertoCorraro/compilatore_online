# BOB Compilatore Policy - Browser Version

## 🌟 Versione Browser Standalone

Questa è una versione completamente browser-based del compilatore di template BOB Policy. **Non richiede alcun server PHP** - funziona interamente nel browser!

## ✨ Caratteristiche

## 🚀 Avvio Rapido (CONSIGLIATO)

Per evitare problemi con i download, usa il server locale incluso:

1. **Fai doppio click** su `START_SERVER.bat`
2. **Apri il browser** e vai a: `http://localhost:8080/index.html`
3. **Usa l'applicazione** - ora i download funzioneranno perfettamente!

> **Nota**: Il server deve rimanere attivo mentre usi l'applicazione. Premi CTRL+C nella finestra del terminale per fermarlo.

### Alternativa (senza server)
Puoi anche aprire direttamente `index.html` nel browser, ma i download potrebbero non funzionare a causa delle restrizioni di sicurezza del browser.

## 📋 Requisiti di Sistema

### Per usare il server locale (CONSIGLIATO):
- **Python 3.x** installato sul computer
  - Windows: Scarica da [python.org](https://www.python.org/downloads/)
  - Mac: Preinstallato o tramite Homebrew
  - Linux: Preinstallato o `sudo apt install python3`

### Per usare senza server:
- Nessun requisito - basta un browser moderno
- **Nota**: I download potrebbero non funzionare, usa "Anteprima" → "Salva con nome"

### 📦 Portabilità
Se vuoi spostare l'applicazione su un altro computer:
- **Con server locale**: Assicurati che Python sia installato sul nuovo computer
- **Senza server**: Funziona ovunque, ma i download potrebbero non funzionare

## ✨ Caratteristiche

- 🚀 **Nessun server richiesto** - Funziona completamente offline nel browser
- 📁 **Drag & Drop** - Trascina i file template direttamente nell'interfaccia
- 🎨 **Design moderno** - Interfaccia utente elegante con gradienti e animazioni
- 📝 **Estrazione automatica variabili** - Rileva automaticamente le variabili `{{nome_variabile}}` dai template
- ✅ **Compilazione multipla** - Compila più template contemporaneamente
- 💾 **Download immediato** - Scarica i documenti compilati in formato HTML
- 📋 **Copia rapida** - Copia il contenuto compilato negli appunti
- 👁️ **Anteprima** - Visualizza i documenti compilati in una nuova finestra

## 🚀 Come Usare

### 1. Aprire l'applicazione
Apri semplicemente il file `index.html` nel tuo browser preferito (Chrome, Firefox, Edge, Safari).

### 2. Caricare i template
- **Drag & Drop**: Trascina i file `.html` o `.md` nella zona di upload
- **Click**: Clicca sul pulsante "Seleziona File" per scegliere i file dal tuo computer

### 3. Selezionare i template
Tutti i template caricati sono selezionati di default. Puoi deselezionare quelli che non vuoi compilare.

### 4. Compilare i campi
L'applicazione rileva automaticamente tutte le variabili `{{nome_variabile}}` presenti nei template selezionati e crea i campi di input corrispondenti.

### 5. Generare i documenti
Clicca su "✨ Compila Selezionati" per generare i documenti.

### 6. Scaricare o copiare
Per ogni documento generato puoi:
- 👁️ **Anteprima** - Visualizzare il documento in una nuova finestra
- 💾 **Scarica HTML** - Scaricare il file HTML compilato
- 📋 **Copia Contenuto** - Copiare il contenuto negli appunti

## 🔧 Risoluzione Problemi

### Il download non funziona
Se il pulsante "Scarica HTML" non salva il file:

1. **Usa il server locale** - Fai doppio click su `START_SERVER.bat` e apri `http://localhost:8080/index.html`
2. **Usa Anteprima + Salva** - Clicca "Anteprima" e poi usa "File > Salva con nome" nel browser
3. **Usa "Copia Contenuto"** - Copia il contenuto e incollalo manualmente in un nuovo file HTML

### Perché succede?
I browser moderni hanno restrizioni di sicurezza quando si aprono file HTML localmente (protocollo `file://`). Alcuni browser bloccano il download automatico di file per motivi di sicurezza. **La soluzione è usare il server locale incluso.**

## 📝 Formato dei Template

I template devono utilizzare la sintassi `{{nome_variabile}}` per definire le variabili:

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <title>{{titolo}}</title>
</head>
<body>
    <h1>{{ragione_sociale}}</h1>
    <p>Email: {{email}}</p>
    <p>Telefono: {{telefono}}</p>
</body>
</html>
```

## 🎯 Vantaggi rispetto alla versione PHP

1. **Portabilità** - Funziona su qualsiasi dispositivo con un browser
2. **Privacy** - Tutti i dati rimangono nel tuo browser, nessun upload a server esterni
3. **Velocità** - Nessun tempo di attesa per il server
4. **Semplicità** - Nessuna installazione o configurazione richiesta
5. **Offline** - Funziona anche senza connessione internet

## 🔒 Privacy e Sicurezza

- ✅ Tutti i dati vengono elaborati localmente nel browser
- ✅ Nessun dato viene inviato a server esterni
- ✅ I template e i dati compilati rimangono sul tuo dispositivo
- ✅ Funziona completamente offline

## 📂 Struttura File

```
compilatore/
├── index.html          # Interfaccia principale
├── app.js             # Logica dell'applicazione
├── README.md          # Questa documentazione
└── templates/         # (Opzionale) Cartella per i template di esempio
    ├── Privacy_Policy_EDITABILE.html
    └── Cookie_Policy_EDITABILE.html
```

## 🆕 Funzionalità Future Suggerite

- [ ] **Download ZIP** - Implementare il download di tutti i documenti in un unico file ZIP (richiede libreria JSZip)
- [ ] **Salvataggio stato** - Salvare i dati inseriti in localStorage per riutilizzo
- [ ] **Live Preview** - Anteprima in tempo reale durante la compilazione
- [ ] **Export PDF** - Esportazione diretta in formato PDF
- [ ] **Temi personalizzabili** - Possibilità di cambiare il tema dell'interfaccia
- [ ] **Template manager** - Gestione avanzata dei template con categorie

## 🛠️ Tecnologie Utilizzate

- **HTML5** - Struttura dell'applicazione
- **CSS3** - Styling moderno con gradienti e animazioni
- **JavaScript (Vanilla)** - Logica dell'applicazione, nessuna dipendenza esterna
- **Bootstrap 5.3** - Framework CSS per layout responsive
- **File API** - Per la lettura dei file locali
- **Clipboard API** - Per la copia negli appunti

## 📄 Licenza

Questo progetto è una versione browser-based del BOB Compilatore Policy originale.

## 🤝 Contributi

Per miglioramenti o segnalazione bug, contatta lo sviluppatore originale.

---

**Versione**: 1.0.0 Browser Edition  
**Data**: Novembre 2025  
**Compatibilità**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
