import { Playlist } from "./playlist";

export interface Track {
    id: number;
    path: string;
    avatar: string;
    name: string;
    // album: Album;
    playlists: Playlist;
    createdAt: Date;
    updatedAt: Date;
}

export interface TrackForm {
    id: number;
    path: string;
    avatar: string;
    name: string;
    // album: Album;
    playlists: Playlist;
    createdAt: Date;
    updatedAt: Date;
}