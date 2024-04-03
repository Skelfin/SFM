import { Album } from "./Album";

export interface Author {
  id: number;
  nickname: string;
  description: string;
  avatar: string;
  albums: Album[];
  createdAt: Date;
  updatedAt: Date;
}
