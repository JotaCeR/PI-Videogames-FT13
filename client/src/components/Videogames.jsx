import React, {useEffect, useState} from 'react';
import '../styles/Videogames.css';
import {useDispatch, useSelector} from 'react-redux';
import Videogame from './Videogame';
import { nextPage, prevPage, overPage } from '../actions/pagination';


export default function Videogames () {
    let dispatch = useDispatch();

    let vgs = useSelector(state => state.search.videogames);
    let search = useSelector(state => state.search.videogame);
    let page = useSelector(state => state.pagination.page);

    useEffect(() => {}, [vgs]);
    useEffect(() => {}, [page]);

    

    function nextPagination (e) {
        e.preventDefault();

        if (vgs[page] === vgs[vgs.length - 1]) {
            dispatch(overPage(vgs.length - 1));
        } else {
            dispatch(nextPage());
        }
    };

    function previousPagination (e) {
        e.preventDefault();
        dispatch(prevPage());
    }

    if (vgs.length === 0) {
        return (
            <div className="Videogames">
                "Cargando"
            </div>
        )
    } else {
        return(
            <div className="Videogames">
                <button id="left" name="prevPage" type="button" onClick={previousPagination}>Previous Page</button>
                <button id="right" name="nextPage" type="button" onClick={nextPagination}>Next Page</button>
                {vgs[page].map(vg => <Videogame name={vg.name} img={vg.img} genre={vg.genres} id={vg.id} />)}
            </div>
        )
    }
}