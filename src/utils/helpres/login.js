import { get } from 'svelte/store';
import { tempConfig } from '../stores/tempConfigs';

const URL = get(tempConfig);

export const login = async (data) => {
    const { username, password } = data;
    console.log(username, password);
    const response = await fetch(`${URL.server_URL}/api/users/login/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    if (response.ok) {
        const data = await response.json();

        console.log(data);
    } else {
        console.log({ success: false, message: 'Failed to login' })
    }
    return;
}