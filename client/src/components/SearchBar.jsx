import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { getVideogame } from "../actions/search";
import '../styles/SearchBar.css';

export default function SearchBar() {
    const [search, setSearch] = useState('');
    
    let dispatch = useDispatch();

    function handleChange(e) {
        e.preventDefault();
        setSearch(e.target.value);
        console.log(search);
    }

    function searchGame(e) {
        e.preventDefault();
        console.log('search ', search); 
        dispatch(getVideogame(search));
        setSearch('');
    }

    return (
        <div className="SearchBar">
            <form onSubmit={this.searchGame}>
                <input value={search} onChange={handleChange} type="text" className="searchBar" name="bus" placeholder="Busca un juego..." />
                <input className="searchbtn" type="submit" >Buscar</input>
            </form>                
        </div>
    )
}