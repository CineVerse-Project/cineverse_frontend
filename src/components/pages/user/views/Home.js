import React from "react";
import Banner from "../home/Banner";
import MovieListIsShowing from "../home/MovieListIsShowing";
import MovieListPremiereSoon from "../home/MovieListPremiereSoon";
import Discount from "../home/Discount";
import MovieListTop10IsShowing from "../home/MovieListTop10IsShowing";
import "../style/css/home.css"

function Home() {
  return (
      <div className="container-home">
        <div className="content-container">
          
          <div className="banner-video">
            <Banner />
          </div>

          <div className="movie-list-container">
            <MovieListIsShowing />  
          </div>

          <div className="movie-list-container">
            <MovieListPremiereSoon />
          </div>

          <div className="discount featured-content">
            <Discount />
          </div>

          <div className="movie-list-container">
            <MovieListTop10IsShowing />
          </div>

        </div>
      </div>
  );
}

export default Home;
