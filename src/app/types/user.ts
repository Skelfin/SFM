export interface User {
  id: number;
  nickname: string;
  password: string;
  access_rights: number;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthUser {
  nickname: string;
  password: string;
}

export interface IUser {
  id: number;
  nickname: string;
  token: string;
}

export interface UserForm {
  nickname: string;
  password: string;
  access_rights: number;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}
