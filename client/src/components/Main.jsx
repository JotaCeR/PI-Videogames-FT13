import React, {useEffect} from 'react';
// import '../styles/Main.css';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames } from '../actions/search';
// import Videogames from './Videogames';
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
            {videogames.map(vg => <Videogame name={vg.name} img={vg.img} genre={vg.genres} id={vg.id} />)}
        </div>
    )
}

export default Main;