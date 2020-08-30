import React, { useState, useEffect } from "react";
import ModalVideo from "react-modal-video";
import "./modalVideo.css";
import FeaturedMovie from "./FeaturedMovie";
import List from "./List";
import BigList from "./BigList";
import "./App.css";
import axios from './axios';
import requests, {imageBase, fetchMovie} from './api';


function App() {
  const [truncLine, setTruncLine] = useState(2);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [videoId, setVideoId] = useState('');

	useEffect(() => {
		axios.get(requests.fetchTopRatedMovies).then((response) => {
			let tempMov = response.data.results;
			setTopRatedMovies(tempMov);
			let getFeatured = tempMov[Math.floor(Math.random() * tempMov.length)].id;
			axios.get(fetchMovie(getFeatured)).then((response) => {
				setFeaturedMovie(response.data);
				let videos = response.data.videos.results;
				let vidId = videos[videos.length - 1].key;
				setVideoId(vidId);
			}).catch((err) => console.log(err));
		})
	}, []);

  const readMore = (e) => {
	setTruncLine(0);
	e.preventDefault();
	e.target.style.display = 'none';
  }

  var overlayStyle = {
	backgroundImage: `url(${imageBase}${featuredMovie.backdrop_path || featuredMovie.poster_path})`,
	backgroundSize: 'cover',
	backgroundPosition: 'top right',
  }

  return (
    <div className="app">
		{videoId &&
		(<ModalVideo
			channel='youtube'
			isOpen={playing}
			videoId={videoId}
			onClose={() => setPlaying(false)}
		/>)}
		<Header />
		{featuredMovie && <FeaturedMovie overlayStyle={overlayStyle} featuredMovie={featuredMovie} setPlaying={setPlaying} />
		}
		<List />
		<BigList title="Trending Movies in Your Region" fetchId={requests.fetchTrendingMovies}/>
		<BigList title="Top Rated Series For You" fetchId={requests.fetchTrendingTV}/>
    </div>
  );
}

export default App;