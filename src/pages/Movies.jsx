import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Movies() {
  const [imageID, setImageID] = useState("");
  const [imageAPI, setImageAPI] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const savedImageId = JSON.parse(localStorage.getItem("imageID")) || "";
    const savedImageAPI = JSON.parse(localStorage.getItem("imageAPI")) || "";
    setImageID(savedImageId);
    setImageAPI(savedImageAPI);
    console.log(savedImageId, savedImageAPI);

    displayMovies(savedImageId, savedImageAPI);
  }, []);

  const displayMovies = (storedID, storedAPI) => {
    fetch(storedAPI)
      .then((res) => res.json())
      .then((data) => {
        const matchingId = data.results.find(
          (item) => item.id.toString() === storedID
        );

        if (matchingId) {
          setMovieData(matchingId);
        }
      });
  };

  function handleClickBook() {
    setOverlayVisible(true);
    document.body.style.overflowY = "hidden";
  }

  function handleClickBookClose() {
    setOverlayVisible(false);
    document.body.style.overflowY = "visible";
  }

  const navigate = useNavigate();

  function handleClickLang(event) {
    const movieDimension = event.target.id;
    const movieTitle = movieData.title || movieData.name || "";
    localStorage.setItem("movieDim", JSON.stringify(movieDimension));
    localStorage.setItem("movieTitle", JSON.stringify(movieTitle));
    console.log(movieDimension, movieTitle);
    navigate("/booking");
    document.body.style.overflowY = "visible";
  }

  return (
    <>
      {/* <!-- banner starts --> */}
      <div
        className="bannerMovies"
        style={{
          backgroundImage: movieData
            ? `linear-gradient(
            90deg,
            rgba(26, 26, 26, 1),
            rgba(26, 26, 26, 1),
            rgba(26, 26, 26, 1),
            rgba(26, 26, 26, 0.4),
            rgba(26, 26, 26, 1),
            rgba(26, 26, 26, 1)
          ),
          url(https://image.tmdb.org/t/p/w500/${movieData.backdrop_path})`
            : "",
        }}
      >
        <div className="bannerMovieImage boxWidth">
          <img
            src={
              movieData
                ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
                : ""
            }
            alt=""
            id="bannerPoster"
          />
          <div>
            <h2 id="bannerTitle">{movieData ? movieData.title : ""}</h2>
            <div className="bannerRatingCont">
              <i className="fa-solid fa-star"></i>
              <p className="bannerRateCont">
                <span id="bannerRating">
                  {movieData ? movieData.vote_average.toFixed(1) : "N/A"}
                </span>
                /10
              </p>
              <p>
                (
                <span id="bannerVote">
                  {movieData ? movieData.vote_count : 0}
                </span>{" "}
                Votes)
              </p>
            </div>
            <div className="bannerBtnCont">
              <button>2D, 3D, IMAX 3D, 4DX</button>
              <button>Hindi, English</button>
            </div>
            <p className="lastPara">2h 43m • Action, Comedy, Thriller • UA</p>
            <button className="ticketBook" onClick={handleClickBook}>
              Book Ticket
            </button>
          </div>
        </div>
      </div>

      {/* <!-- banner ends --> */}

      {/* <!-- About starts --> */}

      <div className="aboutUS boxWidth">
        <h3>About the movie</h3>
        <p id="aboutText">{movieData ? movieData.overview : "Loading..."}</p>
      </div>

      {/* <!-- About ends --> */}

      {/* <!-- ticket format starts --> */}

      <div className={overlayVisible ? "overlay" : "overlay opacityHalf"}>
        <div className="ticketBox">
          <div className="movieNameBox">
            <div>
              <p className="movieName">{movieData ? movieData.title : ""}</p>
              <h4>Select language and format</h4>
            </div>
            <div>
              <i
                className="fa-solid fa-xmark closeIcon"
                onClick={handleClickBookClose}
              ></i>
            </div>
          </div>
          <div className="languageBox">
            <p>ENGLISH</p>
          </div>
          <div className="LangButtonBox">
            <button
              id="English - 2D"
              className="LangButton"
              onClick={handleClickLang}
            >
              2D
            </button>
            <button
              id="English - 3D"
              className="LangButton"
              onClick={handleClickLang}
            >
              3D
            </button>
            <button
              id="English - IMAX 3D"
              className="LangButton"
              onClick={handleClickLang}
            >
              IMAX 3D
            </button>
            <button
              id="English - 4DX"
              className="LangButton"
              onClick={handleClickLang}
            >
              4DX
            </button>
          </div>
          <div className="languageBox">
            <p>HINDI</p>
          </div>
          <div className="LangButtonBox">
            <button
              id="Hindi - 2D"
              className="LangButton"
              onClick={handleClickLang}
            >
              2D
            </button>
            <button
              id="Hindi - 3D"
              className="LangButton"
              onClick={handleClickLang}
            >
              3D
            </button>
          </div>
        </div>
      </div>
      {/* <!-- ticket format ends --> */}
    </>
  );
}

// import { useState, useEffect } from "react";

// export default function Movies() {
//   const [imageID, setImageID] = useState("");
//   const [imageAPI, setImageAPI] = useState("");
//   const [movieData, setMovieData] = useState(null);
//   const [overlayVisible, setOverlayVisible] = useState(false);

//   useEffect(() => {
//     const storedImageId = localStorage.getItem("clickImageId") || "";
//     const storedImageAPI = localStorage.getItem("clickImageAPI") || "";
//     setImageID(storedImageId);
//     setImageAPI(storedImageAPI);

//     displayMovies(storedImageId, storedImageAPI);
//   }, []);

//   const displayMovies = (storedID, storedAPI) => {
//     fetch(storedAPI)
//       .then((res) => res.json())
//       .then((data) => {
//         const matchingId = data.results.find(
//           (item) => item.id.toString() === storedID
//         );

//         if (matchingId) {
//           setMovieData(matchingId);
//         }
//       });
//   };

//   const handleTicketBookClick = () => {
//     setOverlayVisible(true);
//     document.body.style.overflowY = "hidden";
//   };

//   const handleCloseClick = () => {
//     setOverlayVisible(false);
//     document.body.style.overflowY = "scroll";
//   };

//   const handleLangButtonClick = (e) => {
//     const movieDimension = e.target.id;
//     const movieTitle = movieData?.title || movieData?.name || "";
//     localStorage.setItem("movieDimension", movieDimension);
//     localStorage.setItem("movieTitle", movieTitle);
//     window.location.href = "booking.html";
//   };

//   return (
//     <>
//       {/* <!-- banner starts --> */}
//       <div
//         className="bannerMovies"
//         style={{
//           backgroundImage: movieData
//             ? `linear-gradient(
//                 90deg,
//                 rgba(26, 26, 26, 1),
//                 rgba(26, 26, 26, 1),
//                 rgba(26, 26, 26, 1),
//                 rgba(26, 26, 26, 0.4),
//                 rgba(26, 26, 26, 1),
//                 rgba(26, 26, 26, 1)
//               ), url(https://image.tmdb.org/t/p/w500/${movieData.backdrop_path})`
//             : "",
//         }}
//       >
//         <div className="bannerMovieImage boxWidth">
//           <img
//             src={
//               movieData
//                 ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
//                 : ""
//             }
//             alt=""
//             id="bannerPoster"
//           />
//           <div>
//             <h2 id="bannerTitle">{movieData ? movieData.title : "Loading..."}</h2>
//             <div className="bannerRatingCont">
//               <i className="fa-solid fa-star"></i>
//               <p className="bannerRateCont">
//                 <span id="bannerRating">
//                   {movieData ? movieData.vote_average.toFixed(1) : "N/A"}
//                 </span>
//                 /10
//               </p>
//               <p>
//                 (<span id="bannerVote">{movieData ? movieData.vote_count : 0}</span> Votes)
//               </p>
//             </div>
//             <div className="bannerBtnCont">
//               <button onClick={handleTicketBookClick}>2D, 3D, IMAX 3D, 4DX</button>
//               <button>Hindi, English</button>
//             </div>
//             <p className="lastPara">2h 43m • Action, Comedy, Thriller • UA</p>
//             <button className="ticketBook" onClick={handleTicketBookClick}>Book Ticket</button>
//           </div>
//         </div>
//       </div>
//       {/* <!-- banner ends --> */}

//       {/* <!-- About starts --> */}
//       <div className="aboutUS boxWidth">
//         <h3>About the movie</h3>
//         <p id="aboutText">{movieData ? movieData.overview : "Loading..."}</p>
//       </div>
//       {/* <!-- About ends --> */}

//       {/* <!-- ticket format starts --> */}
//       {overlayVisible && (
//         <div className="overlay opacityHalf">
//           <div className="ticketBox">
//             <div className="movieNameBox">
//               <div>
//                 <p className="movieName">{movieData?.title || "Movie Name"}</p>
//                 <h4>Select language and format</h4>
//               </div>
//               <div>
//                 <i className="fa-solid fa-xmark closeIcon" onClick={handleCloseClick}></i>
//               </div>
//             </div>
//             <div className="languageBox">
//               <p>ENGLISH</p>
//             </div>
//             <div className="LangButtonBox">
//               <button id="English - 2D" className="LangButton" onClick={handleLangButtonClick}>2D</button>
//               <button id="English - 3D" className="LangButton" onClick={handleLangButtonClick}>3D</button>
//               <button id="English - IMAX 3D" className="LangButton" onClick={handleLangButtonClick}>IMAX 3D</button>
//               <button id="English - 4DX" className="LangButton" onClick={handleLangButtonClick}>4DX</button>
//             </div>
//             <div className="languageBox">
//               <p>HINDI</p>
//             </div>
//             <div className="LangButtonBox">
//               <button id="Hindi - 2D" className="LangButton" onClick={handleLangButtonClick}>2D</button>
//               <button id="Hindi - 3D" className="LangButton" onClick={handleLangButtonClick}>3D</button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* <!-- ticket format ends --> */}
//     </>
//   );
// }
