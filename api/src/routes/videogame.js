require('dotenv').config();
const { API_KEY } = process.env;
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { search } = require('./videogames');

router.get('/:game', async function (req, res) {
    const { game } = req.params;
    const source = req.query.source;
    var url = `https://api.rawg.io/api/games/${game}?key=${API_KEY}`;
    var response;

    console.log(game)
    console.log(source)
    console.log(req.query)

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

    if (source === "true") {
        try {
            // let dbGame = async (search) => {
            //     return await Videogame.findOne({where: {id: search}, include: Genre})
            // }
            response = await Videogame.findAll({where: {id: game}, include: Genre});

            response[0].dataValues.genres.forEach(genre => gen.push(genre.name));

            plats.push(response[0].dataValues.platforms);

            const holdMyGame = new DetailedGame(response[0].dataValues.name, null, response[0].dataValues.rating, gen, response[0].dataValues.description, response[0].dataValues.releaseDate, plats, response[0].dataValues.id);

            response = holdMyGame;
            console.log(response)
        } catch (e) {
            console.error(e);
            res.status(404).send("Can't catch DB game")
        }
    } else {
        try {
            response = (await axios.get(url)).data;
    
            response.genres.forEach(genre => gen.push(genre.name))
    
            response.platforms.forEach(platform => plats.push(platform.platform.name));
    
            const gameFromApi = new DetailedGame(response.name, response.background_image, response.rating, gen, response.description, response.released, plats, response.id);
    
            response = gameFromApi
     
        } catch (e) {
            console.error(e);
            res.status(404).send("Something really bad happened!")
        }
    }
    console.log(gen)
    console.log(plats)

    res.status(200).json(response);
})

router.post('/', async function(req, res) {
    console.log(req.body);
    const {gameName, gameDescription, genres, releaseDate, rating, platforms} = req.body;
    let genresToAdd = async (genres) => {
        let rows = [];
        let gen = null;
        for(let i = 0; i<genres.length; i++){
            try {
                gen = await Genre.findOne({ where: { name: genres[i] } });
                rows.push(gen)
            } catch (err) {
                console.error(err)
            }
        }
        return rows;
    };
    try{
        const gameCreated = await Videogame.create({
            name: gameName,
            description: gameDescription,
            releaseDate,
            rating,
            platforms
        });
        console.log('gamecreated: ', gameCreated);
        const ans = await gameCreated.addGenre(await genresToAdd(genres));
        console.log('ans ', ans);
    }catch(e){
        console.log(e)
    }

    res.status(200).send("¡Juego agregado a la DB!");
});

module.exports = router;