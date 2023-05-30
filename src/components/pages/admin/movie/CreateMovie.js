import { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import axios from "axios";
import TypeMovieService from "../../../../services/TypeMovieService";
import MovieService from "../../../../services/MovieService";

export default function CreateMovie() {

    //nhan gia tri input
    const [inputTenPhim, setInputTenPhim] = useState("");
    const [inputPoster, setInputPoster] = useState("");
    const [inputDienVien, setInputDienVien] = useState("");
    const [inputDaoDien, setInputDaoDien] = useState("");
    const [inputPhimTruong, setInputPhimTruong] = useState("");
    const [inputLoaiPhim, setInputLoaiPhim] = useState("");
    const [inputMoTa, setInputMoTa] = useState("");
    const [inputThoiLuong, setInputThoiLuong] = useState("");
    const [inputNgayChieu, setInputNgayChieu] = useState("");
    const [inputNgayDong, setInputNgayDong] = useState("");
    const [inputTrailler, setInputTrailler] = useState("");


    //nhan gia tri select option
    const handleChangeSeleted = (value) => {
        setInputLoaiPhim(value.target.value);
    };

    //create movie
    const handleCreate = (event) => {
        event.preventDefault();
        const data = {
            movieName: inputTenPhim,
            imageUrl: inputPoster,
            actor: inputDienVien,
            director: inputDaoDien,
            filmStudio: inputPhimTruong,
            movieType: {
                movieTypeId: inputLoaiPhim,
            },
            description: inputMoTa,
            duration: inputThoiLuong,
            startDate: inputNgayChieu,
            endDate: inputNgayDong,
            trailerUrl: inputTrailler,
        };
        const url = ``;
        Modal.confirm({
            title: "Bạn muốn thêm mới phim?",
            okText: "Thêm",
            onOk: () => {
                MovieService.createMovie(data);
                setInputTenPhim("");
                setInputPoster("");
                setInputDienVien("");
                setInputDaoDien("");
                setInputPhimTruong("");
                setInputLoaiPhim("");
                setInputMoTa("");
                setInputThoiLuong("");
                setInputNgayChieu("");
                setInputNgayDong("");
                setInputTrailler("");
            },
            cancelText: "Đóng",
            onCancel: () => { },
        });
    };

    //lay danh sach movie
    const [typeMovies, setTypeMovies] = useState([]);
    useEffect(() => {
        const getAllTypeAPI = async () => {
            TypeMovieService.getAllType()
                .then((data) => {
                    setTypeMovies(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        getAllTypeAPI();
    }, []);

    return (
        <>
            <div class="container-xxl flex-grow-1 container-p-y">
                <h4 class="fw-bold py-3 mb-4">
                    <span class="text-muted fw-light">Phim /</span>
                    Thêm phim
                </h4>

                <a href="/movie" class="btn btn btn-outline-primary mb-3">
                    Trở về
                </a>

                <div class="card mb-4">
                    <h5 class="card-header">Thêm mới phim</h5>
                    <div class="card-body">
                        <form onSubmit={handleCreate}>
                            <div class="mb-3 row">
                                <label for="html5-text-input" class="col-md-2 col-form-label">
                                    Tên phim:
                                </label>
                                <div class="col-md-10">
                                    <input
                                        class="form-control"
                                        type="text"
                                        id="html5-text-input"
                                        placeholder="Nhập tên phim"
                                        value={inputTenPhim}
                                        onChange={(e) => setInputTenPhim(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="formFile" class="col-md-2 col-form-label">
                                    Poster:
                                </label>
                                <div class="col-md-10">
                                    <input
                                        class="form-control"
                                        type="file"
                                        id="formFile"
                                        value={inputPoster}
                                        onChange={(e) => setInputPoster(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="html5-search-input" class="col-md-2 col-form-label">
                                    Danh sách diễn viên:
                                </label>
                                <div class="col-md-10">
                                    <input
                                        class="form-control"
                                        type="text"
                                        id="html5-search-input"
                                        placeholder="Nhập tên diễn viên"
                                        value={inputDienVien}
                                        onChange={(e) => setInputDienVien(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="html5-email-input" class="col-md-2 col-form-label">
                                    Đạo diễn:
                                </label>
                                <div class="col-md-10">
                                    <input
                                        class="form-control"
                                        type="text"
                                        id="html5-email-input"
                                        placeholder="Nhập tên đạo diễn"
                                        value={inputDaoDien}
                                        onChange={(e) => setInputDaoDien(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="html5-email-input" class="col-md-2 col-form-label">
                                    Phim trường:
                                </label>
                                <div class="col-md-10">
                                    <input
                                        class="form-control"
                                        type="text"
                                        id="html5-email-input"
                                        placeholder="Nhập tên phim trường"
                                        value={inputPhimTruong}
                                        onChange={(e) => setInputPhimTruong(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="html5-email-input" class="col-md-2 col-form-label">
                                    Loại phim:
                                </label>
                                <div class="col-md-10">
                                    <select
                                        class="form-control"
                                        value={inputLoaiPhim}
                                        onChange={handleChangeSeleted}
                                    >
                                        {typeMovies.map((typeMovie) => (
                                            <option
                                                key={typeMovie.movieTypeId}
                                                value={typeMovie.movieTypeId}
                                            >
                                                {typeMovie.moveTypeName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="html5-email-input" class="col-md-2 col-form-label">
                                    Mô tả:
                                </label>
                                <div class="col-md-10">
                                    <textarea
                                        class="form-control"
                                        type="text"
                                        id="html5-email-input"
                                        placeholder="Nhập mô tả"
                                        value={inputMoTa}
                                        onChange={(e) => setInputMoTa(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="html5-email-input" class="col-md-2 col-form-label">
                                    Thời lượng:
                                </label>
                                <div class="col-md-10">
                                    <input
                                        class="form-control"
                                        type="text"
                                        id="html5-email-input"
                                        placeholder="Nhập thời lượng"
                                        value={inputThoiLuong}
                                        onChange={(e) => setInputThoiLuong(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="html5-date-input" class="col-md-2 col-form-label">
                                    Ngày chiếu:
                                </label>
                                <div class="col-md-10">
                                    <input
                                        class="form-control"
                                        type="date"
                                        id="html5-date-input"
                                        value={inputNgayChieu}
                                        onChange={(e) => setInputNgayChieu(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="html5-date-input" class="col-md-2 col-form-label">
                                    Ngày đóng:
                                </label>
                                <div class="col-md-10">
                                    <input
                                        class="form-control"
                                        type="date"
                                        id="html5-date-input"
                                        value={inputNgayDong}
                                        onChange={(e) => setInputNgayDong(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="formFile" class="col-md-2 col-form-label">
                                    Trailer:
                                </label>
                                <div class="col-md-10">
                                    <input
                                        class="form-control"
                                        placeholder="Nhập url video trailer"
                                        type="text"
                                        id="formFile"
                                        value={inputTrailler}
                                        onChange={(e) => setInputTrailler(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <Button type="primary" htmlType="submit">
                                    Thêm mới
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
