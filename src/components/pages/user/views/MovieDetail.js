import React from "react";
import MovieListIsShowing from "../home/MovieListIsShowing";
import MovieInformation from "../movieDetail/MovieInformation";
import "./css/home.css"
import Discount from "../home/Discount";
import MovieaDescription from "../movieDetail/MovieaDescription";

function MovieDetail() {
  return (
    <div className="container-home">
      <div className="content-container">
        <div className="movie-list-container">
          <MovieInformation />
        </div>
        <div class="movie-list-container-descriptionfirm">
          <MovieaDescription />
        </div>
        <div className="movie-list-container">
          <MovieListIsShowing />
        </div>
        <div className="discount featured-content">
          <Discount />
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
