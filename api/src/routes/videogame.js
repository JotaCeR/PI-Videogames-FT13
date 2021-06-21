require('dotenv').config();
const { API_KEY } = process.env;
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Videogame, Genre } = require('../db');

router.get('/:game', async function (req, res) {
    const { game } = req.params;
    var url = `https://api.rawg.io/api/games/${game}?key=${API_KEY}`;
    var response;

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

    response = (await axios.get(url)).data;

    const gen = [];
    const plats = [];

    response.genres.forEach(genre => gen.push(genre.name))

    response.platforms.forEach(platform => plats.push(platform.platform.name));  

    const gameById = new DetailedGame(response.name, response.background_image, response.rating, gen, response.description, response.released, plats, response.id);

    res.status(200).json(gameById);
})

router.get('/', async function(req, res) {
    // AQUÍ EL POST DE UN JUEGO CREADOk
})

module.exports = router;