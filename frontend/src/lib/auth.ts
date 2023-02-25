import { writable } from 'svelte/store';
import type { User } from './types';

export interface AuthData {
  user: User;
  access_token: string;
}

export default writable<AuthData | undefined | null>(undefined);
