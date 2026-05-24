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