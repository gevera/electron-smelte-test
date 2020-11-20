import { writable } from 'svelte/store';

export const token = writable('');


// Role zero is undeined or not logged in role
export const role = writable(0);