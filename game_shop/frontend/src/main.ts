import {fetchGames} from './api';
import {renderGames} from './ui';

async function init() {
    try {
        const response = await fetchGames(1, 6);
        renderGames(response.data);
    } catch (error) {
        console.error('Error fetching games:', error);
    }
}

init();