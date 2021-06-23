import React from 'react';
import '../styles/Videogame.css';
import { Link } from 'react-router-dom';

export default function Videogame ({name, img, genre, id, key}) {

    return (
        <div className="Videogame" key={key} id={id}>
            <Link id="link" to={`/videogame/${id}`}>
                <h1 id="title">{name}</h1>
            </Link>
            <div id="contain">
                <img src={img} alt={`Portada del Videojuego: ${name}`} id="imag" />
                <p><b>Genres:</b> {genre.join(", ")}</p>
            </div>
        </div>
    )
}