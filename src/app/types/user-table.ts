export interface User {
    id: number;
    nickname: string;
    password: string;
    access_rights: number;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
  }