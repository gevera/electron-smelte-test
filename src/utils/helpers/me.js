import { get } from 'svelte/store';
import { tempConfig } from '../stores/tempConfigs';

const URL = get(tempConfig);

export const getMe = async (token) => {
    const response = await fetch(`${URL.server_URL}${URL.me}`, {
        headers: {
            'Authorization': `token ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        return { success: true, data };
    } else {
        return { success: false }
    }
}