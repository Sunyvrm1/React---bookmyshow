import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header>
        {/* first Row starts  */}
        <div className="boxWidth">
          <div className="header1stRow">
            <div className="logoSearch">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
              <div className="searchBox">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Search for Movies, Events, Plays, Sports and Activities"
                />
              </div>
            </div>
            <div className="location">
              <button className="btnLocation">
                Delhi-NCR<i className="fa-solid fa-angle-down"></i>
              </button>
              <button className="signIn">Sign In</button>
              <div className="menuBar">
                <i className="fa-solid fa-bars"></i>
              </div>
            </div>
          </div>
        </div>

        {/* first Row ends  */}

        {/* Second Row starts  */}

        <div className="header2ndRow">
          <div className="boxWidth">
            <ul>
              <li>
                <a href="#">Movies</a>
              </li>
              <li>
                <a href="#">Stream</a>
              </li>
              <li>
                <a href="#">Events</a>
              </li>
              <li>
                <a href="#">Plays</a>
              </li>
              <li>
                <a href="#">Sports</a>
              </li>
              <li>
                <a href="#">Activities</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">ListYourShow</a>
              </li>
              <li>
                <a href="#">Corporates</a>
              </li>
              <li>
                <a href="#">Offers</a>
              </li>
              <li>
                <a href="#">Gift Cards</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Second Row ends  */}
      </header>
    </>
  );
}
