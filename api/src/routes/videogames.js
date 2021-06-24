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
        constructor (name, image, rating, genres, id, source) {
            this.name = name;
            this.img = image;
            this.rating = rating;
            this.genres = genres;
            this.id = id;
            this.source = source;
        }
    }

    const gameNotFound = {
        name: "No games found"
    }

    // Acá obtenemos del query si es que hubo una búsqueda el parámetro y los valores del ordenamiento junto al filtrado.
    const search = req.query.name;
    const direction = req.query.dir;
    const clasification = req.query.clas;
    const origin = req.query.or;
    const genre = req.query.gen;

    console.log(search);
    console.log(direction);
    console.log(clasification);
    console.log(origin);
    console.log(genre);
    
    // Acá vamos a definir el url a fetchear dependiendo si hubo search por query o no.
    var url;
    var response;
    var answer = [];
    var games;
    var dbGames;
    var dbSearch;
    

    if (search !== undefined) {
        url = `https://api.rawg.io/api/games?search=${search}&key=${API_KEY}`;
        response = (await axios.get(url)).data;
        answer = response.results;

        dbSearch = await Videogame.findAll({where:
            {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            }, include: Genre});

        const holdGames = dbSearch.map((g) => {
            let gamesGen = [];
            g.genres.forEach(g => gamesGen.push(g.name));
            return new VideoGame (g.name, null, g.rating, gamesGen, g.id, g.original);
        });

        dbSearch = holdGames;
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

        const holdGames2 = dbGames.map((g) => {
            let gamesGen = [];
            g.genres.forEach(g => gamesGen.push(g.name));
            return new VideoGame (g.name, null, g.rating, gamesGen, g.id, g.original);
        });

        dbGames = holdGames2;
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

    // FILTRADO HELL

    if (origin !== "all") {
        switch (origin) {
            case "own":
                if (dbGames !== undefined) {
                    answer = dbGames;
                } else if (dbSearch !== undefined) {
                    answer = dbSearch;
                } else {
                    return res.status(404).json(gameNotFound);
                }
                break;
            case "oth":
                answer = mapedGames;
                break;
            default: return answer;
        }
    }

    if (genre !== "all") {
        switch (genre) {
            case "Action":
                answer = answer.filter(game => game.genres.find(genre => genre == "Action"));
                break;
            case "Adventure":
                answer = answer.filter(game => game.genres.find(genre => genre == "Adventure"));
                break;
            case "Arcade":
                answer = answer.filter(game => game.genres.find(genre => genre == "Arcade"));
                break;
            case "Board Games":
                answer = answer.filter(game => game.genres.find(genre => genre == "Board Games"));
                break;
            case "Card":
                answer = answer.filter(game => game.genres.find(genre => genre == "Card"));
                break;
            case "Casual":
                answer = answer.filter(game => game.genres.find(genre => genre == "Casual"));
                break;
            case "Educational":
                answer = answer.filter(game => game.genres.find(genre => genre == "Educational"));
                break;
            case "Family":
                answer = answer.filter(game => game.genres.find(genre => genre == "Family"));
                break;
            case "Fighting":
                answer = answer.filter(game => game.genres.find(genre => genre == "Fighting"));
                break;
            case "Indie":
                answer = answer.filter(game => game.genres.find(genre => genre == "Indie"));
                break;
            case "Massively Multiplayer":
                answer = answer.filter(game => game.genres.find(genre => genre == "Massively Multiplayer"));
                break;
            case "Platformer":
                answer = answer.filter(game => game.genres.find(genre => genre == "Plaformer"));
                break;
            case "Puzzle":
                answer = answer.filter(game => game.genres.find(genre => genre == "Puzzle"));
                break;
            case "Racing":
                answer = answer.filter(game => game.genres.find(genre => genre == "Racing"));
                break;
            case "RPG":
                answer = answer.filter(game => game.genres.find(genre => genre == "RPG"));
                break;
            case "Shooter":
                answer = answer.filter(game => game.genres.find(genre => genre == "Shooter"));
                break;
            case "Simulation":
                answer = answer.filter(game => game.genres.find(genre => genre == "Simulation"));
                break;
            case "Sports":
                answer = answer.filter(game => game.genres.find(genre => genre == "Sports"));
                break;
            case "Strategy":
                answer = answer.filter(game => game.genres.find(genre => genre == "Strategy"));
                break;
        }
    }

    if (clasification === "nam") {
        function alphabetic (gameOne, gameTwo) {
            let nameOne = gameOne.name.toUpperCase();
            let nameTwo = gameTwo.name.toUpperCase();
            if (nameOne < nameTwo) {
                return -1;
            }
            if (nameOne > nameTwo) {
                return 1;
            }
            return 0;
        };

        answer.sort(alphabetic);
        if (direction === "des") {
            answer.reverse();
        }
    } else if (clasification === "rat") {
        function rating (gameOne, gameTwo) {
            return gameOne.rating - gameTwo.rating;
        };

        answer.sort(rating);
        answer.reverse();

        if (direction === "des") {
            answer.reverse();
        }
    }


    let finalAnswer = [];
    let firstIndex = 0;
    let lastIndex = 15;

    let measure = Math.ceil(answer.length/15);

    for (let i = 0; i < measure; i++) {
        let newArr = answer.slice(firstIndex, lastIndex)
        
        finalAnswer = [...finalAnswer, newArr];

        firstIndex = firstIndex + 15;
        lastIndex = lastIndex + 15;
    }

    if (finalAnswer == undefined) {
        res.status(404).send("No se han encontrado juegos")
    } else {
        res.status(200).json(finalAnswer);
    };
});

module.exports = router;