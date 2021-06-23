import React, { useEffect } from 'react';
import '../styles/DetailedGame.css';
import { useSelector, useDispatch } from 'react-redux';
import { getDetailedGame } from '../actions/search';
import NavBar from './NavBar';


export default function DetailedGame ({id}) {
    let dispatch = useDispatch();

    let gameId = id;
    console.log(gameId)

    let detailedGame = useSelector(state => state.search.gameDetail);

    useEffect(() => {
        dispatch(getDetailedGame(gameId));
    }, []);

    // useEffect(() => {}, [detailedGame]);

    if (detailedGame.length === 0) {
        return (
            <div className="DetailedGame" key="05Empty" id={id}>
                <NavBar />
                <div id="detailedGame">No game has been found.</div>
            </div>
        )
    } else {
        return (
            <div className="DetailedGame" key="05Details" id={id}>
                <NavBar />
                <div id="detailedGame">{detailedGame.name}</div>
            </div>
        )
    } 
}