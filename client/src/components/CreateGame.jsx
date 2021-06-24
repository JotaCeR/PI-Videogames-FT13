import React, {useState} from 'react';
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
        platforms: []
    });

    const [errors, setErrors] = useState({
        name: "⚬ A name is required",
        description: "⚬ A description is required",
        platforms: "⚬ The playable platforms are required"
    });

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

    function handleCbx (e) {
        e.preventDefault();

        if (!game.genres.find(genre => genre === e.target.value)) {
            setGame(gam => ({
                ...gam,
                genres: [...game.genres, e.target.value]
            }))
        } else (setGame(game));
    }

    let flag = false;

    if (errors.name == null && errors.description == null && errors.platforms == null) {
        flag = true;
    }

    async function addGame (adding) {
        await axios.post('http://localhost:3001/videogame', adding);
        alert(`¡Se ha añadido el juego: ${adding.gameName}!`);
    }

    const warn = "Los valores del formulario que se convalidan con un 'checkbox' no son retrotraibles, por lo tanto si llega a equivocarse al seleccionarlos, puede resetear sus elecciones presionando el botón.";
    
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
                        <div className="cbxs">
                            <div>
                                <label for="Action">Action</label>
                                <input name="Action" value="Action" type="checkbox" id="Action" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="Adventure">Adventure</label>
                                <input name="Adventure" value="Adventure" type="checkbox" id="Adventure" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="Arcade">Arcade</label>
                                <input name="Arcade" value="Arcade" type="checkbox" id="Arcade" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="Board Games">Board Games</label>
                                <input name="Board Games" value="Board Games" type="checkbox" id="Board Games" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="Card">Card</label>
                                <input name="Card" value="Card" type="checkbox" id="Card" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="Casual">Casual</label>
                                <input name="Casual" value="Casual" type="checkbox" id="Casual" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="Educational">Educational</label>
                                <input name="Educational" value="Educational" type="checkbox" id="Educational" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="Family">Family</label>
                                <input name="Family" value="Family" type="checkbox" id="Family" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="Fighting">Fighting</label>
                                <input name="Fighting" value="Fighting" type="checkbox" id="Fighting" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="Indie">Indie</label>
                                <input name="Indie" value="Indie" type="checkbox" id="Indie" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="Massively Multiplayer">Massively Multiplayer</label>
                                <input name="Massively Multiplayer" value="Massively Multiplayer" type="checkbox" id="Massively Multiplayer" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="Platformer">Platformer</label>
                                <input name="Platformer" value="Platformer" type="checkbox" id="Platformer" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="Puzzle">Puzzle</label>
                                <input name="Puzzle" value="Puzzle" type="checkbox" id="Puzzle" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="Racing">Racing</label>
                                <input name="Racing" value="Racing" type="checkbox" id="Racing" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="RPG">RPG</label>
                                <input name="RPG" value="RPG" type="checkbox" id="RPG" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="Shooter">Shooter</label>
                                <input name="Shooter" value="Shooter" type="checkbox" id="Shooter" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="Simulation">Simulation</label>
                                <input name="Simulation" value="Simulation" type="checkbox" id="Simulation" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="Sports">Sports</label>
                                <input name="Sports" value="Sports" type="checkbox" id="Sports" onChange={(e) => handleCbx(e)}/>
                            </div>
                            <div>
                                <label for="Strategy">Strategy</label>
                                <input name="Strategy" value="Strategy" type="checkbox" id="Strategy" onChange={(e) => handleCbx(e)}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label>Game Platforms: </label>
                        <input name="platforms" value={game.platforms} type="text" onChange={(e) => handleChange(e)} />
                    </div>
                    {!flag ? true : <button id="frmbt" className="create" type="submit">Add Game</button>}
                </form>
                {/* <button id="reset" className="create" onClick={setGame({
                    gameName: "",
                    gameDescription: "",
                    releaseDate: "",
                    rating: 0,
                    genres: [],
                    platforms: []
                    })}>Reset</button> */}
            </div>
        </div>
    )
};