import React, { useEffect, useState } from "react";
import clientService from "../../../../services/ClientService";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

function MovieListIsShowing() {
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
      <div>
        {movieListIsShowing && (
          <Carousel responsive={responsive}>
            {movieListIsShowing.map((movieIsShowing) => {
              return (
                <div className="movie-list-item">
                  <img
                    className="movie-list-item-img blur"
                    src={movieIsShowing.imageUrl}
                    alt=""
                  />
                  <span className="movie-list-item-title">
                    {movieIsShowing.movieName}
                  </span>
                  <Link
                    to={`/movie-detail/${movieIsShowing.movieId}`}
                    onClick={handleClick}
                  >
                    <button className="movie-list-item-button-detail">
                      Chi tiết
                    </button>
                  </Link>
                  <Link
                    to={`/showtime?movieId=${movieIsShowing.movieId}`}
                    onClick={handleClick}
                  >
                    <button className="movie-list-item-button">ĐẶT VÉ</button>
                  </Link>
                </div>
              );
            })}
          </Carousel>
        )}
      </div>
    </>
  );
}

export default MovieListIsShowing;
