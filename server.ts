import express from 'express';
import bodyParser from 'body-parser';
import actorRoutes from './route/actor';
import genreRoutes from './route/genre';
import filmRoutes from './route/film';
import logger, { Logger } from './helper/log';
import { apiKeyAuthentication } from './authentication/apiKeyAuthentication';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const HTTP_PORT = process.env.PORT || 3000;

app.use(apiKeyAuthentication);

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
});

// Route Ping
app.get('/', (_req, res) => {
    logger("MARRON CLAIR", Logger.DELETE);
    logger("VERT CLAIR", Logger.CREATE);
    logger("BLEU FONCE", Logger.POST);
    logger("VIOLET", Logger.GET_ALL);
    logger("ROSE", Logger.GET);
    logger("BLEU CLAIR", Logger.PUT);
    logger("JAUNE", Logger.WARNING);
    logger("ROUGE", Logger.ERROR);
    res.json({ message: 'Ping' });
});

// Routes "Actor"
app.use('/api/actor', actorRoutes);

// Routes "Genre"
app.use('/api/genre', genreRoutes);

// Routes "Film"
app.use('/api/film', filmRoutes);

// Fallback route
app.use((_req, res) => {
    res.status(200).json({message: "no endpoints detected."});
});
