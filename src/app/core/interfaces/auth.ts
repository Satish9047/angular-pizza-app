import { User } from '../models/user.model';

export interface ApiResponse<T> {
  data: T | null;
  message: string;
  status: number;
  success: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ResponseUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isVerified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
