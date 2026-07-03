import { fetchGameById, updateGame, deleteGame, createGame, fetchGames} from './api';
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

// async function handleCreateClick(){
//     const modal = document.getElementById('create-modal') as HTMLDivElement;
//     const saveButton = document.getElementById('btn-save-add') as HTMLButtonElement;
//     const cancelButton = document.getElementById('btn-cancel-add') as HTMLButtonElement;

//     const inputTitle = document.getElementById('add-title') as HTMLInputElement;
//     const inputGenre = document.getElementById('add-genre') as HTMLInputElement;
//     const inputPrice = document.getElementById('add-price') as HTMLInputElement;
//     const inputReleaseYear = document.getElementById('add-release-year') as HTMLInputElement;
//     const inputPlatform = document.getElementById('add-platform') as HTMLInputElement;
//     const inputCover = document.getElementById('add-cover') as HTMLInputElement;

//     if (!modal || !saveButton || !cancelButton) return;

//     inputTitle.value = '';
//     inputGenre.value = '';
//     inputPrice.value = '';
//     inputReleaseYear.value = '';
//     inputPlatform.value = '';
//     inputCover.value = '';


//     modal.style.display = 'flex';
//     const closeModal = () => {
//         modal.style.display = 'none';
//         saveButton.onclick = null;
//         cancelButton.onclick = null;
//     };
//     cancelButton.onclick = closeModal;

//     saveButton.onclick = async () => {
//         const title = inputTitle.value.trim();
//         const genre = inputGenre.value.trim();
//         const price = Number(inputPrice.value);
//         const releaseYear = Number(inputReleaseYear.value);
//         const platform = inputPlatform.value.trim();
//         const cover = inputCover.value.trim();

//         if (!title || !genre || isNaN(price) || price < 0 || isNaN(releaseYear) || releaseYear <= 1950 || !platform || !cover) {
//             showNotification('Please fill in all required fields (price >= 0).', 'error');
//             return;
//         }

//         const platforms = platform.split(',').map(p => p.trim()).filter(p => p !== '');
//         const newGameData = {
//             title,
//             genre,
//             price,
//             releaseYear,
//             platform: platforms,
//             cover: cover || undefined,
//             inStock: true
//         };

//         try {
//             await createGame(newGameData);
//             showNotification('Game created successfully!', 'success');
//             closeModal();
//             const response = await fetchGames(1, 100);
//         } catch (error) {
//             console.error('Error creating game:', error);
//             showNotification('Failed to create game. Please try again later.', 'error');
//             closeModal();
//         }
//     };
// }

// export function setupGameActions(container: HTMLElement | null): void {
//     if (!container) return;

//     container.addEventListener('click', (event) => {
//         const target = event.target as HTMLElement;

//         // 1. Проверяем, не кликнули ли мы по карточке "Добавить"
//         const addCard = target.closest('.add-game-card');
//         if (addCard) {
//             handleCreateClick();
//             return; // Останавливаем код, дальше идти не нужно
//         }

//         // 2. Если клик не по "Добавить", ищем обычную карточку игры
//         const gameCard = target.closest('.game-card') as HTMLElement;
//         if (!gameCard) return;

//         const gameId = Number(gameCard.dataset.id);

//         if (target.classList.contains('btn-detail')) {
//             handleDetailClick(gameId);
//         }

//         if (target.classList.contains('btn-edit')) {
//             handleEditClick(gameId, gameCard);
//         }

//         if (target.classList.contains('btn-delete')) {
//             handleDeleteClick(gameId, gameCard);
//         }
//     });
// }

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
    const modal = document.getElementById('delete-confirm-modal') as HTMLDivElement;
    const confirmButton = document.getElementById('btn-confirm-delete') as HTMLButtonElement;
    const cancelButton = document.getElementById('btn-cancel-delete') as HTMLButtonElement;

    if(!modal || !confirmButton || !cancelButton) return;

    modal.style.display = 'flex';

    const closeModal = () => {
        modal.style.display = 'none';
        confirmButton.onclick = null;
        cancelButton.onclick = null;
    }
    cancelButton.onclick = closeModal;

    confirmButton.onclick = async() => {
        try {
            await deleteGame(gameId);
            gameCard.remove();
            showNotification('Game deleted successfully!', 'success');
            closeModal();
        } catch (error) {
            console.error('Error deleting game:', error);
            showNotification('Failed to delete game. Please try again later.', 'error');
            closeModal();
        }
    };
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