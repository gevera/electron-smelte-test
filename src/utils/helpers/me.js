import { get } from 'svelte/store';
import { tempConfig } from '../stores/tempConfigs';

const URL = get(tempConfig);


export const getMe = async (token) => {
    console.log(`GET ME TOKEN ---> ${token}`);
    const response = await fetch(`${URL.server_URL}${URL.me}`, {
        headers: {
            'Authorization': `token ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        console.log(`GET ME ====>> ${JSON.stringify(data, null, 2)}`);
        return { success: true, data };
    } else {
        return { success: false }
    }
}