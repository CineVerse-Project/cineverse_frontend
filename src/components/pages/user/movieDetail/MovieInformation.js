import React, { useEffect, useState } from "react";
import clientService from "../../../../services/ClientService";
import { useParams } from "react-router-dom";

function MovieInformation() {
  const [movieInformation, setMovieInformation] = useState();
  const { movieId } = useParams();
  console.log(movieId);
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
  }, []);

  return (
    <>
      {movieInformation && (
        <>
          <div className="movie-link-display">
            <a href="#">Trang chủ</a>
            <span>|</span>
            <a href="#">Đặt vé</a>
            <span>|</span>
            <a href="#">{movieInformation.movieName}</a>
          </div>
          <div className="movie-list-wrapper">
            <div className="movie-list">
              <div className="movie-list-item">
                <img
                  className="movie-list-item-img-detailfirm"
                  src={movieInformation.imageUrl}
                  alt
                />
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
                    <span>{movieInformation.duration} Phút</span>
                  </div>
                </div>
                <div>
                  <div className="movie-list-item-detail-info">
                    <label>Thể loại: </label>
                    <span>
                      <a>{movieInformation.movieType.moveTypeName}</a>
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
