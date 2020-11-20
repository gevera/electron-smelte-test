import { read } from 'fs';
import { readable } from 'svelte/store';

export const tempConfig = readable({
    server_URL: 'http://81.30.178.216:8000/api',
    login: '/users/login/',
    me: '/users/me/',
    region: '/region/region/'
})