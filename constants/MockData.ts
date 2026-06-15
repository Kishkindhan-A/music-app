export interface Track {
  id: string;
  title: string;
  artist: string;
  albumUrl: string;
  audioUrl?: string;
}

export interface Playlist {
  id: string;
  name: string;
  creator: string;
  imageUrl: string;
}

export const recentlyPlayed: Playlist[] = [
  { id: '1', name: 'Liked Songs', creator: 'Spotify', imageUrl: 'https://misc.scdn.co/liked-songs/liked-songs-300.png' },
  { id: '2', name: 'Daily Mix 1', creator: 'Spotify', imageUrl: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebc02d416c309a68b04dc94576/1/en/default' },
  { id: '3', name: 'Discover Weekly', creator: 'Spotify', imageUrl: 'https://newjams-images.scdn.co/image/ab676477000033ad/spotify-discover-weekly-color/c02d416c309a68b04dc94576/source' },
  { id: '4', name: 'Top 50 - Global', creator: 'Spotify', imageUrl: 'https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg' },
  { id: '5', name: 'Release Radar', creator: 'Spotify', imageUrl: 'https://newjams-images.scdn.co/image/ab676477000033ad/spotify-release-radar-color/c02d416c309a68b04dc94576/source' },
  { id: '6', name: 'Lofi Beats', creator: 'Spotify', imageUrl: 'https://i.scdn.co/image/ab67706f000000035551996f500ba876bda73fa5' },
];

export const madeForYou: Playlist[] = [
  { id: 'm1', name: 'Daily Mix 2', creator: 'Spotify', imageUrl: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb1d2c20a469a43aeb2943dfda/2/en/default' },
  { id: 'm2', name: 'Daily Mix 3', creator: 'Spotify', imageUrl: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb981ebc6b3e73b22cf3ff7e32/3/en/default' },
  { id: 'm3', name: 'Daily Mix 4', creator: 'Spotify', imageUrl: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eba00b11c129b27a88fc72f36b/4/en/default' },
];

export const popularAlbums: Playlist[] = [
  { id: 'a1', name: 'Starboy', creator: 'The Weeknd', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452' },
  { id: 'a2', name: 'After Hours', creator: 'The Weeknd', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273c8b444ef094278e0681f24f4' },
  { id: 'a3', name: 'Dawn FM', creator: 'The Weeknd', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2734469cbdd1be851e069123c57' },
];

export const mockTracks: Track[] = [
  {
    id: 't1',
    title: 'Starboy',
    artist: 'The Weeknd, Daft Punk',
    albumUrl: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder audio
  },
  {
    id: 't2',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    albumUrl: 'https://i.scdn.co/image/ab67616d0000b273c8b444ef094278e0681f24f4',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 't3',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    albumUrl: 'https://i.scdn.co/image/ab67616d0000b273c8b444ef094278e0681f24f4',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  }
];

export const searchCategories = [
  { id: 'c1', name: 'Podcasts', color: '#E13300', imageUrl: 'https://i.scdn.co/image/567158eb895ad26718a814345af0fc43ee785ec5' },
  { id: 'c2', name: 'Live Events', color: '#7358FF', imageUrl: 'https://i.scdn.co/image/ab67706f000000028a38db8d123eec774fdb8ce9' },
  { id: 'c3', name: 'Made For You', color: '#1E3264', imageUrl: 'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe' },
  { id: 'c4', name: 'New Releases', color: '#E8115B', imageUrl: 'https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112' },
  { id: 'c5', name: 'Pop', color: '#148A08', imageUrl: 'https://i.scdn.co/image/ab67706f000000028eeb0462bf4773ceaf7a195c' },
  { id: 'c6', name: 'Hip-Hop', color: '#BC5900', imageUrl: 'https://i.scdn.co/image/ab67706f000000029bb6af539d072de34548d15c' },
];
