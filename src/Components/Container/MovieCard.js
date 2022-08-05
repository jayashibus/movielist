import React from "react";
import "./MovieCard.css";
import Badge from "@mui/material/Badge";

const MovieCard = ({ id, poster, title, date, media_type, vote_average }) => {
  return (
    <div key={id}>
      <img className="poster" src={poster} alt={title} />
      <Badge
        badgeContent={Math.round(vote_average * 10) / 10}
        color={vote_average > 7 ? "success" : "error"}
      />
      <div className="title">{title}</div>
      {/* <span className="subTitle">{media_type === "tv" ? "TV" : "Movie"}</span> */}
    </div>
  );
};

export default MovieCard;
