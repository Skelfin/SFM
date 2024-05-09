import { Album } from "./album";
import { Playlist } from "./playlist";

export interface Track {
    id: number;
    path: string;
    avatar: string;
    name: string;
    album: Album;
    playlists: Playlist[];
    createdAt: Date;
    updatedAt: Date;
    duration?: string;
}

export interface TrackForm {
    id: number;
    path: string;
    avatar: string;
    name: string;
    album: Album;
    playlists: Playlist[];
    createdAt: Date;
    updatedAt: Date;
}