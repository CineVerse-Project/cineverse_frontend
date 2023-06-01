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

function MovieListTop10IsShowing() {
    const handleClick = () => {
        window.scrollTo(0, 0); // Di chuyển trang web đến đầu trang
    };
    const [movieListTop10IsShowing, setMovieListTop10IsShowing] = useState();

    useEffect(() => {
        const getAllMovieListTop10IsShowingAPI = () => {
            clientService
                .getTop10MovieIsShowing()
                .then((data) => {
                    setMovieListTop10IsShowing(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getAllMovieListTop10IsShowingAPI();
    }, []);

    return (
        <>
            <h1 className="movie-list-title">PHIM TOP</h1>
            <div className="movie-list-wrapper">
                {movieListTop10IsShowing && (
                    <Carousel responsive={responsive}>
                        {movieListTop10IsShowing.map((movieTop10IsShowing) => {
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

                                    <Link
                                        to={`/movie-detail/${movieTop10IsShowing.movieId}`}
                                        onClick={handleClick}
                                    >
                                        <button className="movie-list-item-button-detail">
                                            Chi tiết
                                        </button>
                                    </Link>

                                    <Link
                                        to={`/showtime?movieId=${movieTop10IsShowing.movieId}`}
                                        onClick={handleClick}
                                    >
                                        <button className="movie-list-item-button">
                                            ĐẶT VÉ
                                        </button>
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

export default MovieListTop10IsShowing;
