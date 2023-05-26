import React, { useEffect, useState } from "react";
import clientService from "../../../../services/ClientService";

function MovieListPremiereSoon() {
  const [movieListPremiereSoon, setMovieListPremiereSoon] = useState();

  useEffect(() => {
    const getAllMovieListPremiereSoonAPI = () => {
      clientService
        .getAllMovieListPremiereSoon()
        .then((data) => {
          setMovieListPremiereSoon(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllMovieListPremiereSoonAPI();
  }, []);

  return (
    <>
      <h1 className="movie-list-title">Phim sắp công chiếu</h1>
      <div className="movie-list-wrapper">
        <div className="movie-list">
          {movieListPremiereSoon &&
            movieListPremiereSoon.map((moviePremiereSoon) => {
              return (
                <div className="movie-list-item">
                  <img
                    className="movie-list-item-img"
                    src={moviePremiereSoon.imageUrl}
                    alt
                  />
                  <span className="movie-list-item-title">
                    {moviePremiereSoon.movieName}
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

export default MovieListPremiereSoon;
