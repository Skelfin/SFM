import { Author } from "./author";
import { Track } from "./track";

export interface Album {
    id: number;
    name: string;
    description: string;
    avatar: string;
    year: number;
    tracks: Track[];
    authors: Author[];
    createdAt: Date;
    updatedAt: Date;
}