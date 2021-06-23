import React, {useState, useEffect} from 'react';
import '../styles/NavBar.css';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getVideogame,getVideogames } from '../actions/search';


const NavBar = () => {
    const [game, setGame] = useState('');
    let dispatch = useDispatch();

    const [filters, setFilters] = useState ({
        direction: "asc",
        clasification: "rat",
        origin: "all",
        genre: "all"
    });

    function handleChanges(e) {
        e.preventDefault();
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        dispatch(getVideogames(filters))
    }, []);

    useEffect(() => {}, [filters]);


    return (
        <div className="NavBar">
            <form onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(getVideogame(game, filters));
                    setGame("");}} >
                <input type='text' placeholder="Busca un juego..." value={game} onChange={e => setGame(e.target.value)} />
                <input type='submit' value='Buscar' />
            </form>
            <Link id="titlink" to="/videogames"><div id="tit">Game Core</div></Link>
            <div class="filters">
                <select value={filters.direction} name="direction" onChange={handleChanges} >
                    <option value="asc" >Ascendente</option>
                    <option value="des" >Descendente</option>
                </select>
                <select value={filters.clasification} name="clasification" onChange={handleChanges}>
                    <option value="nam">Nombre</option>
                    <option value="rat">Rating</option>
                </select>
                <select value={filters.origin} name="origin" onChange={handleChanges}>
                    <option value="all">Todos</option>
                    <option value="own">Propios</option>
                    <option value="oth">Externos</option>
                </select>
                <select value={filters.genre} name="genre" onChange={handleChanges}>
                    <option value="all">Todos</option>
                    <option value="gens">Géneros</option>
                </select>
                <input type="button" value="Ordenar" onClick={(e) => {
                    e.preventDefault();
                    dispatch(getVideogames(filters));
                }} />
            </div>
        </div>
    )
}

export default NavBar;