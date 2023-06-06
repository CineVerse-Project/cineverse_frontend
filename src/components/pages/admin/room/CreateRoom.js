import { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import axios from "axios";
import RoomService from "../../../../services/RoomService";
import TheaterService from "../../../../services/TheaterService";
import { number } from "yup";
import { handleValidationRoom } from "../../../../services/handleValidationRoom";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function CreateRoom() {
  const [roomTmp, setRoomTmp] = useState([]);
  const navigate = useNavigate();
  const [editData, setEditData] = useState({
    editTenPhong: "",
    editTenRap: "",
    editSoCot: "",
    editSoHang: "",
  });

  const [errors, setError] = useState({
    editTenPhong: "",
    editTenRap: "",
    editSoCot: "",
    editSoHang: "",
  });

  const handleInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    setEditData((preData) => ({ ...preData, [field]: value }));
  };

  //create room
  const handleCreate = (event) => {
    event.preventDefault();
    let errors = [];
    const data = {
      seatTotal: Number(editData.editSoCot) * Number(editData.editSoHang),
      roomName: editData.editTenPhong,
      seatRowNumber: editData.editSoHang,
      seatColumnNumber: editData.editSoCot,
      theater: {
        theaterId: editData.editTenRap,
      },
    };
    for (let index = 0; index < roomTmp.length; index++) {
      if (roomTmp[index].theater.theaterId === editData.editTenRap) {
        if (roomTmp[index].roomName === editData.editTenPhong) {
          errors.editTenPhong='Rạp đã có phòng này';
          console.log(errors.editTenPhong);
        }
      }
      
    }
    handleValidationRoom(editData, errors);
    if (Object.keys(errors).length === 0) {
      Modal.confirm({
        title: "Bạn muốn thêm mới phòng phim?",
        okText: "Thêm",
        onOk: () => {
          RoomService.createRoom(data);
          setEditData("");
          setError([]);
          RoomService.getAllRoom();
          navigate("/room");
        },
        cancelText: "Đóng",
        onCancel: () => {},
      });
    } else {
      setError(errors);
    }
  };

  //lay danh sach rap
  const [theater, setTheater] = useState([]);
  useEffect(() => {
    const getAllTheaterAPI = async () => {
      TheaterService.getAllTheater()
        .then((data) => {
          setTheater(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllTheaterAPI();
  }, []);

  useEffect(() => {
    const getAllRoomAPI = async () => {
      RoomService.getAllRoom()
        .then((data) => {
          setRoomTmp(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllRoomAPI();
  }, []);

  return (
    <>
      <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4">
          <span class="text-muted fw-light">Phòng /</span>
          Thêm phòng
        </h4>

        <Link to="/room" class="btn btn btn-outline-primary mb-3">
          Trở về
        </Link>
        <div class="card mb-4">
          <form onSubmit={handleCreate}>
            <h5 class="card-header">Thêm mới phòng</h5>
            <div class="card-body">
              {errors.editTenPhong && (
                <p
                  className="col-md-10 invalid-feedback"
                  style={{ display: "block", color: "red" }}
                >
                  {errors.editTenPhong}
                </p>
              )}

              <div class="mb-3 row">
                <label for="html5-email-input" class="col-md-2 col-form-label">
                  Tên phòng:
                </label>
                <div class="col-md-10">
                  <input
                    class="form-control"
                    type="text"
                    id="html5-email-input"
                    placeholder="Nhập tên phòng chiếu"
                    value={editData.editTenPhong}
                    onChange={handleInputChange}
                    name="editTenPhong"
                  />
                </div>
              </div>
              {errors.editTenRap && (
                <p
                  className="col-md-10 invalid-feedback"
                  style={{ display: "block", color: "red" }}
                >
                  {errors.editTenRap}
                </p>
              )}
              <div class="mb-3 row">
                <label for="html5-email-input" class="col-md-2 col-form-label">
                  Tên rạp:
                </label>
                <div class="col-md-10">
                  {/* <select class="form-control" placeholder="Chọn tên rạp" onChange={handleChangeSeleted} value={inputTenRap}>
                                        {theater.map((theaterItem) =>  (

                                            <option key={theaterItem.theaterId} value={theaterItem.theaterId}>
                                                {theaterItem.theaterName}
                                            </option>))}
                                    </select> */}
                  <select
                    placeholder="Chọn tỉnh thành"
                    onChange={handleInputChange}
                    className="form-control"
                    value={editData.editTenRap}
                    name="editTenRap"
                  >
                    <option value="">Chon rạp</option>
                    {theater.map((theaterItem) => (
                      <option
                        key={theaterItem.theaterId}
                        value={theaterItem.theaterId}
                      >
                        {theaterItem.theaterName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {errors.editSoCot && (
                <p
                  className="col-md-10 invalid-feedback"
                  style={{ display: "block", color: "red" }}
                >
                  {errors.editSoCot}
                </p>
              )}
              {errors.editSoHang && (
                <p
                  className="col-md-10 invalid-feedback"
                  style={{ display: "block", color: "red" }}
                >
                  {errors.editSoHang}
                </p>
              )}
              <div class="mb-3 row d-flex align-items-center">
                <label for="html5-email-input" class="col-md-2 col-form-label">
                  Layout:
                </label>
                <div class="col-md-2">
                  <input
                    class="form-control"
                    type="text"
                    id="html5-email-input"
                    placeholder="Nhập số hàng"
                    value={editData.editSoHang}
                    onChange={handleInputChange}
                    name="editSoHang"
                  />
                </div>
                x
                <div class="col-md-2">
                  <input
                    class="form-control"
                    type="text"
                    id="html5-email-input"
                    placeholder="Nhập số cột"
                    value={editData.editSoCot}
                    onChange={handleInputChange}
                    name="editSoCot"
                  />
                </div>
              </div>

              <div class="d-flex justify-content-center">
                <Button type="primary" htmlType="submit">
                  Thêm mới
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
