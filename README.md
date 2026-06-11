# Devil - Premium Music Streaming App 🎵

Devil is a high-fidelity, pixel-perfect clone of the Spotify app (2024/2025 UI), built using **React Native** and **Expo**. It features a modern discovery-based Home screen, a powerful search engine, and a global persistent player.

## ✨ Key Features
- **1:1 UI Clone:** Exact measurements, typography, and color schemes matched to the latest Spotify design.
- **Home Discovery Hub:** Dynamic "Jump back in", "Made For You", and "Recently Played" sections.
- **Global Persistent Player:** A floating MiniPlayer that stays synced across all screens.
- **Premium Full-Screen Modal:** Complete playback controls, real-time seek bar, and an interactive "Spotify Lyrics" card.
- **Smart Spotify Integration:** Connects to the Spotify Web API for real-time metadata, album art, and artist info.
- **Free "Premium" Experience:** Unlimited skips, no ads, and on-demand playback included by design.

## 🛠️ Tech Stack
- **Framework:** React Native / Expo
- **Navigation:** Expo Router (File-based navigation)
- **State Management:** React Context API (Player State)
- **UI Components:** Jetpack Compose-inspired Themed components
- **API:** Spotify Web API

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Expo Go app on your phone (for mobile testing)

### Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/Kishkindhan-A/music-app.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your API keys:
   - Create a file at `constants/Config.ts`
   - Add your Spotify Client ID and Secret:
   ```typescript
   export const SPOTIFY_CONFIG = {
     clientId: 'YOUR_CLIENT_ID',
     clientSecret: 'YOUR_CLIENT_SECRET',
   };
   ```

### Running the App
```bash
npx expo start
```
Press **'a'** for Android or scan the QR code with **Expo Go**.

## 📸 Screenshots
*(Add your screenshots here to make the repo look professional!)*

## 📄 License
MIT License - Created for educational purposes.
