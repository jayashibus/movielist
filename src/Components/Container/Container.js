import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setCategoryMovie } from "../../redux/actions/movieAction";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../redux/contants/actiontypes";
import MovieCard from "./MovieCard";
import "./Container.scss";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { setMovies } from "../../redux/actions/movieAction";

const Container = () => {
  const dispatch = useDispatch();
  let movies = useSelector((state) => {
    return { ...state.allMovies };
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("movies");

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

  const onSearchHandler = (event) => {
    console.log(event.target.value);
    const keyword = event.target.value;
    const apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=b8147d9a2b320232dcbd7689528ce05a&language=en-US&query=${keyword}&page=1&include_adult=false`;
    searchMovies(apiUrl);
    setSearch(event.target.value);
  };

  const searchMovies = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
      const movieData = await response.json();
      dispatch(setMovies(movieData.results));
    } catch (error) {
      console.log(error);
    }
  };

  const onClickMovieHandler = (category) => {
    const type = {
      movies: ActionTypes.SET_MOVIES,
      movie: ActionTypes.SELECTED_CATEGORY_MOVIE,
      tv: ActionTypes.SELECTED_CATEGORY_TV,
      person: ActionTypes.SELECTED_CATEGORY_PERSON,
    };
    console.log(type[category]);
    dispatch(setCategoryMovie(movies.movies, type[category]));
    setCategory(category);
  };

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
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

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
                  : category === "person"
                  ? "Others"
                  : "All"}
              </h1>
            </div>

            <div
              style={{
                paddingTop: "75px",
              }}
            >
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  color={category == "movies" ? "success" : "error"}
                  onClick={() => onClickMovieHandler("movies")}
                >
                  All
                </Button>
                <Button
                  variant="contained"
                  color={category == "movie" ? "success" : "error"}
                  onClick={() => onClickMovieHandler("movie")}
                >
                  Movies
                </Button>
                <Button
                  variant="contained"
                  color={category == "tv" ? "success" : "error"}
                  onClick={() => onClickMovieHandler("tv")}
                >
                  TV Shows
                </Button>
                <Button
                  variant="contained"
                  color={category == "person" ? "success" : "error"}
                  onClick={() => onClickMovieHandler("person")}
                >
                  Others
                </Button>

                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={onSearchHandler}
                    autoFocus={true}
                    value={search}
                  />
                </Search>
              </Stack>
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
                    imagename={movie.poster_path}
                  />
                );
              })}
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
