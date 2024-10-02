import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import event1 from "../assets/event1.avif";
import event2 from "../assets/event2.avif";
import event3 from "../assets/event3.avif";
import event4 from "../assets/event4.avif";
import event5 from "../assets/event5.avif";
import event6 from "../assets/event6.avif";
import event7 from "../assets/event7.avif";
import event8 from "../assets/event8.avif";
import event9 from "../assets/event9.avif";
import event10 from "../assets/event10.avif";
import ad1 from "../assets/ad1.avif";
import premier from "../assets/premier.avif";

export default function APISlider() {
  const eventMovieWidthRef = useRef(null);
  const apiSlider1Ref = useRef(null);
  const apiSlider2Ref = useRef(null);
  const apiSlider3Ref = useRef(null);
  const apiSlider4Ref = useRef(null);
  const [eventWidth, setEventWidth] = useState(0);
  const [movies1, setMovies1] = useState([]);
  const [movies2, setMovies2] = useState([]);
  const [movies3, setMovies3] = useState([]);
  const [movies4, setMovies4] = useState([]);
  const [imageId, setImageId] = useState(null);
  const [imageAPI, setImageAPI] = useState(null);

  const apiEndpoints = [
    "https://api.themoviedb.org/3/movie/popular?api_key=d7667b78097516f5e82e6955576dcf62",
    "https://api.themoviedb.org/3/trending/movie/day?api_key=d7667b78097516f5e82e6955576dcf62",
    "https://api.themoviedb.org/3/trending/tv/week?api_key=d7667b78097516f5e82e6955576dcf62",
    "https://api.themoviedb.org/3/movie/popular?api_key=d7667b78097516f5e82e6955576dcf62",
  ];

  useEffect(() => {
    fetchMovies(apiEndpoints[0], setMovies1);
    fetchMovies(apiEndpoints[1], setMovies2);
    fetchMovies(apiEndpoints[2], setMovies3);
    fetchMovies(apiEndpoints[3], setMovies4);
  }, []);

  useEffect(() => {
    if (eventMovieWidthRef.current) {
      setEventWidth(eventMovieWidthRef.current.clientWidth);
    }
  }, []);

  //   function handleEventClick(direction) {
  const handleEventClick = (direction, ref) => {
    const eventWidthCarousel = ref.current;
    const scrollAmount =
      direction === "left" ? -eventWidth - 30 : eventWidth + 30;

    if (eventWidthCarousel) {
      eventWidthCarousel.scrollLeft += scrollAmount;
    }
  };

  //   async function fetchMovies(apiEndpoint, setMovie){
  const fetchMovies = async (apiEndpoint, setMovie) => {
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      setMovie(data.results || []); // Ensure results is always an array
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const navigate = useNavigate();

  function handleImageClick(event) {
    const clickedImageId = event.target.alt;
    const clickedImageAPI = event.target.dataset.author;

    localStorage.setItem("imageID", JSON.stringify(clickedImageId));
    localStorage.setItem("imageAPI", JSON.stringify(clickedImageAPI));

    // setImageId(clickedImageId);
    // setImageAPI(clickedImageAPI);

    navigate("/movies");
    console.log(clickedImageId, clickedImageAPI);
  }

//   useEffect(() => {
//     if (imageId && imageAPI) {
//       localStorage.setItem("imageID", JSON.stringify(imageId));
//       localStorage.setItem("imageAPI", JSON.stringify(imageAPI));
//     }
//   }, [imageId, imageAPI]);

  //   function renderMovies(movies) {
  const renderMovies = (movies, apiList) => {
    return movies.map((item) => (
      <div className="recommMovies" key={item.id}>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
            alt={item.id}
            data-author={apiList}
            onClick={handleImageClick}
          />
          <div className="rating">
            <i className="fa-solid fa-star"></i>
            <p>{item.vote_average.toFixed(1)}/10</p>
            <p>{item.vote_count} Votes</p>
          </div>
        </div>
        <p className="movieTitle">{item.title}</p>
        <p className="movieDes">Comedy/Thriller</p>
      </div>
    ));
  };

  return (
    <>
      {/* <!-- Recommended Movies starts --> */}

      <section className="recommSection">
        <div className="boxWidth ">
          <div className="recommTitle">
            <h2>Recommended Movies</h2>
            {/* <p>
              <a href="#">
                See All <i className="fa-solid fa-angle-right"></i>
              </a>
            </p> */}
          </div>
          <div
            className="recommMoviesCont recommMoviesCont1"
            ref={apiSlider1Ref}
          >
            {renderMovies(movies1, apiEndpoints[0])}
            {/* <!-- API 1 Calling --> */}
          </div>
          <button
            className="sliderBtn apiSliderLeft1"
            id="left"
            onClick={() => handleEventClick("left", apiSlider1Ref)}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <button
            className="sliderBtn apiSliderRight1"
            id="right"
            onClick={() => handleEventClick("right", apiSlider1Ref)}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </section>

      <section className="advertise">
        <div className="boxWidth">
          <img src={ad1} alt="" />
        </div>
      </section>

      <section className="recommSection">
        <div className="boxWidth">
          <div className="recommTitle">
            <h2>The Best Of Live Events</h2>
          </div>
          <div className="recommMoviesContEvent">
            <div className="eventMoviesList" ref={eventMovieWidthRef}>
              <img src={event1} alt="" />
              <img src={event2} alt="" />
              <img src={event3} alt="" />
              <img src={event4} alt="" />
              <img src={event5} alt="" />
              <img src={event6} alt="" />
              <img src={event7} alt="" />
              <img src={event8} alt="" />
              <img src={event9} alt="" />
              <img src={event10} alt="" />
            </div>
            <button
              className="sliderBtn1 sliderBtnLeft1"
              id="left"
              onClick={() => handleEventClick("left", eventMovieWidthRef)}
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>
            <button
              className="sliderBtn1 sliderBtnRight1"
              id="right"
              onClick={() => handleEventClick("right", eventMovieWidthRef)}
            >
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* <!-- Recommended Movies ends --> */}

      {/* <!-- Premieres Movies starts --> */}

      <section className="premierSect">
        <div className="boxWidth">
          <img src={premier} alt="" />
          <h2>Premieres</h2>
          <div
            className="recommMoviesCont recommMoviesCont2"
            ref={apiSlider2Ref}
          >
            {renderMovies(movies2, apiEndpoints[1])}
            {/* <!-- API 2 Calling --> */}
          </div>
          <button
            className="sliderBtn apiSliderLeft2"
            id="left"
            onClick={() => handleEventClick("left", apiSlider2Ref)}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <button
            className="sliderBtn apiSliderRight2"
            id="right"
            onClick={() => handleEventClick("right", apiSlider2Ref)}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </section>

      {/* <!-- Premieres Movies ends --> */}

      {/* <!-- other movies starts --> */}

      <div className="boxWidth">
        <section className="otherMovies1">
          <h2>Popular</h2>
          <div
            className="recommMoviesCont recommMoviesCont3"
            ref={apiSlider3Ref}
          >
            {renderMovies(movies3, apiEndpoints[2])}
            {/* <!-- API 3 Calling --> */}
          </div>
          <button
            className="sliderBtn apiSliderLeft3"
            id="left"
            onClick={() => handleEventClick("left", apiSlider3Ref)}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <button
            className="sliderBtn apiSliderRight3"
            id="right"
            onClick={() => handleEventClick("right", apiSlider3Ref)}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </section>
        <section className="otherMovies2">
          <h2>Trending</h2>
          <div
            className="recommMoviesCont recommMoviesCont4"
            ref={apiSlider4Ref}
          >
            {renderMovies(movies4, apiEndpoints[3])}
            {/* <!-- API 4 Calling --> */}
          </div>
          <button
            className="sliderBtn apiSliderLeft4"
            id="left"
            onClick={() => handleEventClick("left", apiSlider4Ref)}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <button
            className="sliderBtn apiSliderRight4"
            id="right"
            onClick={() => handleEventClick("right", apiSlider4Ref)}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </section>
      </div>

      {/* <!-- other movies ends --> */}
    </>
  );
}
