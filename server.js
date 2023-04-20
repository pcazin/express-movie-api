/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');


const todoRoutes = require('./routes/todo');
const actorRoutes = require('./routes/actor');
const genreRoutes = require('./routes/genre');
const filmRoutes = require('./routes/film');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const HTTP_PORT = 8000;

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
});

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

// Routes "Todo"
app.use('/api/todo', todoRoutes);

// Routes "Todo"
app.use('/api/actor', actorRoutes);

// Routes "Todo"
app.use('/api/genre', genreRoutes);

// Routes "Todo"
app.use('/api/film', filmRoutes);

// Fallback route
app.use((req, res) => {
    res.status(404);
});
