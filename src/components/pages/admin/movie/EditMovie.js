import { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import TypeMovieService from "../../../../services/TypeMovieService";
import MovieService from "../../../../services/MovieService";
import { handleValidationMovie } from "../../../../services/handleValidationMovie";
import { storage } from "../../../../constants/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function EditMovie(props) {
  const navigate = useNavigate();
  //firebase
  const [imgUpload, setImgUpload] = useState("");

  //data luu du lieu detail
  const [editData, setEditData] = useState({
    editTenPhim: "",
    editPoster: "",
    editDienVien: "",
    editDaoDien: "",
    editPhimTruong: "",
    editLoaiPhim: "",
    editMoTa: "",
    editThoiLuong: "",
    editNgayChieu: "",
    editNgayDong: "",
    editTrailler: "",
    editStatus: "",
    editOriginPoster: "",
  });

  //usestate input errror
  const [errors, setErrors] = useState({
    editTenPhim: "",
    editPoster: "",
    editDienVien: "",
    editDaoDien: "",
    editPhimTruong: "",
    editLoaiPhim: "",
    editMoTa: "",
    editThoiLuong: "",
    editNgayChieu: "",
    editNgayDong: "",
    editTrailler: "",
    editStatus: "",
  });

  //nhan gia tri thay doi trong o input
  const handleInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    setEditData((preData) => ({ ...preData, [field]: value }));
  };

  const handleInputFile = (event) => {
    const field = event.target.name;
    const value = event.target.files[0];
    setEditData((preData) => ({ ...preData, [field]: value }));
  };

  const { movieId } = useParams();
  const getMovie = () => {
    const url = `localhost:8080/api/v1/movie/` + movieId;
    console.log(url);
    axios
      .get("movie/" + movieId)
      .then((result) => {
        setEditData({
          editTenPhim: result.data.movieName,
          editDienVien: result.data.actor,
          editDienVien: result.data.director,
          editLoaiPhim: result.data.movieType.movieTypeId,
          editPhimTruong: result.data.filmStudio,
          editMoTa: result.data.description,
          editThoiLuong: result.data.duration,
          editNgayChieu: result.data.startDate,
          editNgayDong: result.data.endDate,
          editStatus: result.data.status,
          editTrailler: result.data.trailerUrl,
          editOriginPoster: result.data.imageUrl,
        });
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getMovie();
  }, []);

  const [type, setType] = useState([]);
  useEffect(() => {
    const getAllTypeAPI = async () => {
      TypeMovieService.getAllType()
        .then((data) => {
          setType(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllTypeAPI();
  }, []);

  const handleEdit = (event) => {
    event.preventDefault();
    let errors = {};
    let tmp;
    if (editData?.editPoster !== undefined) {
      tmp = imgUpload;
    } else {
      tmp = editData?.editOriginPoster;
    }
    const data = {
      movieId: movieId,
      imageUrl: tmp,
      trailerUrl: editData.editTrailler,
      movieName: editData.editTenPhim,
      startDate: editData.editNgayChieu,
      endDate: editData.editNgayDong,
      actor: editData.editDienVien,
      description: editData.editMoTa,
      director: editData.editDaoDien,
      filmStudio: editData.editPhimTruong,
      duration: editData.editThoiLuong,
      movieType: {
        movieTypeId: editData.editLoaiPhim,
      },
      status: editData.editStatus,
    };
    handleValidationMovie(editData, errors);
    if (Object.keys(errors).length === 0) {
      Modal.confirm({
        title: "Bạn muốn thay đổi phim?",
        okText: "Thêm",
        onOk: () => {
          MovieService.updateMovie(data, movieId);
          MovieService.getAllMovie();
          setErrors([]);
          navigate("/movie");
        },
        cancelText: "Đóng",
        onCancel: () => {},
      });
    } else {
      setErrors(errors);
    }
  };

  useEffect(() => {
    if (editData.editPoster == null) {
      return;
    }
    const imgRef = ref(storage, `movie/${editData.editTenPhim + v4()}`);
    uploadBytes(imgRef, editData.editPoster).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImgUpload(url);
      });
    });
  }, [editData.editPoster]);
  return (
    <>
      <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4">
          <span class="text-muted fw-light">Phim /</span>
          Cập nhật phim
        </h4>

        <Link to="/movie" class="btn btn btn-outline-primary mb-3">
          Trở về
        </Link>

        <div class="card mb-4">
          <h5 class="card-header">Chỉnh sửa thông tin phim:</h5>
          <div class="card-body">
            <form onSubmit={handleEdit}>
              {errors.editTenPhim && (
                <p
                  className="col-md-10 invalid-feedback"
                  style={{ display: "block", color: "red" }}
                >
                  {errors.editTenPhim}
                </p>
              )}
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
                    name="editTenPhim"
                    onChange={handleInputChange}
                    value={editData.editTenPhim}
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
                    onChange={handleInputFile}
                    name="editPoster"
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
                    value={editData.editDienVien}
                    name="editDienVien"
                    onChange={handleInputChange}
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
                    value={editData.editDaoDien}
                    name="editDaoDien"
                    onChange={handleInputChange}
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
                    value={editData.editPhimTruong}
                    name="editPhimTruong"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="html5-email-input" class="col-md-2 col-form-label">
                  Loại phim:
                </label>
                <div class="col-md-10">
                  <select
                    placeholder="Chọn thể loại"
                    className="form-control"
                    value={editData.editLoaiPhim}
                    name="editLoaiPhim"
                    onChange={handleInputChange}
                  >
                    {type.map((typeItem) => (
                      <option
                        key={typeItem.movieTypeId}
                        value={typeItem.movieTypeId}
                      >
                        {typeItem.moveTypeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="html5-email-input" class="col-md-2 col-form-label">
                  Trạng thái
                </label>
                <div class="col-md-10">
                  <select
                    class="form-control"
                    value={editData.editStatus}
                    name="editStatus"
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="0">Đã Chiếu</option>
                    <option value="1">Đang chiếu</option>
                    <option value="2">Sắp chiếu</option>
                  </select>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="html5-email-input" class="col-md-2 col-form-label">
                  Mô tả:
                </label>
                <div class="col-md-10">
                  <input
                    class="form-control"
                    type="text"
                    id="html5-email-input"
                    placeholder="Nhập mô tả"
                    onChange={handleInputChange}
                    value={editData.editMoTa}
                    name="editMoTa"
                  />
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
                    onChange={handleInputChange}
                    value={editData.editThoiLuong}
                    name="editThoiLuong"
                  />
                </div>
              </div>
              {errors.editNgayChieu && (
                <p
                  className="col-md-10 invalid-feedback"
                  style={{ display: "block", color: "red" }}
                >
                  {errors.editNgayChieu}
                </p>
              )}
              <div class="mb-3 row">
                <label for="html5-date-input" class="col-md-2 col-form-label">
                  Ngày chiếu:
                </label>
                <div class="col-md-10">
                  <input
                    class="form-control"
                    type="date"
                    id="html5-date-input"
                    onChange={handleInputChange}
                    value={editData.editNgayChieu}
                    name="editNgayChieu"
                  />
                </div>
              </div>
              {errors.editNgayDong && (
                <p
                  className="col-md-10 invalid-feedback"
                  style={{ display: "block", color: "red" }}
                >
                  {errors.editNgayDong}
                </p>
              )}
              <div class="mb-3 row">
                <label for="html5-date-input" class="col-md-2 col-form-label">
                  Ngày đóng:
                </label>
                <div class="col-md-10">
                  <input
                    class="form-control"
                    type="date"
                    id="html5-date-input"
                    onChange={handleInputChange}
                    value={editData.editNgayDong}
                    name="editNgayDong"
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
                    type="text"
                    id="html5-text-input"
                    onChange={handleInputChange}
                    value={editData.editTrailler}
                    name="editTrailler"
                  />
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <Button type="primary" htmlType="submit">
                  Chỉnh sửa
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
