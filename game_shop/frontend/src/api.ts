import type {Game, GameFromPayload, PaginatedResponse} from './types';

const API_URL = import.meta.env.VITE_API_URL;


export async function fetchGames(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Game>> {
    try{
        const response = await fetch(`${API_URL}/games?page=${page}&limit=${limit}`);
        if (!response.ok) {
            throw new Error(`Error fetching games: ${response.statusText}`);
        }
        return response.json();
    }    catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export async function fetchGameById(id: number): Promise<Game> {
    try{
        const response = await fetch(`${API_URL}/games/${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching game: ${response.statusText}`);
        }
        return response.json();
    }    catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export async function createGame(gameData: GameFromPayload): Promise<Game> {
    try{
        const response = await fetch(`${API_URL}/games/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData)
        });
        if (!response.ok) {
            throw new Error(`Error creating game: ${response.statusText}`);
        }
        return response.json();
    }    catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}


export async function updateGame(id: number, gameData: GameFromPayload): Promise<Game> {
    try{
        const response = await fetch(`${API_URL}/games/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData)
        });
        if (!response.ok) {
            throw new Error(`Error updating game: ${response.statusText}`);
        }
        return response.json();
    }    catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export async function deleteGame(id: number): Promise<void> {
    try{
        const response = await fetch(`${API_URL}/games/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Error deleting game: ${response.statusText}`);
        }
    }    catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export async function searchGames(query: string): Promise<Game[]> {
    try{
        const response = await fetch(`${API_URL}/games/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error(`Error searching games: ${response.statusText}`);
        }
        return response.json();
    }    catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

