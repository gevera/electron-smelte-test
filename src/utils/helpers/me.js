import { get } from 'svelte/store';
import { tempConfig } from '../stores/tempConfigs';
import { user } from '../stores/user';
import { token } from '../stores/token';

const URL = get(tempConfig);


export const getMe = async (tokenReceived) => {
    console.log(`GET ME TOKEN ---> ${tokenReceived}`);
    token.set(tokenReceived);
    const response = await fetch(`${URL.server_URL}${URL.me}`, {
        headers: {
            'Authorization': `token ${tokenReceived}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        console.log(`GET ME ====>> ${JSON.stringify(data, null, 2)}`);
        user.set(data[0]);
        return { success: true, data };
    } else {
        return { success: false }
    }
}