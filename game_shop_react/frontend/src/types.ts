export interface Game {
    id: number;
    title: string;
    genre: string;
    price: number;
    rating?: number;
    platform: string[];
    cover?: string;
    releaseYear: number;
    inStock: boolean;
}

export interface GameFromPayload {
    title: string;
    genre: string;
    price: number;
    releaseYear: number;
    platform: string[];
    cover?: string;
    inStock?: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        totalPages: number;
        page: number;
        limit: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
}