import { SPOTIFY_CONFIG } from '../constants/Config';

// Exact Spotify-like mock data for a perfect "Cold Start"
const MOCK_RELEASES = [
  { id: 'r1', name: 'Dawn FM', artists: [{ name: 'The Weeknd' }], images: [{ url: 'https://i.scdn.co/image/ab67616d0000b27344933a30386768a356391494' }], preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'r2', name: 'Hurry Up Tomorrow', artists: [{ name: 'The Weeknd' }], images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2738ae0c0c66007936162351717' }], preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'r3', name: 'After Hours', artists: [{ name: 'The Weeknd' }], images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273c5102f581d0a7a9284d63c71' }], preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 'r4', name: 'Certified Lover Boy', artists: [{ name: 'Drake' }], images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2734f0fd9dad639703dc0b36d54' }], preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
];

const MOCK_PLAYLISTS = [
  { id: 'p1', name: 'Liked Songs', images: [{ url: 'https://misc.scdn.co/titled/liked-songs/liked-songs-640.png' }] },
  { id: 'p2', name: 'Daily Mix 1', images: [{ url: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb4293385d324da85581797c31/1/en/default' }] },
  { id: 'p3', name: 'Discover Weekly', images: [{ url: 'https://newjams-images.scdn.co/image/ab67616d0000b273/default/120/en/default' }] },
  { id: 'p4', name: 'Chill Mix', images: [{ url: 'https://seed-mix-image.spotifycdn.com/v6/img/chill/4zX9Y73UqIe8iK9i3yF9vK/en/default' }] },
  { id: 'p5', name: 'On Repeat', images: [{ url: 'https://misc.scdn.co/titled/on-repeat/on-repeat-640.png' }] },
  { id: 'p6', name: 'Release Radar', images: [{ url: 'https://newjams-images.scdn.co/image/ab67616d0000b273/default/120/en/default' }] },
];

class SpotifyService {
  private accessToken: string | null = null;

  async getAccessToken() {
    if (this.accessToken) return this.accessToken;
    try {
      const auth = btoa(`${SPOTIFY_CONFIG.clientId.trim()}:${SPOTIFY_CONFIG.clientSecret.trim()}`);
      const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'grant_type=client_credentials',
      });
      const data = await res.json();
      this.accessToken = data.access_token;
      return this.accessToken;
    } catch (e) {
      return null;
    }
  }

  async fetchHomeData() {
    const token = await this.getAccessToken();
    if (!token) return { releases: MOCK_RELEASES, featured: MOCK_PLAYLISTS };

    try {
      // Fetch real data but fallback to mocks if empty/restricted
      const [relRes, featRes] = await Promise.all([
        fetch('https://api.spotify.com/v1/search?q=year:2024&type=album&limit=15', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('https://api.spotify.com/v1/search?q=hits&type=playlist&limit=15', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      const rel = await relRes.json();
      const feat = await featRes.json();

      return {
        releases: rel.albums?.items?.length > 0 ? rel.albums.items : MOCK_RELEASES,
        featured: feat.playlists?.items?.length > 0 ? feat.playlists.items : MOCK_PLAYLISTS
      };
    } catch (e) {
      return { releases: MOCK_RELEASES, featured: MOCK_PLAYLISTS };
    }
  }

  async search(query: string) {
    const token = await this.getAccessToken();
    if (!token) return { tracks: { items: [] } };
    try {
      const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return await res.json();
    } catch (e) {
      return { tracks: { items: [] } };
    }
  }
}

export const spotifyService = new SpotifyService();
