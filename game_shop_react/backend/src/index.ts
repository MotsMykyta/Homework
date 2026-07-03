import express from "express";

import './db/database';

import gameRoutes from "./routes/game.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', gameRoutes);

app.get('/health', (req, res) => {
  res.send('The server and database are ready');
});

app.listen(PORT, () => {
  console.log(`Server successfully started at http://localhost:${PORT}`);
});