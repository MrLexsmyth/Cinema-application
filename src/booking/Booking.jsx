import React from "react";
import { useState, useEffect, createContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Seat from "../seat/Seat"
import "./booking.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  Center,
  Button,
  SimpleGrid,
  Image,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CountContext = createContext(0);

function Booking() {
  const MOVIE_API = "https://api.themoviedb.org/3/";

  // const SEARCH_API = MOVIE_API + "search/movie"
  // const DISCOVER_API = MOVIE_API + "discover/movie"
  const API_KEY = "3b3721af4d70c58a7f3b856193fd49d7";
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";
  const Image_path = "https://image.tmdb.org/t/p/w500/";

  const [count, setCount] = useState(0);
  const [count6, setCount6] = useState(2000);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const [count5, setCount5] = useState(0);
  

  const [movie, setMovie] = useState([]);
  const { id } = useParams();

  const [selectedDate, setselectedDate] = useState(null);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const { data } = await axios.get(`${MOVIE_API}movie/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });

    setMovie(data);
    console.log(data);
  };
  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };
  const incrementCount1 = () => {
    setCount1(count1 + 1);
  };

  const decrementCount1 = () => {
    setCount1(count1 - 1);
  };
  const incrementCount2 = () => {
    setCount2(count2 + 1);
  };

  const decrementCount2 = () => {
    setCount2(count2 - 1);
  };
  const incrementCount3 = () => {
    setCount3(count3 + 1);
  };

  const decrementCount3 = () => {
    setCount3(count3 - 1);
  };
  const incrementCount4 = () => {
    setCount4(count4 + 1);
  };

  const decrementCount4 = () => {
    setCount4(count4 - 1);
  };
  const incrementCount5 = () => {
    setCount5(count5 + 1);
  };

  const decrementCount5 = () => {
    setCount5(count5 - 1);
  };

  return (
    <CountContext.Provider value={1000 * count4 +
            100 * count5 +
            2000 * count3 +
            200 * count2 +
            2000 * count1 +
            2000 * count}>
            
     
      <div className="former">
        <div className="for">
          {" "}
          {movie.backdrop_path && (
            <img
              className="backpath"
              src={BACKDROP_PATH + movie.backdrop_path}
              alt={movie.title}
              height="250px"
            />
          )}
           { <div className="text">
            <h3 className={"bookingtitle"}>{movie.title}</h3>
            <h4> {count} Guests</h4>
          </div> } 
        </div>
        <div className="ticket">
        <Center>
            <Text> ₦2,000. / Ticket </Text>
        </Center>
        <Center>
            <Button disabled={count <= 0} onClick={decrementCount}>
              {" "}
              <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>{" "}
            </Button>
            {count}
            <Button disabled={count >= 50} onClick={incrementCount}>
              {" "}
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>{" "}
            </Button>
          </Center>
          <Center>
            <Text>₦{2 * count},000.00 </Text>
          </Center>
        </div>
      </div>

      <Center>
        <div className="moneyman">
          <DatePicker
            className="money"
            selected={selectedDate}
            onChange={(date) => setselectedDate(date)}
            minDate={new Date()}
            filterDate={(date) => date.getDay() != 0}
            isClearable
            placeholderText="Date"
            popperProps={{ strategy: "fixed" }}
          />
        </div>
        <div>
          <select
            placeholder="Place"
            onChange={(event) => setLocation(event.target.value)}
            className="place"
            value={location}
          >
            <option value="lagos">Lagos</option>
            <option value="ibadan">Ibadan</option>
            <option value="kano">Kano</option>
            <option value="port">Port Harcourt</option>
            <option value="abuja"> Abuja</option>
          </select>
        </div>
        <div>
          <select
            placeholder="Place"
            onChange={(event) => setTime(event.target.value)}
            value={time}
            className="place"
          >
            <option value="time">11:30</option>
            <option value="tim">12:20</option>
            <option value="ti">14:10</option>
            <option value="t">17:00</option>
          </select>
        </div>
      </Center>
      <Center>
        <h3 className="tfood" >
          <span> You want foods/Snacks too?</span>
         
        </h3>
      </Center>
      <div className="food">
        
          {" "}
          <div className="foods">
            <h3 className="foodss">Shawama</h3>
            <h4>Price : ₦2,000</h4>
            <button disabled={count1 <= 0} onClick={decrementCount1}>
              {" "}
              <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>{" "}
            </button>
            {count1}
            <button disabled={count1 >= 50} onClick={incrementCount1}>
              {" "}
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>{" "}
            </button>
            <h3>₦{2000 * count1}.00 </h3>
          </div>
        
        <div className="foods">
          <h3 className="foodss">Coke</h3>
          <h4>Price : ₦200</h4>
          <button disabled={count2 <= 0} onClick={decrementCount2}>
            {" "}
            <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>{" "}
          </button>
          {count2}
          <button disabled={count2 >= 50} onClick={incrementCount2}>
            {" "}
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>{" "}
          </button>
          <h3>₦{200 * count2}.00 </h3>
        </div>
        <div className="foods">
          <h3  className="foodss">Hot-Dogs</h3>
          <h4>Price : ₦2,000</h4>
          <button disabled={count3 <= 0} onClick={decrementCount3}>
            {" "}
            <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>{" "}
          </button>
          {count3}
          <button disabled={count3 >= 50} onClick={incrementCount3}>
            {" "}
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>{" "}
          </button>
          <h3>₦{2000 * count3}.00 </h3>
        </div>
        <div className="foods">
          <h3  className="foodss">Small-Chops</h3>
          <h4>Price : ₦1,000</h4>
          <button disabled={count4 <= 0} onClick={decrementCount4}>
            {" "}
            <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>{" "}
          </button>
          {count4}
          <button disabled={count4 >= 50} onClick={incrementCount4}>
            {" "}
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>{" "}
          </button>
          <h3>₦{1000 * count4}.00 </h3>
        </div>
        <div className="foods">
          <h3 className="foodss">Water</h3>
          <h4>Price : ₦100</h4>
          <button disabled={count5 <= 0} onClick={decrementCount5}>
            {" "}
            <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>{" "}
          </button>
          {count5}
          <button disabled={count5 >= 50} onClick={incrementCount5}>
            {" "}
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>{" "}
          </button>
          <h3>₦{100 * count5}.00 </h3>
        </div>
      </div>
      <Center>
        <Text fontSize="50px" as="b">
          Total : ₦
          {1000 * count4 +
            100 * count5 +
            2000 * count3 +
            200 * count2 +
            2000 * count1 +
            2000 * count} 
        </Text>
      </Center>
      <Link to={`/seat`} className="btn">
        Book Now
      </Link>
      <Footer />
      </CountContext.Provider>
    
  );
}

export default Booking;
