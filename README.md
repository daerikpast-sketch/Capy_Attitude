# 🖕 Freches Capybara Generator

Eine React-Webanwendung, die mithilfe der Google Gemini API Bilder von Capybaras generiert. Der Clou: Egal was passiert, das Capybara zeigt immer den Mittelfinger.

## 🚀 Voraussetzungen

Bevor du startest, stelle sicher, dass du Folgendes installiert hast:

1.  **Node.js** (Version 18 oder höher): [Download hier](https://nodejs.org/)
2.  **Git**: [Download hier](https://git-scm.com/)
3.  Einen **Google Gemini API Key**: [Hier kostenlos erstellen](https://aistudio.google.com/app/apikey)

---

## 🛠️ Installation & Lokaler Start

Folge diesen Schritten, um die App auf deinem Computer zum Laufen zu bringen:

### 1. Repository klonen (oder Dateien herunterladen)
Erstelle einen Ordner für das Projekt und öffne ein Terminal darin.

### 2. Abhängigkeiten installieren
Führe folgenden Befehl aus, um React und alle notwendigen Bibliotheken herunterzuladen:

```bash
npm install
```

### 3. API Key einrichten
Damit die App Bilder generieren kann, braucht sie deinen API Key.

1.  Erstelle im Hauptverzeichnis eine Datei namens `.env`.
2.  Füge folgende Zeile ein (ersetze `DEIN_KEY` mit deinem echten Key):

```env
VITE_API_KEY=DEIN_GEMINI_API_KEY_HIER
```

### 4. App starten
Starte den lokalen Entwicklungsserver:

```bash
npm run dev
```

Öffne nun deinen Browser unter der Adresse, die im Terminal angezeigt wird (meistens `http://localhost:5173`).

---

## 🌍 Veröffentlichung (Deployment)

Der einfachste Weg, diese App kostenlos online zu stellen, ist über **Vercel** in Kombination mit **GitHub**.

### Schritt 1: Code auf GitHub hochladen
1.  Erstelle ein neues Repository auf [GitHub.com](https://github.com).
2.  Lade deinen Code hoch (aber **NICHT** die `.env` Datei!).

### Schritt 2: Mit Vercel verbinden
1.  Gehe auf [Vercel.com](https://vercel.com) und erstelle einen Account.
2.  Klicke auf "Add New Project".
3.  Wähle dein GitHub-Repository aus.
4.  **WICHTIG:** Bei den "Environment Variables" musst du deinen API Key hinzufügen:
    *   Name: `VITE_API_KEY`
    *   Value: `Dein_Echter_API_Key`
5.  Klicke auf "Deploy".

🎉 Fertig! Deine App ist nun unter einer https-Domain erreichbar.

---

## ⚠️ Sicherheitshinweis

Da dies eine reine Frontend-App ist, wird der API Key technisch gesehen an den Browser des Nutzers gesendet.

**Schutzmaßnahme:**
Gehe in die [Google Cloud Console](https://console.cloud.google.com/apis/credentials) zu deinem API Key und beschränke ihn unter "Application restrictions" auf **HTTP referrers**. Trage dort die URL deiner veröffentlichten App ein (z.B. `https://dein-capybara-app.vercel.app/*`). So kann niemand deinen Key auf anderen Webseiten missbrauchen.
