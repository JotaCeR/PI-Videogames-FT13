import React from 'react';
// import '../styles/Main.css';
// import {useDispatch, useSelector} from 'react-redux';
// import { getVideogames } from '../actions/search';
import Videogames from './Videogames';
import NavBar from './NavBar';

const Main = () => {
    // let dispatch = useDispatch();

    // let videogames = useSelector(state => state.search.videogames); 

    // useEffect(() => {
    //     dispatch(getVideogames());
    // }, []);

    // useEffect(() => {}, [videogames]);

    return (
        <div className="Main" key="02Main">
            <NavBar />
            <Videogames />
        </div>
    )
}

export default Main;