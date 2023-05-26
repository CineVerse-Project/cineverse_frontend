import React, { useEffect, useState } from "react";
import clientService from "../../../../services/ClientService";

function MovieListIsShowing() {
  const [movieListIsShowing, setMovieListIsShowing] = useState();

  useEffect(() => {
    const getAllMovieListIsShowingAPI = () => {
      clientService
        .getAllMovieListIsShowing()
        .then((data) => {
          setMovieListIsShowing(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllMovieListIsShowingAPI();
  }, []);
  return (
    <>
      <h1 className="movie-list-title">Phim đang chiếu</h1>
      <div className="movie-list-wrapper">
        <div className="movie-list">
          {movieListIsShowing &&
            movieListIsShowing.map((movieIsShowing) => {
              return (
                <div className="movie-list-item">
                  <img
                    className="movie-list-item-img blur" 
                    src={movieIsShowing.imageUrl}
                    alt
                  />
                  <span className="movie-list-item-title">
                    {movieIsShowing.movieName}
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
    </>
  );
}

export default MovieListIsShowing;
