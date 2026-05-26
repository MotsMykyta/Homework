import type {Game} from './types';
import './styles/toast.css';

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


export function renderGameDetails(game: Game): void {
    const mainPage = document.getElementById('main-page');
    const detailsPage = document.getElementById('details-page');
    if (!mainPage || !detailsPage) return;

    const coverUrl = game.cover || 'https://via.placeholder.com/150x200?text=No+Cover';

    detailsPage.innerHTML = `
    <div class="details-container">
            <button id="btn-back-to-list" class="btn-secondary">← Back to List</button>
            
            <div class="game-details-content">
                <div class="details-left">
                    <img src="${coverUrl}" alt="${game.title}" class="details-cover">
                </div>
                <div class="details-right">
                    <h2>${game.title}</h2>
                    <p class="details-genre"><b>Жанр:</b> ${game.genre}</p>
                    <p class="details-year"><b>Год выпуска:</b> ${game.releaseYear}</p>
                    <p class="details-platforms"><b>Платформы:</b> ${game.platform.join(', ')}</p>
                    <p class="details-rating"><b>Рейтинг:</b> ${game.rating ?? 'Without Rating'}/10</p>
                    <p class="details-stock"><b>Статус:</b> ${game.inStock ? 'In Stock' : 'Out of Stock'}</p>
                    <p class="details-price"><b>Цена:</b> $${game.price}</p>
                </div>
            </div>
        </div>
    `;

    mainPage.style.display = 'none';
    detailsPage.style.display = 'block';

    const backButton = document.getElementById('btn-back-to-list');
    if (backButton) {
        backButton.addEventListener('click', () => {
            detailsPage.style.display = 'none';
            mainPage.style.display = 'block';
        });
    }


}

export function showNotification(message: string, type: 'success' | 'error' = 'success'): void {
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className =`toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 300);
}
