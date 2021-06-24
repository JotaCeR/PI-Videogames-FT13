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
    var dbGame;

    console.log(game)

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

    const gen = [];
    const plats = [];

    response = (await axios.get(url)).data;

    response.genres.forEach(genre => gen.push(genre.name))

    response.platforms.forEach(platform => plats.push(platform.platform.name));

    const gameFromApi = new DetailedGame(response.name, response.background_image, response.rating, gen, response.description, response.released, plats, response.id);
    
    // if (gameFromApi.name == undefined) {
    //     dbGame = await Videogame.findOne({where: {
    //         id: game
    //     }, include: Genre});
        
    //     let dbGenres = response.genre;
        
    //     dbGenres.forEach(genre => gen.push(genre.name))
        
    //     let gameFromDB = new DetailedGame(response.name, null, response.rating, gen, response.description, response.releaseDate, response.platforms, response.id);
        
    //     response = gameFromDB
    // } else {
    //     response = gameFromApi;
    // }
   

    res.status(200).json(gameFromApi);
})

router.post('/', async function(req, res) {
    console.log(req.body);

    const {gameName, gameDescription, genres, releaseDate, rating, platforms} = req.body;

    const gameCreated = await Videogame.create({
        name: gameName,
        description: gameDescription,
        releaseDate,
        rating,
        platforms
    })

    // genres.forEach(async function (genre) {
    //     let gen = await Genre.findOne({where:{name: genre}});

    //     gameCreated.addGenre(gen);
    // });

    async function auxiliar (game, genre) {
        await game.addGenre(await Genre.findOne({where: {name: genre}}));
    }
    
    for (let i = 0; i < genres.length; i++) {
        auxiliar(gameCreated, genres[i]);
    }
    

    const loggeo = await Videogame.findOne({where: {name: gameCreated.name}, include: Genre})

    console.log(loggeo);

    console.log(`Nombre: ${gameCreated.name}`);

    res.status(200).send("¡Juego agregado a la DB!");
})

module.exports = router;