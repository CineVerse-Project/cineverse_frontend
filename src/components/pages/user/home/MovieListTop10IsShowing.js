import React, { useEffect, useState } from "react";
import clientService from "../../../../services/ClientService";

function MovieListTop10IsShowing() {
  const [movieListTop10IsShowing, setMovieListTop10IsShowing] = useState();

  useEffect(() => {
    const getAllMovieListTop10IsShowingAPI = () => {
      clientService
            .getTop10MovieIsShowing()
            .then((data) => {
              setMovieListTop10IsShowing(data)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    getAllMovieListTop10IsShowingAPI();
  },[]);

  return (
    <>
      <h1 className="movie-list-title">PHIM TOP</h1>
      <div className="movie-list-wrapper">
        <div className="movie-list">
          <div className="movie-list">
          {movieListTop10IsShowing &&
            movieListTop10IsShowing.map((movieTop10IsShowing) => {
              return (
                <div className="movie-list-item">
                  <img
                    className="movie-list-item-img"
                    src={movieTop10IsShowing.imageUrl}
                    alt
                  />
                  <span className="movie-list-item-title">
                    {movieTop10IsShowing.movieName}
                  </span>
                  <a href className="movie-list-item-button-detail">
                    Chi tiết
                  </a>
                  <button className="movie-list-item-button">ĐẶT VÉ</button>
                </div>
              );
            })}
          </div>
          <i className="fas fa-chevron-right arrow" />
        </div>
      </div>
    </>
  );
}

export default MovieListTop10IsShowing;
