import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
    return (
        <div className="Home">
            <div class="msg"><h1>Welcome navigator!</h1>
            <span>This app was developed as part of a bootcamp proyect for my graduation. It contains relevant information about videogames and was made with love and dedication so I hope you enjoy it as much as I do. So go on and try it, just press 'start' for begin!</span></div>
            <div class="joystick">
                <Link to='/videogames'>
                    <button type="button" className="btn"></button>
                </Link>
            </div>
        </div>
    )
}