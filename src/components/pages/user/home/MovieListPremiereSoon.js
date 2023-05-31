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

function MovieListPremiereSoon() {
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
                
                    {movieListPremiereSoon && (
                        <Carousel responsive={responsive}>
                            {movieListPremiereSoon.map((moviePremiereSoon) => {
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

                                        <Link
                                            to={`/movie-detail/${moviePremiereSoon.movieId}`}
                                            onClick={handleClick}
                                        >
                                            <a className="movie-list-item-button-detail">
                                                Chi tiết
                                            </a>
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

export default MovieListPremiereSoon;
