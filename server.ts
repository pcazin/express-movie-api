import express from 'express';
import bodyParser from 'body-parser';
import actorRoutes from './route/actor';
import genreRoutes from './route/genre';
import filmRoutes from './route/film';
import dbRoutes from './route/db';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const HTTP_PORT = process.env.PORT || 8000;

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
});

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

// Routes "init db"
app.use('/api/initDb', dbRoutes)

// Routes "Actor"
app.use('/api/actor', actorRoutes);

// Routes "Genre"
app.use('/api/genre', genreRoutes);

// Routes "Film"
app.use('/api/film', filmRoutes);

// Fallback route
app.use((_req, res) => {
    res.status(404);
});
