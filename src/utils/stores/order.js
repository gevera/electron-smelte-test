import { writable } from 'svelte/store';

export const orderID = writable('');
export const status = writable('');
export const showDialogAgreement = writable(false);