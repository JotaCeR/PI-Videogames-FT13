import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
    return (
        <div className="Home">
            <Link to='/videogames'>
                <button type="button" className="btn">Este es el botón</button>
            </Link>
        </div>
    )
}