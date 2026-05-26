import { fetchGameById, updateGame, deleteGame} from './api';
import { renderGameDetails, showNotification } from './ui';
import './styles/modal.css'

async function handleDetailClick(gameId: number) {
    try {
        const game = await fetchGameById(gameId);
        renderGameDetails(game);
    } catch (error) {
        console.error('Error fetching game details:', error);
        showNotification('Failed to fetch game details. Please try again later.', 'error');
    }
}

async function handleEditClick(gameId: number, gameCard: HTMLElement) {
    const currentCardPrice = gameCard.querySelector('.game-price');
    const modal = document.getElementById('edit-modal') as HTMLDivElement;
    const inputPrice = document.getElementById('edit-price-input') as HTMLInputElement;
    const saveButton = document.getElementById('btn-save-edit') as HTMLButtonElement;
    const cancelButton = document.getElementById('btn-cancel-edit') as HTMLButtonElement;
    
    if (!modal || !inputPrice || !saveButton || !cancelButton) return;

    modal.style.display = 'flex';
    inputPrice.value = '';
    inputPrice.focus();

    const closeModal = () => {
        modal.style.display = 'none';
        saveButton.onclick = null;
        cancelButton.onclick = null;
    };

    cancelButton.onclick = closeModal;

    saveButton.onclick = async () => {
        const newPrice = inputPrice.value;
        const priceValue = Number(newPrice);

        if (newPrice && !isNaN(priceValue) && priceValue >= 0) {
            try {
                const currentGame = await fetchGameById(gameId);
                const updatedData = {
                    title: currentGame.title,
                    genre: currentGame.genre,
                    price: priceValue,
                    releaseYear: currentGame.releaseYear,
                    platform: currentGame.platform,
                    cover: currentGame.cover,
                    inStock: currentGame.inStock
                };

                const updatedGame = await updateGame(gameId, updatedData);
                
                if (currentCardPrice) {
                    currentCardPrice.textContent = `Price: $${updatedGame.price}`;
                }
                
                showNotification('Game updated successfully!', 'success');
                closeModal();
            } catch (error) {
                console.error('Error updating game:', error);
                showNotification('Failed to update game. Please try again later.', 'error');
            }
        } else {
            showNotification('Please, enter a valid price (0 or greater).', 'error');
        }
    };
}

async function handleDeleteClick(gameId: number, gameCard: HTMLElement) {
    if (confirm('Are you sure you want to delete this game?')) {
        try {
            await deleteGame(gameId);
            gameCard.remove();
            showNotification('Game deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting game:', error);
            showNotification('Failed to delete game. Please try again later.', 'error');
        }
    }
}


export function setupGameActions(container: HTMLElement | null): void {
    if (!container) return;

    container.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const gameCard = target.closest('.game-card') as HTMLElement;
        
        if (!gameCard) return;

        const gameId = Number(gameCard.dataset.id);

        if (target.classList.contains('btn-detail')) {
            handleDetailClick(gameId);
        }

        if (target.classList.contains('btn-edit')) {
            handleEditClick(gameId, gameCard);
        }

        if (target.classList.contains('btn-delete')) {
            handleDeleteClick(gameId, gameCard);
        }
    });
}