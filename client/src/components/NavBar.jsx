import React from 'react';
import '../styles/NavBar.css';
import SearchBar from './SearchBar';


const NavBar = () => {
    return (
        <div className="NavBar">
            <SearchBar />
            <div id="tit">Game Core</div>
            <div class="filters">
                <select>
                    <option>Ascendente</option>
                    <option>Descendente</option>
                </select>
                <select>
                    <option>Nombre</option>
                    <option>Rating</option>
                </select>
                <select>
                    <option>Todos</option>
                    <option>Propios</option>
                    <option>Externos</option>
                </select>
                <select>
                    <option>Géneros</option>
                </select>
            </div>
        </div>
    )
}

export default NavBar;