require('dotenv').config();
const { API_KEY } = process.env;
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { Videogame, Genre } = require('../db');
const { Op } = require('sequelize');

router.get('/', async function(req, res) {
    
    // Declaramos la clase para construir las respuestas de cada juego que fetcheemos.
    class VideoGame {
        constructor (name, image, rating, genres, id) {
            this.name = name;
            this.img = image;
            this.rating = rating;
            this.genres = genres;
            this.id = id;
        }
    }

    // Acá obtenemos del query si es que hubo una búsqueda el parámetro.
    const search = req.query.name;
    
    // Acá vamos a fetchear dependiendo si hubo una search por query o no.
    var response;
    var answer = []; 

    if (search) {
        response = await fetch(`https://api.rawg.io/api/games?search=${search}&key=${API_KEY}`).then(games => games.json()).catch(e => console.log(e));

        //Acá transformamos los juegos de la API en objetos para enviar al front.
        answer = response.results.map(function(x) {
            new VideoGame(x.name, x.background_image, x.rating, x.genres, x.id)
        });

        // Acá consultamos a la DB por juegos con el mismo query del search.
        let dbSearch = await Videogame.findAll({where: {
            name: {
                [Op.iLike]: `%${search}%`
            }
        }});

        // Acá juntamos tanto juegos de la API como de la DB.
        answer = [...answer, dbSearch];

    } else {
        response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`).then(games => games.json()).catch(e => console.log(e));
        
        response = response.results;
        // Acá vamos a pushear los 100 primeros juegos, para no trabajar con todos los videojuegos de la API.
        let i = 0;
        
        while (answer.length < 100) {
            if (response[i]) {
                answer.push(response[i]);
            };
            i++;
        }

        // Acá transformarmos cada videjuego
        answer = answer.map(vg => new VideoGame(vg.name, vg.background_image, vg.rating, vg.genres, vg.id));

        // Acá consultamos la DB por juegos originales
        let dbGames = await Videogame.findAll({ include: Genre });

        // Acá juntamos en un mismo array tanto juegos de la API como de la DB
        answer = [...answer, ...dbGames];
    }
    
    // Acá lo ordenamos, por default, por orden alfabético sin discriminar por juegos de la API o DB.
    answer.sort();

    // Acá mandamos nuestra respuesta al front
    res.status(200).json(answer).catch(e => console.log(e));
});

module.exports = router;