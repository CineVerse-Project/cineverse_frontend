import React, { useEffect, useState } from "react";
import clientService from "../../../../services/ClientService";
import { Link } from "react-router-dom";

function MovieListTop10IsShowing() {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClickPrev = () => {
    setSlideIndex(slideIndex === 0 ? setMovieListTop10IsShowing.length - 1 : slideIndex - 1);
  };
  const handleClickNext = () => {
    setSlideIndex(slideIndex === setMovieListTop10IsShowing.length - 1 ? 0 : slideIndex + 1);
  };

  const handleClick = () => {
    window.scrollTo(0, 0); // Di chuyển trang web đến đầu trang
  };
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

                  <Link to={`/movie-detail/${movieTop10IsShowing.movieId}`} onClick={handleClick} >
                    <a href className="movie-list-item-button-detail">
                      Chi tiết
                    </a>
                  </Link>

                  <Link to={`/showtime?movieId=/${movieTop10IsShowing.movieId}`} onClick={handleClick} >
                    <button className="movie-list-item-button">ĐẶT VÉ</button>
                  </Link>

                </div>
              );
            })}
          </div>
          <i className="fas fa-chevron-right arrow-right" onClick={handleClickNext} />
          <i className="fas fa-chevron-left arrow-left" onClick={handleClickPrev} />
        </div>
      </div>
    </>
  );
}

export default MovieListTop10IsShowing;
