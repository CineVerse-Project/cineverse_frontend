import React, { useEffect, useState } from "react";
import clientService from "../../../../services/ClientService";
import { Link } from "react-router-dom";


function MovieListIsShowing() {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClickPrev = () => {
    setSlideIndex(slideIndex === 0 ? movieListIsShowing.length - 1 : slideIndex - 1);
  };
  const handleClickNext = () => {
    setSlideIndex(slideIndex === movieListIsShowing.length - 1 ? 0 : slideIndex + 1);
  };
  

  const handleClick = () => {
    window.scrollTo(0, 0); // Di chuyển trang web đến đầu trang
  };

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
        <div className="movie-list" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
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
                  <Link to={`/movie-detail/${movieIsShowing.movieId}`} onClick={handleClick} >
                    <a className="movie-list-item-button-detail">
                      Chi tiết
                    </a>
                  </Link>
                  <Link to={`/showtime?movieId=/${movieIsShowing.movieId}`} onClick={handleClick} >
                    <button className="movie-list-item-button">ĐẶT VÉ</button>
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

export default MovieListIsShowing;
