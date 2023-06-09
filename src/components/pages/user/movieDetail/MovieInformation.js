import React, { useEffect, useState } from "react";
import clientService from "../../../../services/ClientService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function MovieInformation() {
    const [movieInformation, setMovieInformation] = useState();
    const param = useParams();
    const [movieId, setMovieId] = useState();

    const handleClick = () => {
        window.scrollTo(0, 0); // Di chuyển trang web đến đầu trang
    };

    useEffect(() => {
        const { movieId } = param;
        setMovieId(movieId);
    }, [param]);

    useEffect(() => {
        const getMovieInformation = () => {
            clientService
                .getMovieDetailById(movieId)
                .then((data) => {
                    console.log(data);
                    setMovieInformation(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getMovieInformation();
    }, [movieId]);

    return (
        <>
            {movieInformation && (
                <>
                    <div className="movie-link-display">
                        <Link to="/" onClick={handleClick}>
                            Trang chủ
                        </Link>
                        <span>|</span>
                        <a>Đặt vé</a>
                        <span>|</span>
                        <Link
                            to={`/movie-detail/${movieInformation.movieId}`}
                            onClick={handleClick}
                        >
                            <a>{movieInformation.movieName}</a>
                        </Link>
                    </div>
                    <div className="movie-list-wrapper">
                        <div className="movie-list">
                            <div className="movie-list-item">
                                <div className="box-poster">
                                    <img
                                        className="movie-list-item-img-detailfirm"
                                        src={movieInformation.imageUrl}
                                        alt
                                    />
                                    <Link
                                        to={`/showtime?movieId=${movieInformation.movieId}`}
                                    >
                                        <button className="btn-booking">
                                            Đặt vé
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="movie-list-item-detail">
                                <div className="movie-list-item-detail-title">
                                    <h1>{movieInformation.movieName}</h1>
                                </div>
                                <div className="movie-list-item-detail-review">
                                    <div className="movie-list-item-detail-star">
                                        <i className="fas fa-star" />
                                        <span className="box-star">8.5</span>
                                    </div>
                                    <div className="movie-list-item-detail-star">
                                        <span className="box-old">18+</span>
                                    </div>
                                    <div className="movie-list-item-detail-star">
                                        <i className="fas fa-clock" />
                                        <span>
                                            {movieInformation.duration} Phút
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div className="movie-list-item-detail-info">
                                        <label>Thể loại: </label>
                                        <span>
                                            <a>
                                                {
                                                    movieInformation.movieType
                                                        .moveTypeName
                                                }
                                            </a>
                                        </span>
                                    </div>
                                    <div className="movie-list-item-detail-info">
                                        <label>Đạo diễn: </label>
                                        <span>
                                            <a>{movieInformation.director}</a>
                                        </span>
                                    </div>
                                    <div className="movie-list-item-detail-info">
                                        <label>Diễn viên: </label>
                                        <span>
                                            <a>{movieInformation.actor}</a>
                                        </span>
                                    </div>
                                    <div className="movie-list-item-detail-info">
                                        <label>Quốc gia: </label>
                                        <span>
                                            <a>Việt Nam</a>
                                        </span>
                                    </div>
                                    <div className="movie-list-item-detail-info">
                                        <label>Ngày khởi chiếu: </label>
                                        <span>
                                            <a>{movieInformation.startDate}</a>
                                        </span>
                                    </div>
                                    <div className="movie-list-item-detail-info">
                                        <label>Nhà sản xuất: </label>
                                        <span>
                                            <a>{movieInformation.filmStudio}</a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="movie-list-item-detail">
                                <div className="movie-list-item-detail-trailler">
                                    <iframe
                                        width={490}
                                        height={400}
                                        src={movieInformation.trailerUrl}
                                        title="YouTube video player"
                                        frameBorder={0}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default MovieInformation;
