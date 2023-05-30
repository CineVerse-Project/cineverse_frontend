import React, { useEffect, useState } from "react";
import clientService from "../../../../services/ClientService";
import { Link } from "react-router-dom";

function MovieListPremiereSoon() {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClickPrev = () => {
    setSlideIndex(slideIndex === 0 ? setMovieListPremiereSoon.length - 1 : slideIndex - 1);
  };
  const handleClickNext = () => {
    setSlideIndex(slideIndex === setMovieListPremiereSoon.length - 1 ? 0 : slideIndex + 1);
  };

  const handleClick = () => {
    window.scrollTo(0, 0); // Di chuyển trang web đến đầu trang
  };
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

                  <Link to={`/movie-detail/${moviePremiereSoon.movieId}`}onClick={handleClick} >
                    <a className="movie-list-item-button-detail">
                      Chi tiết
                    </a>
                  </Link>
                </div>
              );
            })}
        </div>
        <i className="fas fa-chevron-right arrow-right" onClick={handleClickNext} />
        <i className="fas fa-chevron-left arrow-left" onClick={handleClickPrev} />
      </div>
    </>
  );
}

export default MovieListPremiereSoon;
