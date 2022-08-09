import React from "react";
import "./MovieCard.css";
import Badge from "@mui/material/Badge";
import noImage from "../../images/noimage2.jpeg";
import "./Container.scss";

const MovieCard = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
  imagename,
}) => {
  return (
    <div key={id} className="c-preview">
      <a>
        <div className="c-preview__img">
          <img src={imagename ? poster : noImage} alt={title} />
          {vote_average && (
            <Badge
              badgeContent={Math.round(vote_average * 10) / 10}
              color={vote_average >= 7 ? "success" : "error"}
            />
          )}
        </div>
      </a>
      <div className="title">{title}</div>
    </div>
  );
};

export default MovieCard;
