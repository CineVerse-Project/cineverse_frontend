import React, { useEffect, useState } from "react";
import clientService from "../../../../services/ClientService";
import { useParams } from "react-router-dom";

function MovieaDescription() {
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
          <div>
            <h1>NỘI DUNG PHIM</h1>
          </div>
          <div className="description-detailfirm">
            <p>{movieInformation.description}</p>
            <p>
              Phim mới <a href="#">{movieInformation.movieName}</a> ra mắt tại
              các rạp chiếu phim từ ngày ({movieInformation.startDate}). Xem chi
              tiết tại: <a href="#">CineVerse</a>
            </p>
          </div>
        </>
      )}
    </>
  );
}

export default MovieaDescription;
