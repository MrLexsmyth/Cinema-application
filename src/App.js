import "./App.css";
import Booking from "./booking/Booking";
import Home from "./home/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Seat from "./seat/Seat";


function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookings/:id" element={<Booking />} />
          <Route path="/seat" element={<Seat />} />
        </Routes>
      </BrowserRouter>
   
  );
}
export default App;
