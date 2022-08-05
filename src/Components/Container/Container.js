import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  setCategoryMovie,
  setCategoryTV,
} from "../../redux/actions/movieAction";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../redux/contants/actiontypes";
import MovieCard from "./MovieCard";
import "./Container.css";

const Container = () => {
  const dispatch = useDispatch();
  let movies = useSelector((state) => {
    return { ...state.allMovies };
  });

  // const [moviesData, setMoviesData] = useState([...movies.movies]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("movies");

  // if (category === "tv") {
  //   setMoviesData(stateTv);
  // } else if (category === "movie") {
  //   setMoviesData(stateMovie);
  // } else {
  //   setMoviesData(movies);
  // }

  // const filterCategory = (selectedCategory) => {
  //   if (selectedCategory !== "all") {
  //     const updatedMovie = movies.filter((currentMovie) => {
  //       return currentMovie.media_type === selectedCategory;
  //     });  //     setMoviesData(updatedMovie);
  //     setCategory(selectedCategory);
  //   } else {
  //     setMoviesData(movies);
  //     setCategory(selectedCategory);
  //   }
  // };

  // const onChangeHandler = (event) => {
  //   const keyword = event.target.value;
  //   setSearch(event.target.value);
  //   console.log(keyword);
  //   if (keyword !== "") {
  //     const results = movies.filter((singleData) => {
  //       return (
  //         singleData.title?.toLowerCase().includes(keyword.toLowerCase()) ||
  //         singleData.name?.toLowerCase().includes(keyword.toLowerCase())
  //       );
  //     });
  //     setMoviesData(results);
  //   } else {
  //     setMoviesData(movies);
  //   }
  // };

  // const onClickAllHandler = () => {
  //   console.log("I am here", moviesData);
  //   setMoviesData(movies.movies);
  //   setCategory("all");
  // };

  const searchHandler = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  const onClickMovieHandler = (category) => {
    const type = {
      movies: ActionTypes.SET_MOVIES,
      movie: ActionTypes.SELECTED_CATEGORY_MOVIE,
      tv: ActionTypes.SELECTED_CATEGORY_TV,
    };
    console.log(type[category]);
    dispatch(setCategoryMovie(movies.movies, type[category]));

    //setMoviesData(movies.movie);
    setCategory(category);
  };

  // const onClickTvHandler = () => {
  //   console.log("I am here", moviesData);
  //   dispatch(setCategoryTV(movies.movies));
  //   setMoviesData(movies.tv);
  //   setCategory("tv");
  // };
  // const onClickTVHandler = (movies) => {
  //   dispatch(setCategoryTV(movies));
  // };

  // useEffect(() => {
  //   if (category === "all" && search === "") {
  //     setMoviesData(movies);
  //   } else if (category !== "all" && search !== "") {
  //     const results = movies.filter((currentMovie) => {
  //       return (
  //         (currentMovie.title?.toLowerCase().includes(search.toLowerCase()) ||
  //           currentMovie.name?.toLowerCase().includes(search.toLowerCase())) &&
  //         currentMovie.media_type === category
  //       );
  //     });
  //     setMoviesData(results);
  //   } else if (category === "all" && search !== "") {
  //     const results = movies.filter((currentMovie) => {
  //       return (
  //         currentMovie.title?.toLowerCase().includes(search.toLowerCase()) ||
  //         currentMovie.name?.toLowerCase().includes(search.toLowerCase())
  //       );
  //     });
  //     setMoviesData(results);
  //   } else if (category !== "all" && search === "") {
  //     const results = movies.filter((currentMovie) => {
  //       return currentMovie.media_type === category;
  //     });
  //     movies = [...results];
  //     setMoviesData(results);
  //   }
  // }, [search, category]);

  return (
    <div>
      <section className="main-container">
        <div className="location" id="home">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h1 id="home">
                Popular on Netflix -{" "}
                {category === "movie"
                  ? "Movies"
                  : category === "tv"
                  ? "TV Show"
                  : "All"}
              </h1>
            </div>

            <div style={{ paddingTop: "90px" }}>
              <button onClick={() => onClickMovieHandler("movies")}>All</button>
              <button onClick={() => onClickMovieHandler("movie")}>
                Movies
              </button>
              <button onClick={() => onClickMovieHandler("tv")}>
                TV Shows
              </button>
              <input
                type="text"
                placeholder="Search Movies...."
                value={search}
                onChange={searchHandler}
              />
            </div>
          </div>

          {movies[category].length !== 0 ? (
            <div className="box">
              {movies[category].map((movie) => {
                const imageURL = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

                return (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    poster={imageURL}
                    title={movie.title || movie.name}
                    date={movie.first_air_date || movie.release_date}
                    media_type={movie.media_type}
                    vote_average={movie.vote_average}
                  />
                );
              })}{" "}
            </div>
          ) : (
            <div>
              <h2>No Results. </h2>
              <p>
                We couldn't find what you searched for. Check once again or try
                a different search.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default Container;
