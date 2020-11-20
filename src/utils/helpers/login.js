import { get } from 'svelte/store';
import { tempConfig } from '../stores/tempConfigs';
import { token } from '../stores/token';
import { user } from '../stores/user';
import { getMe } from './me';

const URL = get(tempConfig);

export const login = async (data) => {
    const { username, password } = data;
    console.log(username, password);
    const response = await fetch(`${URL.server_URL}${URL.login}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    if (response.ok) {
        const data = await response.json();
        const { token: tokenRecieved } = data;
        token.set(tokenRecieved);
        const responseMe = await getMe(tokenRecieved);
        if (responseMe.success) {
            user.set(responseMe.data[0]);
            return { success: true }
        }
    }
    return { success: false }
}