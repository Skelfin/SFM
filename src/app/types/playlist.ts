import { User } from "./user";

export interface Playlist {
    id: number;
    name: string
    avatar: string
    description: string
    createdAt: Date;
    updatedAt: Date;
    user: User;
  }
export interface PlaylistForm {
    name: string
    avatar: string
    description: string
    createdAt: Date;
    updatedAt: Date;
  }