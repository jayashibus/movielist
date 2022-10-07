import "./App.css";
import React, { useEffect } from "react";
import Header from "./Components/Header/Header";
import Container from "./Components/Container/Container";
import Footer from "./Components/Footer/Footer";
import { useDispatch } from "react-redux";
import { setMovies } from "./redux/actions/movieAction";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const apiUrl =
    "https://api.themoviedb.org/3/trending/all/week?api_key=b8147d9a2b320232dcbd7689528ce05a&language=en-US";

  const fetchMovies = async () => {
    try {
      const response = await fetch(apiUrl);
      const movieData = await response.json();
      dispatch(setMovies(movieData.results));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <Container />
      <Footer />
    </div>
  );
}

export default App;
