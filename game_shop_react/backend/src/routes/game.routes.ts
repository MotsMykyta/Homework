import {Router } from "express";
import GameController from "../controllers/game.controlles";

const router = Router();

router.get('/games', GameController.getALLGames);
router.post('/games', GameController.createGame);
router.get('/games/:id', GameController.getGameById);
router.put('/games/:id', GameController.UpdateGame);
router.delete('/games/:id', GameController.deleteGame);

export default router;