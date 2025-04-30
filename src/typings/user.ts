import { Document } from "./document";

export enum Role  {
  ADMIN = 'admin',
  USER = 'user',
}

export type User = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isVerified: boolean;
  role: Role;
  documents: Document[];
  createdAt: Date
}
