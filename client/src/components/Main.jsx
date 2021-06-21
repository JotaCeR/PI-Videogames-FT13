import React, {useEffect} from 'react';
// import '../styles/Main.css';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames } from '../actions/search';
import Videogames from './Videogames';
import Videogame from './Videogame';

const Main = () => {
    let dispatch = useDispatch();

    let videogames = useSelector(state => state.search.videogames); 
    let videogame = useSelector(state => state.search.videogame);

    useEffect(() => {
        dispatch(getVideogames());
    }, []);

    useEffect(() => {}, [videogames]);

    return (
        <div className="Main">
            <Videogames />
        </div>
    )
}

export default Main;