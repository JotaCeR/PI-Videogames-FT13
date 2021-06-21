require('dotenv').config();
const { API_KEY } = process.env;
const express = require('express');
const router = express.Router();
const { Videogame, Genre } = require('../db');
const { Op } = require('sequelize');
const axios = require('axios');

router.get('/', async function(req, res) {
    
    // Declaramos las clases para construir las respuestas de cada juego que fetcheemos.
    class VideoGame {
        constructor (name, image, rating, genres, id) {
            this.name = name;
            this.img = image;
            this.rating = rating;
            this.genres = genres;
            this.id = id;
        }
    }

    // Acá obtenemos del query si es que hubo una búsqueda el parámetro y los valores del ordenamiento junto al filtrado.
    const search = req.query.name;
    const order = req.query.order;
    const filter = req.query.filter;

    console.log(search);
    
    // Acá vamos a definir el url a fetchear dependiendo si hubo search por query o no.
    var url;
    var response;
    var answer = [];
    var games;
    var dbGames;
    var dbSearch;

    if (search) {
        url = `https://api.rawg.io/api/games?search=${search}&key=${API_KEY}`;
        response = (await axios.get(url)).data;
        answer = response.results;
        dbSearch = await Videogame.findAll({where:
        {
            name: {
                [Op.iLike]: `%${search}%`
            }
        }})
    } else {
        url = `https://api.rawg.io/api/games?key=${API_KEY}`;
        
        try {
            for (let i = 0; i < 5; i++) {
                response = (await axios.get(url)).data;
                url = response.next;
                games = response.results;
                answer = [...answer, ...games];
            }
        } catch(e) { 
            console.log(e);
        }

        dbGames = await Videogame.findAll({include: Genre});
    }

    const mapedGames = answer.map((vg) => {
        let theGenres = [];
        vg.genres.forEach(g => theGenres.push(g.name));
        return new VideoGame (vg.name, vg.background_image, vg.rating, theGenres, vg.id);
    })

    if (search && dbSearch !== undefined) {
        answer = [...mapedGames, ...dbSearch]
    } else if (dbGames !== undefined) {
        answer = [...mapedGames, ...dbGames]
    } else {
        answer = mapedGames
    }

    let firstIndex = 0;
    let lastIndex = 15;
    let finalAnswer = [];

    for (let i = 0; i < 7; i++) {
        let newArr = answer.slice(firstIndex, lastIndex)
        
        finalAnswer = [...finalAnswer, newArr];

        firstIndex = firstIndex + 15;
        lastIndex = lastIndex + 15;
    }

    console.log(finalAnswer.length);
    console.log(finalAnswer.flat().length);


    res.status(200).json(finalAnswer);
});

module.exports = router;