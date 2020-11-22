import { get } from 'svelte/store';
import { tempConfig } from '../stores/tempConfigs';
import { regions, cities} from '../stores/regions';

const URL = get(tempConfig);

export const getRegions = async () => {
    const response = await fetch(`${URL.server_URL}${URL.region}`);

    if (response.ok) {
        const data = await response.json();
        regions.set(data);
    }
}

export const getCities = async () => {
    const response = await fetch(`${URL.server_URL}${URL.city}`);

    if (response.ok) {
        const data = await response.json();
        cities.set(data);
    }
}