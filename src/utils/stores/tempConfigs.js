import { read } from 'fs';
import { readable } from 'svelte/store';

export const tempConfig = readable({
    server_URL: 'http://81.30.178.216:8000/api',
    login: '/users/login/',
    me: '/users/me/',
    customer: '/users/customer/',
    region: '/region/region/',
    city: '/region/city/',
    orderList: '/order/list/',
    orderCreate: '/order/create/',
    orderExecute: '/order/execute/',
    orderImage: '/order/review-images/',
    password: '/users/password/'
})