import cinema from "../assets/cinema.png";
import { useState, useEffect } from "react";
import dataDate from "../date.json";
import datePlace from "../places.json";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const [movieDimention, setMovieDimention] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [dates, setDates] = useState([]);
  const [places, setPlaces] = useState([]);
  const [dimList, setDimList] = useState(false);
  const [activeBtn, setActiveBtn] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0); //// Scroll to top of the page

    const savedMovieDimention =
      JSON.parse(localStorage.getItem("movieDim")) || "";
    const savedMovieTitle =
      JSON.parse(localStorage.getItem("movieTitle")) || "";
    setMovieDimention(savedMovieDimention);
    setMovieTitle(savedMovieTitle);
    console.log(savedMovieDimention, savedMovieTitle);

    setDates(dataDate);
    console.log(dataDate);

    setPlaces(datePlace);
    console.log(datePlace);
  }, []);

  function showDimList() {
    setDimList(true);
  }

  function newDimentionSelect(event) {
    setDimList(false);
    setMovieDimention(event.target.innerHTML);
  }

  function setActiveBooking(index) {
    setActiveBtn(index);
  }

  const navigate = useNavigate()

  function clickTimeHandle(event) {
    const selectedDate = dates[activeBtn];
    const selectedTime = event.target.innerHTML;
    const selectedPlace =
      event.target.parentElement.parentElement.previousSibling.firstElementChild
        .innerHTML;
    const selectedMovie = {movieTitle}
    // const selectedMovie = "HEllo"

    localStorage.setItem("selectedDate", JSON.stringify(selectedDate));
    localStorage.setItem("selectedTime", JSON.stringify(selectedTime));
    localStorage.setItem("selectedPlace", JSON.stringify(selectedPlace));
    localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));

    navigate("/ticket")

    console.log("Selected Date:", selectedDate);
    console.log("Selected Time:", selectedTime);
    console.log("Selected Place:", selectedPlace);
    console.log("Selected Movie:", selectedMovie);
  }

  return (
    <>
      {/* <!-- booking time starts --> */}

      <section className="booking">
        <div className="bookFirstRow">
          <div className="boxWidth">
            <p className="bookMovieName">{movieTitle}</p>
            <ul>
              <li>Action</li>
              <li>Comedy</li>
              <li>Drama</li>
            </ul>
          </div>
        </div>

        <div className="bookSecRow">
          <div className="boxWidth">
            <div className="bookDateCont">
              {dates.map((date, index) => (
                <button
                  className={
                    activeBtn === index ? "bookDate bookDateActive" : "bookDate"
                  }
                  key={index}
                  onClick={() => setActiveBooking(index)}
                >
                  <p>{date.day}</p>
                  <p className="dateBooking">{date.date}</p>
                  <p>{date.month}</p>
                </button>
              ))}
            </div>
            <div className="bookDateLNF">
              <div className="inputDim" onClick={showDimList}>
                <input
                  type="text"
                  id="input1"
                  value={movieDimention}
                  onClick={showDimList}
                  disabled
                />
                <i className="fa-solid fa-angle-down"></i>
              </div>
              <div className="list">
                <ul className={dimList ? "dimList" : "hide dimList"}>
                  <li onClick={newDimentionSelect}>Hindi - 2D</li>
                  <li onClick={newDimentionSelect}>English - 2D</li>
                  <li onClick={newDimentionSelect}>Hindi - 3D</li>
                  <li onClick={newDimentionSelect}>English - 3D</li>
                  <li onClick={newDimentionSelect}>English - IMAX 3D</li>
                  <li onClick={newDimentionSelect}>English - 4DX</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* // <!-- booking time ends --> */}

      {/* // <!-- booking place starts --> */}

      <div className="bookPlace">
        <div className="boxWidth">
          <div className="bookCinema"></div>
          {places.map((place, index) => (
            <div className="bookCinemaCont" key={index}>
              <div className="bookCinemaName">
                <p>{place.name}</p>
                <img src={cinema} alt="" />
              </div>
              <div className="bookCinemaTime">
                <ul>
                  {place.time.map((timeTicket, index) => (
                    <li key={index} onClick={clickTimeHandle}>
                      {timeTicket}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <!-- booking place ends --> */}
    </>
  );
}
