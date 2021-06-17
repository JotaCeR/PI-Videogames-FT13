import React from 'react';
// import '../styles/Videogame.css';
import { Link } from 'react-router-dom';

export default function Videogame ({name, img, genre, id}) {
    return (
        <div className="Videogame">
            <Link to={`/videogame/${id}`}>
                <h1>{name}</h1>
            </Link>
            <div>
                <img src={img} alt="portada del videojuego" />
                <p>Géneros: {genre}</p>
            </div>
        </div>
    )
}