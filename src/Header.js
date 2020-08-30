import React, {useState, useRef} from 'react';
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import "./Header.css";
import axios from './axios';
import requests, {imageBase, fetchMovie, fetchTV} from './api';

function Header({setSearchResult}) {
	const [input, setInput] = useState('');
	const inputEl = useRef(null);
	const searchEl = useRef(null);

	const handleSearch = (e) => {
		e.preventDefault();
		setInput('');
		searchEl.current.classList.remove('open');
	}

	return(
		<div className="app__header">
			<ul className="app__nav">
				<li className="app__search" ref={searchEl} onClick={() => {searchEl.current.classList.add('open'); inputEl.current.focus();}}>
					<SearchRoundedIcon style={{ fontSize: 20 }} className="app__searchIcon" />
					<form>
						<input ref={inputEl} type="search" value={input} onBlur={() => {if(!input) searchEl.current.classList.remove('open')}} onChange={(e) => setInput(e.target.value)} placeholder="Search..." />
						<button onClick={(e) => handleSearch(e)} type="submit"></button>
					</form>
				</li>
				<li><a href="#">Home</a></li>
				<li><a href="#">Movies</a></li>
				<li><a href="#">Series</a></li>
				<li><a href="#">Featured</a></li>
			</ul>
			<h1 className="app__title">TMDB</h1>
		</div>
	)
}

export default Header;