import {fetchGames} from './api';
import {renderGames} from './ui';
import {setupGameActions} from './buttons';
import {setupSearch} from './search';
import './styles/global.css';

async function init() {
    try {
        const response = await fetchGames();
        renderGames(response.data);
        const container = document.getElementById('games-container');
        setupGameActions(container);
        setupSearch();
        
    } catch (error) {
        console.error('Error fetching games:', error);
    }
}

init();