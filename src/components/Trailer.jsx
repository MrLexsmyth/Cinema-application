import {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Movie from "./Movie";
import Youtube from 'react-youtube';
import { Link } from "react-router-dom"
import {
    Box,
    Flex,
    Text,
   
  } from '@chakra-ui/react';

function Trailer() {
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const SEARCH_API = MOVIE_API + "search/movie"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const API_KEY = "a3faefa65a1c2d33ebd97aac25290435"
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"

    const [playing, setPlaying] = useState(false)
    const [trailer, setTrailer] = useState(null)
    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [movie, setMovie] = useState({title: "Loading Movies"})

    useEffect(() => {
        fetchMovies()
    }, [])

    const fetchMovies = async (event) => {
        if (event) {
            event.preventDefault()
        }

        const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        })

        console.log(data.results[0])
        setMovies(data.results)
        setMovie(data.results[0])

        if (data.results.length) {
            await fetchMovie(data.results[0].id)
        }
    }

    const fetchMovie = async (id) => {
        const {data} = await axios.get(`${MOVIE_API}movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos"
            }
        })

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
            setTrailer(trailer ? trailer : data.videos.results[0])
        }

        setMovie(data)
    }


    const selectMovie = (movie) => {
        fetchMovie(movie.id)
        setPlaying(false)
        setMovie(movie)
        window.scrollTo(0, 0)
    }

    const renderMovies = () => (
        movies.map(movie => (
            <Movie
                selectMovie={selectMovie}
                key={movie.id}
                movie={movie}
            />
        ))
    )

    return (
        <div className="App">
            <header className="center-max-size header">
                
                <form className="form" onSubmit={fetchMovies}>
                    <input className="search" placeholder='Search Movies' type="text" id="search"
                           onInput={(event) => setSearchKey(event.target.value)}/>
                    <button className="submit-search" type="submit"><i className="fa fa-search"></i></button>
                </form>
            </header>
            {movies.length ?
                <div>
                    {movie ?
                        <div className="poster"
                             style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`}}>
                            {playing ?
                                <>
                                    <Youtube
                                        videoId={trailer.key}
                                        className={"youtube amru"}
                                        containerClassName={"youtube-container amru"}
                                        opts={
                                            {
                                                width: '100%',
                                                height: '100%',
                                                playerVars: {
                                                    autoplay: 1,
                                                    controls: 0,
                                                    cc_load_policy: 0,
                                                    fs: 0,
                                                    iv_load_policy: 0,
                                                    modestbranding: 0,
                                                    rel: 0,
                                                    showinfo: 0,
                                                },
                                            }
                                        }
                                    />
                                    
                                   <button onClick={() => setPlaying(false)} className={"close close-video"} >X</button>
                                </> :
                                <div className="center-max-size">
                                    <div className="poster-content">
                                      
                                        <Text fontSize='50px'>{movie.title}</Text>
                                        <Text>{movie.overview}</Text>
                                        

                                        
                                       <Link to={`/bookings/${movie.id}`} 
                                       
                                             className="muba">
                                                BUY TICKET
                                        </Link>
                                        {trailer ?
                                            <button className={"play-btn play-video"} onClick={() => setPlaying(true)}
                                                    type="button"></button>
                                            : 'Sorry, trailer not found'}
                                                    <Text >WATCH TRAILER</Text>

                                            
                                    </div>
                                </div>
                            }
                        </div>
                        : null}

                    <div className={" container"}>
                        {renderMovies()}
                    </div>
                    
                </div>
                : 'Sorry, no movies found'}
        </div>
    );
}

export default Trailer;