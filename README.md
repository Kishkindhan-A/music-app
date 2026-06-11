# Musical App (Devil)

A high-fidelity Spotify clone built with React Native and Expo. This app replicates the premium user experience of Spotify's 2024/2025 interface.

## 📱 Features

*   **Pixel-Perfect UI:** Identical design to the official Spotify app.
*   **Home Screen:** Personalized greetings, recently played grid, and curated sections.
*   **Live Search:** Search for any track or artist using the Spotify Web API.
*   **Global Player:** A persistent MiniPlayer and a full-screen player with lyrics.
*   **Plus (+) Button:** The latest 2025 Spotify UI update for saving tracks.

## ⚠️ What's Currently Simulated / Missing

*   **Full Audio Playback:** Currently uses 30-second free Spotify previews. Full-length streaming requires a premium account or third-party stream integration.
*   **Offline Downloads:** The "Download" feature is UI-only and does not save files to local storage yet.
*   **User Profiles:** The app uses a shared developer token; individual user login (OAuth) for personal playlists is not implemented.
*   **Real-time Lyrics:** Lyrics are currently static placeholders within the premium player UI.

## 🛠 Tech Stack

*   **Framework:** React Native / Expo
*   **Navigation:** Expo Router
*   **State:** React Context API
*   **Icons:** MaterialCommunityIcons & Ionicons

## 🚀 Installation & Setup

1.  **Clone the Repo:**
    ```bash
    git clone https://github.com/Kishkindhan-A/music-app.git
    ```
2.  **Install Packages:**
    ```bash
    npm install
    ```
3.  **Config API Keys:**
    Add your Spotify `clientId` and `clientSecret` in `constants/Config.ts`.
4.  **Run:**
    ```bash
    npx expo start
    ```

## 📄 License

MIT License. This project is for educational and research purposes only.

---
*Created by Senior Developer for the Devil Project.*
