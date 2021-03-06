require('dotenv').config();
const { API_KEY } = process.env;
const express = require('express');
const router = express.Router();
// const fetch = require('node-fetch');
const axios = require('axios');
const { Videogame, Genre } = require('../db');

router.get('/', async function (req, res) {
    const response = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data
    let genres = [];

    response.results.forEach(genre => genres.push(genre.name));

    let i = 0;

    while (i < genres.length) {
        await Genre.findOrCreate({where: {name: genres[i]}})
        i++;
    }

    // genres.forEach(genre => await Genre.findOrCreate({where: {name: genre}}));

    const genresPackage = await Genre.findAll();

    console.log(genresPackage.length);

    res.status(200).json(genresPackage);
})

module.exports = router;
