import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
    return (
        <div className="Home">
            <div class="joystick">
                <Link to='/videogames'>
                    <button type="button" className="btn"></button>
                </Link>
            </div>
        </div>
    )
}