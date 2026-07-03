import {fetchGames} from './api';
import {renderGames, showNotification} from './ui'; 

export function setupSearch(){
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (!searchInput) return;

    let debounceTimeout: ReturnType<typeof setTimeout>;

    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        const query = searchInput.value.trim().toLowerCase();
        
        debounceTimeout = setTimeout(async () => {
            try{
                const response = await fetchGames(1, 100);
                const allGames = response.data;
                if (query === '') {
                    renderGames(allGames);
                } else {
                    const filteredGames = allGames.filter(game =>
                        game.title.toLowerCase().includes(query)
                    );
                    renderGames(filteredGames);
                }
            } catch (error) {
                showNotification('Error fetching games', 'error');
            }
        }, 300);
    });
}