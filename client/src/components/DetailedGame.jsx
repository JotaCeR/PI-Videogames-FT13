import React, {useEffect} from 'react';
import '../styles/DetailedGame.css';
import { useSelector, useDispatch } from 'react-redux';
import { getDetailedGame } from '../actions/search';
import NavBar from './NavBar';


export default function DetailedGame ({id}) {
    let dispatch = useDispatch();

    let detailedGame = useSelector(state => state.search.gameDetail);

    useEffect(() => {
        dispatch(getDetailedGame(id));
    }, []);

    useEffect(() => {}, [detailedGame]);

    if (!detailedGame) {
        return (
            <div className="DetailedGame">
                <NavBar />
                <div id="noGame">No game has been found.</div>
            </div>
        )
    } else {
        return (
            <div className="DetailedGame" id={detailedGame.id}>
                <NavBar />
                <div id="gameDetailed">
                    <h1 id="detit">{detailedGame.name}</h1>
                    <div id="container">
                        <img src={detailedGame.image} alt="Portada del videojuego" id="ima" />
                        <p><b>Genres:</b> {detailedGame.genres.join(", ")}</p>
                        <p><b>Rating:</b> {detailedGame.rating}</p>
                        <p><b>Description:</b> {detailedGame.description}</p>
                        <p><b>Release Date:</b> {detailedGame.releaseDate}</p>
                        <p><b>Platforms:</b> {detailedGame.platforms.join(", ")}</p>
                    </div>
                </div>
            </div>
        )
    } 
}