require('dotenv').config();
const { API_KEY } = process.env;
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { Videogame, Genre } = require('../db');

router.get('/:gameId', async function (req, res) {
    const { gameId } = req.params;

    class DetailedGame {
        constructor(name, image, rating, genres, description, releaseDate, platforms, id) {
            this.name = name;
            this.image = image;
            this.rating = rating;
            this.genres = genres;
            this.description = description;
            this.releaseDate = releaseDate;
            this.platforms = platforms;
            this.id = id;
        }
    };

    const response = await fetch(`https://api.rawg.io/api/games/${gameId}`).then(game => game.json()).catch(e => console.log(e));

    const gen = [];
    const plats = [];

    response.genres.forEach(genre => gen.push(genre.name))

    response.platforms.forEach(platform => plats.push(platform.platform.name));  

    const game = new DetailedGame(response.name, response.background_image, response.rating, gen, response.description, response.released, plats, response.id);

    res.status(200).json(game).catch(e => console.log(e));
})

router.get('/', async function(req, res) {
    // AQUÍ EL POST DE UN JUEGO CREADOk
})

module.exports = router;