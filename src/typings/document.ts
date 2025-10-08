/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mode } from "@/server/session.server";
import { User } from "./user";

export enum ProcessingStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export type Document = {
  _id: string;
  user: User
  userID: string;
  originalFilename: string;
  mimeType: string;
  originalFilePath: string;
  formattedFilePath: string;
  coverLetterPath: string;
  status: ProcessingStatus;
  jobDescription: string;
  mode: Mode;
  feedback: Record<string, any>
  createdAt: Date;
}

export interface UploadResponse  {
  status: ProcessingStatus;
  documentID: string;
  formattedFile?: string;
  coverLetterFile?: string;
  feedback?: string;        // plain text
  error?: string;
}
