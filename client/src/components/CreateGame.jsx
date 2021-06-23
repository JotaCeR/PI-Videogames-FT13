import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import '../styles/CreateGame.css';
import NavBar from './NavBar';
const axios = require('axios');

export default function CreateGame () {
    const [game, setGame] = useState({
        gameName: "",
        gameDescription: "",
        releaseDate: "",
        rating: 0,
        genres: [],
        platforms: ""
    });

    const [errors, setErrors] = useState({});

    let genres = useSelector(state => state);

    function validation(input) {
        let errors = {};
        
        if (!input.gameName) {
            errors.name = "⚬ A name is required";
        }

        if(!input.gameDescription) {
            errors.description = "⚬ A description is required";
        }

        if (!input.platforms) {
            errors.platforms = "⚬ The playable platforms are required";
        }

        return errors;
    }

    function handleChange (e) {
        e.preventDefault();

        setErrors(validation({
            ...game,
            [e.target.name]: e.target.value
        }));

        setGame(gam => ({
            ...gam,
            [e.target.name]: e.target.value
        }));
    };

    let flag = false;

    if (errors.name == null && errors.description == null && errors.platforms == null) {
        flag = true;
    }

    async function addGame (adding) {
        await axios.post('http://localhost:3001/videogame', adding);
        alert(`¡Se ha añadido el juego: ${adding.gameName}!`);
    }
    
    return (
        <div className="CreateGame" key="06PostGame">
            <NavBar />
            {!errors.name ? null : <div className="errs">{errors.name}</div>}
            {!errors.description ? null : <div className="errs" id="descr">{errors.description}</div>}
            {!errors.platforms ? null : <div className="errs" id="plt">{errors.platforms}</div>}
            <div className="titl">Create your Game</div>
            <div className="frm">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    addGame(game);
                }}>
                    <div>
                        <label>Game Name: </label>
                        <input name="gameName" value={game.gameName} type="text" onChange={(e) => handleChange(e)} />
                    </div>
                    <div id="txt">
                        <label>Game Description: </label>
                        <textarea name="gameDescription" id="desc" value={game.gameDescription} onChange={(e) => handleChange(e)} />
                    </div>
                    <div>
                        <label>Release Date: </label>
                        <input name="releaseDate" value={game.releaseDate} type="date" onChange={(e) => handleChange(e)} />
                    </div>
                    <div>
                        <label>Rating: </label>
                        <input name="rating" value={game.rating} type="number" onChange={(e) => handleChange(e)} min="0" max="10" />
                    </div>
                    <div>
                        <label>Game Genres: </label>
                        <input name="genres" value={game.genres} type="text" onChange={(e) => handleChange(e)} />
                    </div>
                    <div>
                        <label>Game Platforms: </label>
                        <input name="platforms" value={game.platforms} type="text" onChange={(e) => handleChange(e)} />
                    </div>
                    {!flag ? true : <button id="frmbt" className="create" type="submit">Add Game</button>}
                </form>
            </div>
        </div>
    )
};