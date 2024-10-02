import { useState, useEffect } from "react";
import tickets from "../ticket.json";
import screen from "../assets/screen.jpg";
import thanks from "../assets/thanks.png";
import { useNavigate } from "react-router-dom";

export default function Ticket() {
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState([]);
  const [movie, setMovie] = useState([]);
  const [person, setPerson] = useState(0);
  const [overlayHidden, setOverlayHidden] = useState(false);
  const ticketDataImge = tickets;
  const rows = ["J", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [hiddenBookingBtn, setHiddenBookingBtn] = useState(false);
  const [hideCheckout, setHideCheckout] = useState(false);
  const [bookMessage, setBookMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    document.body.style.overflowY = "hidden";

    const savedTime = JSON.parse(localStorage.getItem("selectedTime") || "");
    const savedPlace = JSON.parse(localStorage.getItem("selectedPlace") || "");
    const savedDate = JSON.parse(localStorage.getItem("selectedDate") || "");
    const savedMovie = JSON.parse(localStorage.getItem("selectedMovie") || "");

    setTime(savedTime);
    setPlace(savedPlace);
    setDate(savedDate);
    setMovie(savedMovie);

    console.log(savedPlace, savedTime, savedDate, savedMovie);
  }, []);

  function handleClickPerson(index) {
    setPerson(index);
    setSelectedSeat([]);
  }

  function handleClickHideOverlay() {
    setOverlayHidden(true);
    document.body.style.overflowY = "visible";
  }

  function handleClickShowOverlay() {
    setOverlayHidden(false);
    document.body.style.overflowY = "hidden";
  }

  const clickHandleSeat = (seatLabel, seatType) => {
    const maxSeat = person + 1;
    const seatPrice = seatType === "gold" ? 500 : 400;

    if (selectedSeat.length === 1 && selectedSeat.includes(seatLabel)) {
      setHiddenBookingBtn(false);
    } else {
      setHiddenBookingBtn(true);
    }

    if (selectedSeat.includes(seatLabel)) {
      setSelectedSeat(selectedSeat.filter((seat) => seat !== seatLabel));
    } else if (selectedSeat.length < maxSeat) {
      setSelectedSeat([...selectedSeat, seatLabel]);
      console.log(`Seat: ${seatLabel}, Price: Rs. ${seatPrice}`);
    } else {
      alert("You have already selected the maximum number of seats.");
    }
  };

  const renderSeats = (seatType, startRow, EndRow) => {
    return rows.slice(startRow, EndRow).map((row) =>
      Array.from({ length: 10 }, (_, index) => {
        const seatLabel = `${row}${index + 1}`;
        return (
          <div
            key={seatLabel}
            className={
              selectedSeat.includes(seatLabel)
                ? "gridItem activeSeatSelected"
                : `gridItem ${seatType}`
            }
            onClick={() => clickHandleSeat(seatLabel, seatType)}
          >
            {seatLabel}
          </div>
        );
      })
    );
  };

  const clickCheckOut = () => {
    setHideCheckout(true);
  };

  const showCheckout = () => {
    setHideCheckout(false);
  };

  const calculateTotalPrice = () => {
    return selectedSeat.reduce((total, seat) => {
      const seatType = seat[0] >= "A" && seat[0] <= "H" ? "silver" : "gold";
      const seatPrice = seatType === "gold" ? 500 : 400;
      return total + seatPrice;
    }, 0);
  };

  const calculateConvenienceFee = () => {
    return calculateTotalPrice() * 0.18;
  };

  const handleBooking = () => {
    setBookMessage(true);
  };

  const handleClickHome = () => {
    navigate("/")
  }
  const goToBack = () => {
    navigate("/booking");
  };

  return (
    <>
      {/* 1st row start */}
      <div className="ticketFirstRow">
        <div className="boxWidth">
          <div className="ticketInfoCont">
            <i className="fa-solid fa-angle-left goToBack" onClick={goToBack}></i>
            <div className="ticketInfo">
              <p>{movie.movieTitle}</p>
              <p className="ticketVenue">
                {place} | {date.day}, {date.date} {date.month}, {time}
              </p>
            </div>
          </div>
          <button className="ticketPersonBtn" onClick={handleClickShowOverlay}>
            {person + 1 == 1 ? "1 Ticket" : `${person + 1} Tickets`}{" "}
            <i className="fa-solid fa-pencil"></i>
          </button>
        </div>
      </div>
      <div className={overlayHidden ? "hideTicketOverlay" : "overlay"}>
        <div className="ticketCont">
          <p>How Many Seats?</p>
          <img src={ticketDataImge[person].img} alt="" />
          <div className="buttonTicket">
            {tickets.map((ticket, index) => (
              <button
                className={person === index ? "activebuttonTicket" : undefined}
                key={index}
                onClick={() => handleClickPerson(index)}
              >
                {ticket.person}
              </button>
            ))}
          </div>
          <button className="selectSeatBtn" onClick={handleClickHideOverlay}>
            Select Seats
          </button>
        </div>
      </div>
      {/* 1st row ends */}

      {/* 2nd row starts */}

      <div className="ticketSecondRow">
        <div className="boxWidth">
          <div className="seatCont">
            <div id="goldContainer">
              <p>Rs. 500 Gold Seat</p>
              <div className="gridContainer">{renderSeats("gold", 0, 2)}</div>
            </div>
            <div id="silverContainer">
              <p>Rs. 400 Silver Seat</p>
              <div className="gridContainer">
                {renderSeats("silver", 2, rows.length)}
              </div>
            </div>
            <div className="screenCont">
              <img src={screen} alt="" />
              <p>All eyes this way please!</p>
            </div>
          </div>
        </div>

        <div
          className={
            hiddenBookingBtn && !hideCheckout
              ? "ticketBookingCont"
              : "ticketBookingCont hiddenTicketBookingBtn"
          }
        >
          <button onClick={clickCheckOut}>Continue</button>
        </div>

        <div
          className={hideCheckout ? "checkoutCont" : "checkoutCont hideSideBar"}
        >
          {bookMessage ? (
            <>
            <div className="thankCont">
              <img src={thanks} alt="" />
              <p>Booking Confirmed</p>
            </div>
            <button onClick={handleClickHome}>Go to Home</button>
            </>
          ) : (
            <>
              <div>
                <div className="firstRowHC">
                  <p>Booking Summary</p>
                  <i className="fa-solid fa-xmark" onClick={showCheckout}></i>
                </div>
                <div className="secondRowHC">
                  <p>{selectedSeat.join(", ")}</p>
                  <p className="checkoutPrice">
                    Rs. {calculateTotalPrice().toFixed(2)}
                  </p>
                </div>
                <div className="thirdRowHC">
                  <p>Convenience fees</p>
                  <p>Rs. {calculateConvenienceFee().toFixed(2)}</p>
                </div>
                <div className="forthRowHC">
                  <p>Amount Payable</p>
                  <p>
                    Rs.{" "}
                    {(
                      calculateTotalPrice() + calculateConvenienceFee()
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
              <button onClick={handleBooking}>Confirmed</button>
            </>
          )}
        </div>
      </div>

      {/* 2nd row ends */}
    </>
  );
}
