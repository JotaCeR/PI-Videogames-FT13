import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import '../styles/CreateGame.css';
import NavBar from './NavBar';

export default function CreateGame () {
    const [game, setGame] = useState({
        gameName: "",
        gameDescription: "",
        releaseDate: "",
        rating: 0,
        genres: [],
        platforms: []
    });

    function handleChange (e) {
        e.preventDefault();
        setGame({
            ...game,
            [e.target.name]: e.target.value
        });
    };



    
    return (
        <div className="CreateGame">
            <NavBar />
            <div className="titl">Create your Game</div>
            <div className="frm">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    alert("¡Juego añadido!");
                    setGame({
                        gameName: "",
                        gameDescription: "",
                        releaseDate: "",
                        rating: 0,
                        genres: [],
                        platforms: []
                    })
                }}>
                    <div>
                        <label>Game Name: </label>
                        <input name="gameName" value={game.gameName} type="text" onChange={handleChange} />
                    </div>
                    <div id="txt">
                        <label>Game Description: </label>
                        <textarea name="gameDescription" id="desc" value={game.gameDescription} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Release Date: </label>
                        <input name="releaseDate" value={game.releaseDate} type="date" onChange={handleChange} />
                    </div>
                    <div>
                        <label>Rating: </label>
                        <input name="rating" value={game.rating} type="number" onChange={handleChange} />
                    </div>
                    <div>
                        <label>Game Genres: </label>
                        <input name="genres" value={game.genres} type="text" onChange={handleChange} />
                    </div>
                    <div>
                        <label>Game Platforms: </label>
                        <input name="platforms" value={game.platforms} type="text" onChange={handleChange} />
                    </div>
                    <button className="create" type="submit">Add Game</button>
                </form>
            </div>
        </div>
    )
};