export interface Game {
    id?: number;
    title: string;
    genre: string;
    rating: number;
    price: number;
    platforms: string[];
    cover: string;
    releaseYear: number;
    inStock: boolean;
}