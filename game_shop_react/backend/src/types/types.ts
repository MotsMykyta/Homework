export interface Game {
    id?: number;
    title: string;
    genre: string;
    rating: number;
    price: number | string;
    platforms: string[];
    cover: string;
    release_year: number;
    in_stock: boolean;
}