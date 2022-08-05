import React from "react";
import logo from "../../images/logo.png";
import { FaSearch, FaBell } from "react-icons/fa";
const Header = () => {
  return (
    <div>
      <header>
        <div className="netflixLogo">
          <a id="logo" href="#home">
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <nav className="main-nav">
          <a href="#home">Home</a>
          <a href="#tvShows">TV Shows</a>
          <a href="#movies">Movies</a>
          <a href="#originals">Originals</a>
          <a href="/#">Recently Added</a>
          <a href="/#">Portfolio</a>
        </nav>
        <nav className="sub-nav">
          <a href="/#">
            <FaSearch />
          </a>
          <a href="/#">
            <FaBell />
          </a>
          <a href="/#">Account</a>
        </nav>
      </header>
    </div>
  );
};

export default Header;
