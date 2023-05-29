import { useState, useEffect } from "react";
import { Modal, Button } from 'antd';
import axios from "axios";
import RoomService from "../../../../services/RoomService";
import TheaterService from "../../../../services/TheaterService";
import { number } from "yup";

export default function CreateRoom() {


    //nhan gia tri input
    const [inputTenPhong, setInputTenPhong] = useState('');
    const [inputTenRap, setInputTenRap] = useState('');
    const [inputSoHang, setInputSoHang] = useState('');
    const [inputSoCot, setInputSoCot] = useState('');

    //nhan gia tri select option
    const handleChangeSeleted = (value) => {
        setInputTenRap(value.target.value);
    
    }

    //create room
    const handleCreate = (event) => {
        event.preventDefault();
    
        const data = {
            seatTotal: Number(inputSoCot) * Number(inputSoHang) ,
            roomName: inputTenPhong,
            seatRowNumber: inputSoHang,
            seatColumnNumber: inputSoCot,
            theater: {
                theaterId: inputTenRap,
            },
        }
        console.log(data);

        const url = ``;
        Modal.confirm({
            title: "Bạn muốn thêm mới phòng phim?",
            okText: "Thêm",
            onOk: () => {
                RoomService.createRoom(data);
                setInputTenRap('');
                setInputTenPhong('');
                setInputSoHang('');
                setInputSoCot('');
            },
            cancelText: 'Đóng',
            onCancel: () => {
            },

        });
    }

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

    return (
        <>
            <div class="container-xxl flex-grow-1 container-p-y">
                <h4 class="fw-bold py-3 mb-4">
                    <span class="text-muted fw-light">Phòng /</span>
                    Thêm phòng
                </h4>

                <a href="/room" class="btn btn btn-outline-primary mb-3">Trở về</a>
                <div class="card mb-4">
                    <form onSubmit={handleCreate}>
                        <h5 class="card-header">Thêm mới phòng</h5>
                        <div class="card-body">
                            <div class="mb-3 row">
                                <label for="html5-email-input" class="col-md-2 col-form-label">Tên phòng:</label>
                                <div class="col-md-10">
                                    <input class="form-control" type="text" id="html5-email-input" placeholder="Nhập tên phòng chiếu" value={inputTenPhong} onChange={(e) => setInputTenPhong(e.target.value)} />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="html5-email-input" class="col-md-2 col-form-label">Tên rạp:
                                </label>
                                <div class="col-md-10">
                                    <select class="form-control" placeholder="Chọn tên rạp" onChange={handleChangeSeleted} value={inputTenRap}>
                                        {theater.map((theaterItem) => (

                                            <option key={theaterItem.theaterId} value={theaterItem.theaterId}>
                                                {theaterItem.theaterName}
                                            </option>))}
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 row d-flex align-items-center">
                                <label for="html5-email-input" class="col-md-2 col-form-label">Layout:
                                </label>

                                <div class="col-md-2">
                                    <input class="form-control" type="text" id="html5-email-input" placeholder="Nhập số hàng" value={inputSoHang} onChange={(e) => setInputSoHang(e.target.value)} />
                                </div>
                                x
                                <div class="col-md-2">
                                    <input class="form-control" type="text" id="html5-email-input" placeholder="Nhập số cột" value={inputSoCot} onChange={(e) => setInputSoCot(e.target.value)} />
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
    )
}