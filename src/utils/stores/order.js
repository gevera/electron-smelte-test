import { writable } from 'svelte/store';

export const orderID = writable('');
export const rpID = writable('');
export const status = writable('');
export const customer = writable('');
export const executorID = writable('');
export const showDialogAgreement = writable(false);