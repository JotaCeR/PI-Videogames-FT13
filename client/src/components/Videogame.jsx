import React from 'react';
import '../styles/Videogame.css';
import { Link } from 'react-router-dom';

export default function Videogame ({name, img, genre, id}) {

    return (
        <div className="Videogame">
            <Link id="link" to={`/videogame/${id}`}>
                <h1 id="title">{name}</h1>
            </Link>
            <div id="contain">
                <img src={img} alt="portada del videojuego" id="imag" />
                <p>Géneros: {genre}</p>
            </div>
        </div>
    )
}