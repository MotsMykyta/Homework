import type {Game} from './types';

export function createGameCard(game: Game): string {
    const coverUrl = game.cover || 'https://via.placeholder.com/150x200?text=No+Cover';

    return `<div class="game-card" data-id="${game.id}">
            <img src="${coverUrl}" alt="${game.title}" class="game-cover">
            <div class="game-info">
                <h3>${game.title}</h3>
                <p class="game-genre">Жанр: ${game.genre}</p>
                <p class="game-platform">Платформы: ${game.platform.join(', ')}</p>
                <p class="game-price">Цена: $${game.price}</p>
                <div class="game-actions">
                    <button class="btn-detail">Подробнее</button>
                    <button class="btn-edit">Редактировать</button>
                    <button class="btn-delete">Удалить</button>
                </div>
            </div>
        </div>
        `;
}

export function renderGames(games: Game[]): void {
    const container = document.getElementById('games-container');
    if (!container) return;

    if(games.length === 0){
        container.innerHTML = '<p class = "no-games">Games were not found</p>';
        return;
    }
    container.innerHTML = games.map(createGameCard).join('');
}