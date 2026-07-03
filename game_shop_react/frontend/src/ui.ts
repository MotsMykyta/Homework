import type {Game} from './types';
import './styles/toast.css';

export function createGameCard(game: Game): string {
    const coverUrl = game.cover || 'https://via.placeholder.com/150x200?text=No+Cover';

    return `<div class="game-card" data-id="${game.id}">
            <img src="${coverUrl}" alt="${game.title}" class="game-cover">
            <div class="game-info">
                <h3>${game.title}</h3>
                <div class="game-actions">
                    <button class="btn-detail">Подробнее</button>
                    <button class="btn-edit">Редактировать</button>
                    <button class="btn-delete">Удалить</button>
                </div>
            </div>
        </div>`;
}

export function renderGames(games: Game[]): void {
    const container = document.getElementById('games-container');
    if (!container) return;

    const addCardHtml = `
        <div class="game-card add-game-card" id="btn-open-add-modal">
            <div class="add-icon">+</div>
            <h3>Add game</h3>
        </div>`;
    if(games.length === 0) {
        container.innerHTML = addCardHtml + '<p class="no-games" style="text-align: center; width: 100%; grid-column: 1/-1;">Games were not found</p>';
        return;
    }

    container.innerHTML = addCardHtml + games.map(createGameCard).join('');
}


export function renderGameDetails(game: Game): void {
    const mainPage = document.getElementById('main-page');
    const detailsPage = document.getElementById('details-page');
    if (!mainPage || !detailsPage) return;

    const coverUrl = game.cover || 'https://via.placeholder.com/300x400?text=No+Cover';

    const stockStatus = game.inStock 
        ? '<span class="status in-stock">In stock</span>' 
        : '<span class="status out-of-stock">Out of stock</span>';

    detailsPage.innerHTML = `
        <button id="btn-back-to-list" class="btn-secondary back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to store
        </button>
        
        <div class="game-details-content">
            <div class="details-left">
                <img src="${coverUrl}" alt="${game.title}" class="details-cover">
            </div>
            <div class="details-right">
                <h2 class="details-title">${game.title}</h2>
                
                <div class="details-badges">
                    <span class="badge genre-badge">${game.genre}</span>
                    <span class="badge year-badge">${game.releaseYear}</span>
                    <span class="badge rating-badge">⭐ ${game.rating ?? 'No rating'} / 10</span>
                </div>

                <div class="details-info-block">
                    <div class="info-row">
                        <span class="info-label">Platforms:</span>
                        <span class="info-value">${game.platform.join(', ')}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Status:</span>
                        <span class="info-value">${stockStatus}</span>
                    </div>
                </div>

                <div class="details-price-block">
                    <span class="details-price">$${game.price}</span>
                    <button class="btn-success buy-btn">Buy Now</button>
                </div>
            </div>
        </div>   
    `;

    mainPage.style.display = 'none';
    detailsPage.style.display = 'block';

    const backButton = document.getElementById('btn-back-to-list');
    if(backButton) {
        backButton.addEventListener('click', () => {
            mainPage.style.display = 'block';
            detailsPage.style.display = 'none';
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
