import { Album } from "./album";
import { Author } from "./author";
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
    authors?: Author[];
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