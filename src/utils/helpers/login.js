import { get } from 'svelte/store';
import { tempConfig } from '../stores/tempConfigs';
import { token } from '../stores/token';
import { user } from '../stores/user';
import { getMe } from './me';

const URL = get(tempConfig);

export const login = async (data) => {
    const { username, password } = data;
    // console.log(username, password);
    const response = await fetch(`${URL.server_URL}${URL.login}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    if (response.ok) {
        const data = await response.json();
        // console.log(`LOGIN DATA ===>`);
        // console.log(data)
        // console.log(data.token);
        localStorage.setItem("token", data.token);
        token.set(data.token);
        const responseMe = await getMe(data.token);
        if (responseMe.success) {
            user.set(responseMe.data[0]);
            // console.log(`LOGIN DATA ===> ${JSON.stringify(responseMe.data[0], null, 2)}`)
            return { success: true }
        }
    }
    return { success: false }
}