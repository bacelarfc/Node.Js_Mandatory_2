import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);
export const authToken = writable("");

export const user = writable(null);