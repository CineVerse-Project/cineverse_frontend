import { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import TheaterService from "../../../../services/TheaterService";
import RoomService from "../../../../services/RoomService";

export default function EditRoom() {
  //nhan gia tri input
  const [editTenPhong, setEditTenPhong] = useState("");
  const [editTenRap, setEditTenRap] = useState("");
  const [editSoHang, setEditSoHang] = useState("");
  const [editSoCot, setEditSoCot] = useState("");
  const { roomId } = useParams();

  const handleChangeSelected = (value) => {
    setEditTenRap(value.target.value);
  };

  const getRoom = () => {
    const url = `localhost:8080/api/v1/room/` + roomId;
    console.log(url);
    axios
      .get("room/" + roomId)
      .then((result) => {
        setEditTenPhong(result.data.roomName);
        setEditTenRap(result.data.theater.theaterName);
        setEditSoHang(result.data.seatRowNumber);
        setEditSoCot(result.data.seatColumnNumber);
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
          setTheaters(data);
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
    const data = {
        roomId: roomId,
        seatTotal: Number(editSoCot) * Number(editSoHang),
        roomName: editTenPhong,
        theater : {
            theaterId : editTenRap
        },    
        seatRowNumber: editSoHang,
        seatColumnNumber: editSoCot,
    }

    console.log(data)


    Modal.confirm({
        title: "Bạn muốn thay đổi rạp phim?",
        okText: "Thêm",
        onOk: () => {

            RoomService.updateRoom(data,roomId);

            RoomService.getAllRoom();
        },
        cancelText: 'Đóng',
        onCancel: () => {
        },

    });
}

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
                  value={editTenPhong}
                  onChange={(e) => setEditTenPhong(e.target.value)}
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="html5-email-input" class="col-md-2 col-form-label">
                Tên rạp:
              </label>
              <div class="col-md-10">
                <select
                  class="form-control"
                  onChange={handleChangeSelected}
                  value={editTenRap}
                >
                  {theaters.map((theater) => (
                    <option key={theater.theaterId} value={theater.theaterId}>
                      {theater.theaterName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
                  value={editSoHang}
                  onChange={(e) => setEditSoHang(e.target.value)}
                />
              </div>
              x
              <div class="col-md-2">
                <input
                  class="form-control"
                  type="text"
                  id="html5-email-input"
                  placeholder="Nhập số cột"
                  value={editSoCot}
                  onChange={(e) => setEditSoCot(e.target.value)}
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
