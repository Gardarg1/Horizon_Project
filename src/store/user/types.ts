/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThunkCallbacks } from '@/src/shared/createThunkWithCallbacks';

export interface UserState {
  data: User;
  loading: boolean;
  loginError: string;
  signupError: string;
}
export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  isActivated: boolean;
  role: string;
  donateCurrency: number;
  gameCurrency: number;
  capePath: string | undefined;
  skinPath: string | undefined;
  avatarPath: string | undefined;
}
export interface UserResponse {
  user: User;
  accessToken: string;
}

export interface LoginArgs extends ThunkCallbacks<any> {
  username: string;
  password: string;
}
export interface RegistrationArgs extends ThunkCallbacks<any> {
  username: string;
  password: string;
  email: string;
}
