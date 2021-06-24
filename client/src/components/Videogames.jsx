import React, {useEffect} from 'react';
import '../styles/Videogames.css';
import {useDispatch, useSelector} from 'react-redux';
import Videogame from './Videogame';
import { nextPage, prevPage, overPage } from '../actions/pagination';
import {Link} from 'react-router-dom';


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

    if (vgs.length === 0 && search.length === 0) {
        return (
            <div className="NoFound">
                <div className="warning">If the load takes too long, probably no game was found...</div>
                <div className="loadingio-spinner-spinner-277hgb3yfo1">
                    <div className="ldio-zcztvl17j9o">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <h1 id="ldg"><b>Loading...</b></h1>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    } else if (search.length > 0) {
        return (
            <div className="Videogames" key="04Search">
                <button id="left" name="prevPage" type="button" onClick={previousPagination}>Previous Page</button>
                <button id="right" name="nextPage" type="button" onClick={nextPagination}>Next Page</button>
                <Link to='/create'><button id="create" name="createGame" type="button">Create a Game</button></Link>
                {search[page].map(vg => <Videogame name={vg.name} img={vg.img} genre={vg.genres} key={vg.id} id={vg.id} source={vg.source} />)}
            </div>
        )
    } else {
        return(
            <div className="Videogames" key="04Games">
                <button id="left" name="prevPage" type="button" onClick={previousPagination}>Previous Page</button>
                <button id="right" name="nextPage" type="button" onClick={nextPagination}>Next Page</button>
                <Link to="/create"><button id="create" name="createGame" type="button">Create a Game</button></Link>
                {vgs[page].map(vg => <Videogame name={vg.name} img={vg.img} genre={vg.genres} key={vg.id} id={vg.id} source={vg.source} />)}
            </div>
        )
    }
}