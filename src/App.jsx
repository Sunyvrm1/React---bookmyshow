import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx"
import APISlider from "./components/APISlider.jsx";
import Booking from "./pages/Booking.jsx";
import Ticket from "./pages/Ticket.jsx";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/apiSlider" element={<APISlider />}></Route>
          <Route path="/booking" element={<Booking />}></Route>
          <Route path="/ticket" element={<Ticket />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
