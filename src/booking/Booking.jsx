import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  Text,
  Center,
  Button,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../components/Footer/Footer";
import "./booking.css";

const CountContext = createContext(0);
const MOVIE_API = "https://api.themoviedb.org/3/";
const API_KEY = "3b3721af4d70c58a7f3b856193fd49d7";
const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");

  const [counts, setCounts] = useState({
    ticket: 0,
    shawarma: 0,
    coke: 0,
    hotdog: 0,
    chops: 0,
    water: 0,
  });

  const prices = {
    ticket: 2000,
    shawarma: 2000,
    coke: 200,
    hotdog: 2000,
    chops: 1000,
    water: 100,
  };

  const total = Object.entries(counts).reduce(
    (acc, [key, value]) => acc + prices[key] * value,
    0
  );

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(`${MOVIE_API}movie/${id}`, {
          params: { api_key: API_KEY },
        });
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };
    fetchMovie();
  }, [id]);

  const updateCount = (item, delta) => {
    setCounts((prev) => ({
      ...prev,
      [item]: Math.max(0, prev[item] + delta),
    }));
  };

  const handleBookNow = () => {
    navigate("/seat", { state: { total } });
  };

  return (
    <CountContext.Provider value={total}>
      <div className="booking-page">
        {/* === Movie Header === */}
        <div className="movie-header">
          {movie.backdrop_path && (
            <img
              className="backpath"
              src={BACKDROP_PATH + movie.backdrop_path}
              alt={movie.title}
            />
          )}
          <div className="overlay">
            <h3 className="bookingtitle">{movie.title}</h3>
            <Text>{counts.ticket} Guests</Text>
          </div>
        </div>

        {/* === Ticket Section === */}
        <TicketSection
          count={counts.ticket}
          price={prices.ticket}
          updateCount={(delta) => updateCount("ticket", delta)}
        />

        {/* === Date & Location Selection === */}
        <Center className="selectors">
          <DatePicker
            className="picker"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            placeholderText="Select Date"
          />
          <select
            className="select"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          >
            <option value="">Select Location</option>
            <option value="Lagos">Lagos</option>
            <option value="Ibadan">Ibadan</option>
            <option value="Kano">Kano</option>
            <option value="Port Harcourt">Port Harcourt</option>
            <option value="Abuja">Abuja</option>
          </select>
          <select
            className="select"
            onChange={(e) => setTime(e.target.value)}
            value={time}
          >
            <option value="">Select Time</option>
            <option value="11:30">11:30</option>
            <option value="12:20">12:20</option>
            <option value="14:10">14:10</option>
            <option value="17:00">17:00</option>
          </select>
        </Center>

        {/* === Food Section === */}
        <Center>
          <Text className="tfood">Want foods/snacks too?</Text>
        </Center>
        <SnackSection counts={counts} prices={prices} updateCount={updateCount} />

        {/* === Total and Booking Button === */}
        <Center>
          <Text fontSize="40px" as="b" mt={5}>
            Total: ₦{total.toLocaleString()}
          </Text>
        </Center>

        <Center>
          <Button className="btn" onClick={handleBookNow}>
            Book Now
          </Button>
        </Center>

        <Footer />
      </div>
    </CountContext.Provider>
  );
}

const TicketSection = ({ count, price, updateCount }) => (
  <div className="ticket-section">
    <Center>
      <Text>₦{price.toLocaleString()} / Ticket</Text>
    </Center>
    <Center>
      <Button disabled={count <= 0} onClick={() => updateCount(-1)}>
        <FontAwesomeIcon icon={faMinus} />
      </Button>
      <Text mx={2}>{count}</Text>
      <Button disabled={count >= 50} onClick={() => updateCount(1)}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </Center>
    <Center>
      <Text>₦{(count * price).toLocaleString()}.00</Text>
    </Center>
  </div>
);

const SnackSection = ({ counts, prices, updateCount }) => {
  const snacks = [
    { key: "shawarma", label: "Shawarma" },
    { key: "coke", label: "Coke" },
    { key: "hotdog", label: "Hot-Dog" },
    { key: "chops", label: "Small-Chops" },
    { key: "water", label: "Water" },
  ];
  return (
    <div className="food-section">
      {snacks.map(({ key, label }) => (
        <SnackItem
          key={key}
          name={label}
          price={prices[key]}
          count={counts[key]}
          updateCount={(delta) => updateCount(key, delta)}
        />
      ))}
    </div>
  );
};

const SnackItem = ({ name, price, count, updateCount }) => (
  <div className="snack-item">
    <h3>{name}</h3>
    <h4>Price: ₦{price.toLocaleString()}</h4>
    <div className="controls">
      <Button disabled={count <= 0} onClick={() => updateCount(-1)}>
        <FontAwesomeIcon icon={faMinus} />
      </Button>
      <span>{count}</span>
      <Button disabled={count >= 50} onClick={() => updateCount(1)}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      <Text>₦{(count * price).toLocaleString()}</Text>
    </div>
  </div>
);

