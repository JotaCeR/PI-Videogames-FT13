// import React, {useEffect} from 'react';
// import '../styles/Videogames.css';
import {useSelector} from 'react-redux';
import Videogame from './Videogame';

export default function Videogames () {
    
    let videogames = useSelector(state => state.search.videogames);

    return(
        <div className="Videogames">
            {videogames.map(vg => <Videogame name={vg.name} img={vg.img} genre={vg.genres} id={vg.id} />)}
        </div>
    )

}