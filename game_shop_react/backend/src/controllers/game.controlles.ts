import {Request, Response} from "express";
import pool from "../db/database";
import {Game} from "../types/types";

export class GameController {

    public getALLGames = async (req: Request, res: Response): Promise<void> => {
        try{
            const result = await pool.query<Game>('SELECT * FROM games ORDER BY id ASC');
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error fetching games:', error);
            res.status(500).json({ error: 'Internal server error' });  
        }
    };

    public createGame = async (req: Request, res: Response): Promise<void> => {
        try {
            const {title, genre, rating, price, platforms, cover, release_year, in_stock} = req.body;
            const newGame = await pool.query<Game>(
                `INSERT INTO games (title, genre, rating, price, platforms, cover, release_year, in_stock)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
                [title, genre, rating, price, platforms, cover, release_year, in_stock]
            );
            res.status(201).json(newGame.rows[0]);
        } catch (error) {
            console.error('Error creating game:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    public getGameById = async (req: Request, res: Response): Promise<void> => {
        try{
            const id = parseInt(req.params.id as string);
            const result = await pool.query<Game>('SELECT * FROM games WHERE id = $1', [id]);

            if(result.rows.length === 0){
                res.status(404).json({ error: 'Game not found' });
                return;
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error fetching game:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    public UpdateGame = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id as string);
            const {title, genre, rating, price, platforms, cover, release_year, in_stock} = req.body;

            const result = await pool.query<Game>(
                `UPDATE games
                 SET title = $1, genre = $2, rating = $3, price = $4, platforms = $5, cover = $6, release_year = $7, in_stock = $8
                 WHERE id = $9 RETURNING *`,
                [title, genre, rating, price, platforms, cover, release_year, in_stock, id]
            );

            if(result.rows.length === 0){
                res.status(404).json({ error: 'Game not found' });
                return;
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error updating game:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    public deleteGame = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id as string);
            const result = await pool.query<Game>('DELETE FROM games WHERE id = $1 RETURNING *', [id]);
            if(result.rows.length === 0){
                res.status(404).json({ error: 'Game not found' });
                return;
            }
            res.status(200).json({ message: 'Game deleted successfully' });
        } catch (error) {
            console.error('Error deleting game:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
};

export default new GameController;