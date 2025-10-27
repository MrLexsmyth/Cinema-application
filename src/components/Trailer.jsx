import { useEffect, useState, useCallback } from "react";

import axios from "axios";
import Movie from "./Movie";
import Youtube from "react-youtube";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

const API_KEY = "a3faefa65a1c2d33ebd97aac25290435";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w1280";

const Trailer = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({ title: "Loading Movies" });
  const [trailer, setTrailer] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [playing, setPlaying] = useState(false);

 const fetchMovies = useCallback(async (event) => {
  if (event) event.preventDefault();

  try {
    const endpoint = searchKey ? `${BASE_URL}/search/movie` : `${BASE_URL}/discover/movie`;
    const { data } = await axios.get(endpoint, {
      params: { api_key: API_KEY, query: searchKey },
    });

    setMovies(data.results);
    const firstMovie = data.results[0];
    if (firstMovie) {
      setSelectedMovie(firstMovie);
      await fetchMovieDetails(firstMovie.id);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}, [searchKey]);

useEffect(() => {
  fetchMovies();
}, [fetchMovies]);



  const fetchMovieDetails = async (id) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/movie/${id}`, {
        params: { api_key: API_KEY, append_to_response: "videos" },
      });

      if (data.videos?.results?.length) {
        const foundTrailer =
          data.videos.results.find((vid) => vid.name === "Official Trailer") ||
          data.videos.results[0];
        setTrailer(foundTrailer);
      }

      setSelectedMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  // When a user clicks on another movie
  const handleSelectMovie = (movie) => {
    setPlaying(false);
    setSelectedMovie(movie);
    fetchMovieDetails(movie.id);
    window.scrollTo(0, 0);
  };

  // 
  const renderMovies = () =>
    movies.map((movie) => (
      <Movie key={movie.id} movie={movie} selectMovie={handleSelectMovie} />
    ));

  return (
    <div className="App">
     

      {movies.length ? (
        <>
          {selectedMovie && (
            <div
              className="poster"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
                  url(${IMAGE_BASE}${selectedMovie.backdrop_path})`,
              }}
            >
              <form className="form search-on-poster" onSubmit={fetchMovies}>
    <input
      className="search"
      type="text"
      placeholder="Search Movies"
      value={searchKey}
      onChange={(e) => setSearchKey(e.target.value)}
    />
    <button className="submit-search" type="submit">
      <i className="fa fa-search"></i>
    </button>
  </form>
              {playing ? (
                <>
                  <Youtube
                    videoId={trailer?.key}
                    className="youtube amru"
                    containerClassName="youtube-container amru"
                    opts={{
                      width: "100%",
                      height: "100%",
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
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="close close-video">
                    ✕
                  </button>
                </>
              ) : (
                <div className="center-max-size">
                  <div className="poster-content">
                    <Text fontSize="50px">{selectedMovie.title}</Text>
                    <Text mb={3}>{selectedMovie.overview}</Text>

                    <Link to={`/bookings/${selectedMovie.id}`} className="muba">
                      BUY TICKET
                    </Link>

                    {trailer ? (
                      <button
                        className="play-btn play-video"
                        onClick={() => setPlaying(true)}
                        type="button"
                      />
                    ) : (
                      <Text>Sorry, trailer not found</Text>
                    )}
                    <Text>WATCH TRAILER</Text>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="container">{renderMovies()}</div>
        </>
      ) : (
        <Text>Sorry, no movies found</Text>
      )}
    </div>
  );
};

export default Trailer;