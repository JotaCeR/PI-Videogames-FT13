import React from 'react';
// import '../styles/NavBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogame } from '../actions/search';


const NavBar = () => {
    let dispatch = useDispatch();

    let searchedGames = useSelector(state => state.search.videogame);

    function searchGames (e) {
        e.preventDefatul();
        const {target} = e;
        const gamesToSearch = target.search.value;
        target.search.value = "";
        dispatch(getVideogame(gamesToSearch));
    }

    return (
        <div className="NavBar">
            <form>
                <input type="text" id="search" name="search" placeholder="Escribe tu búsqueda..." size="16" />
                <button id="searchbtn" type="submit" onSubmit={searchGames} >Buscar</button>
            </form>
            <h1 id="title">Game Core</h1>
        </div>
    )
}

export default NavBar;