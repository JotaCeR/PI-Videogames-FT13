import React, { useEffect } from 'react';
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

    if (detailedGame.length === 0) {
        return (
            <div className="DetailedGame">
                <NavBar />
                <div id="detailedGame">No game has been found.</div>
            </div>
        )
    } else {
        return (
            <div className="DetailedGame">
                <NavBar />
                <div id="detailedGame">{detailedGame.name}</div>
            </div>
        )
    } 
}