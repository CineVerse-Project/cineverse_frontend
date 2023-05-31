import { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import TheaterService from "../../../../services/TheaterService";
import RoomService from "../../../../services/RoomService";
import { handleValidationRoom } from "../../../../services/handleValidationRoom";

export default function EditRoom() {

  const [name, setName] = useState('');

  const [editData, setEditData] = useState({
    editTenPhong: '',
    editTenRap: '',
    editSoCot: '',
    editSoHang: '',
  });

  const [errors, setErrors] = useState({
    editTenPhong: '',
    editTenRap: '',
    // editSoCot: '',
    // editSoHang: '',
  })

  const { roomId } = useParams();

  //nhan gia tri thay doi trong o input
  const handleInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    setEditData((preData) => ({...preData, [field]: value}));
}

  const getRoom = () => {
    const url = `localhost:8080/api/v1/room/` + roomId;
    console.log(url);
    axios
      .get("room/" + roomId)
      .then((result) => {
        setEditData({
          editTenPhong: result.data.roomName,
          editTenRap: result.data.theater.theaterName,
          editSoCot: result.data.seatRowNumber,
          editSoHang: result.data.seatColumnNumber, 
        })
        setName(result.data.theater.theaterId)
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getRoom();
  }, []);

  // lay danh sach rap
  const [theaters, setTheaters] = useState([]);
  useEffect(() => {
    const getAllTheaterAPI = async () => {
      TheaterService.getAllTheater()
        .then((data) => {
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getAllTheaterAPI();
  }, []);

  //update call api
  const handleEdit = (event) => {
    event.preventDefault();
    let errors = {};
    const data = {
      roomId: roomId,
      seatTotal: Number(editData.editSoCot) * Number(editData.editSoHang),
      roomName: editData.editTenPhong,
      theater: {
        theaterId: name,
      },
      seatRowNumber: editData.editSoCot,
      seatColumnNumber: editData.editSoHang,
    };
    console.log(data);
    handleValidationRoom(editData, errors);
    if(Object.keys(errors).length === 0){
      Modal.confirm({
        title: "Bạn muốn thay đổi rạp phim?",
        okText: "Thêm",
        onOk: () => {
          RoomService.updateRoom(data, roomId);
  
          RoomService.getAllRoom();
          setErrors([])
        },
        cancelText: "Đóng",
        onCancel: () => {},
      });
    } else {
      setErrors(errors);
    }
    
  };

  return (
    <div class="container-xxl flex-grow-1 container-p-y">
      <h4 class="fw-bold py-3 mb-4">
        <span class="text-muted fw-light">Phòng /</span>
        Cập nhật phòng
      </h4>

      <a href="/room" class="btn btn btn-outline-primary mb-3">
        Trở về
      </a>

      <div class="card mb-4">
        <h5 class="card-header">Chỉnh sửa thông tin phòng</h5>
        <div class="card-body">
          <form onSubmit={handleEdit}>
          {errors.editTenPhong && <p className="col-md-10 invalid-feedback" style={{ display: "block", color: "red"}}>{errors.editTenPhong}</p>}
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
            <div class="mb-3 row">
              <label for="html5-email-input" class="col-md-2 col-form-label">
                Tên rạp:
              </label>
              <div class="col-md-10">
                <input
                  class="form-control"
                  type=""
                  id="html5-email-input"
                  placeholder="Nhập tên phòng chiếu"
                  value={editData.editTenRap}
                  disabled
                />
              </div>
            </div>
            {/* {errors.editSoCot && <p className="col-md-10 invalid-feedback" style={{ display: "block", color: "red"}}>{errors.editSoCot}</p>}
            {errors.editSoHang && <p className="col-md-10 invalid-feedback" style={{ display: "block", color: "red"}}>{errors.editSoHang}</p>} */}

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
                  disabled
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
                  disabled
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
  );
}
