import { get } from 'svelte/store';
import { tempConfig } from '../stores/tempConfigs';
import { regions } from '../stores/regions';

const URL = get(tempConfig);

export const getRegions = async (token) => {
    const response = await fetch(`${URL.server_URL}${URL.region}`);

    if (response.ok) {
        const data = await response.json();
        regions.set(data);
    }
}