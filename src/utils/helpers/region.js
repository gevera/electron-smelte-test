import { get } from 'svelte/store';
import { tempConfig } from '../stores/tempConfigs';
import { regions, cities } from '../stores/regions';
import { token } from '../stores/token';

const URL = get(tempConfig);
const TOKEN = get(token);



export const getRegions = async () => {
    const response = await fetch(`${URL.server_URL}${URL.region}`);

    if (response.ok) {
        const data = await response.json();
        regions.set(data);
    }
};

export const getOneRegion = async (id) => {
    console.log(TOKEN);
    const response = await fetch(
        `${$tempConfig.server_URL}${$tempConfig.region}${id}/`,
        {
            headers: {
                Authorization: `token ${TOKEN}`,
            },
        }
    );
    if (response.ok) {
        const data = await response.json();
        return data;
    }
};

export const getCities = async () => {
    const response = await fetch(`${URL.server_URL}${URL.city}`);

    if (response.ok) {
        const data = await response.json();
        cities.set(data);
    }
}