import { useState, useEffect } from "react";
import { Modal, Button } from 'antd';
import axios from "axios";
import TheaterService from "../../../../services/TheaterService";
import ProvinceService from "../../../../services/ProvinceService";
import { date } from "yup";

export default function CreateTheater() {

    //UseState nhan gia tri input
    const [inputTen, setInputTen] = useState('');
    const [inputTinhThanh, setInputTinhThanh] = useState('');
    const [inputDiaChi, setInputDiaChi] = useState('');
    

    //get value khi click select
    const handleChangeSelected = (value) => {
        setInputTinhThanh(value.target.value);
    }

    //create theater
    const handleCreate = (event) => {
        event.preventDefault();
        const data = {
            theaterName: inputTen,
            province : {
                provinceId : inputTinhThanh
            },
            theaterAddress: inputDiaChi,
        }
        console.log(data);

        Modal.confirm({
            title: "Bạn muốn thêm mới rạp phim?",
            okText: "Thêm",
            onOk: () => {
                TheaterService.createTheater(data);
                setInputTen('');
                setInputTinhThanh('');
                setInputDiaChi('');
                TheaterService.getAllTheater();
            },
            cancelText: 'Đóng',
            onCancel: () => {
            },

        });
    }

    //get list tinh thanh
    const [provinces, setProvince] = useState([]);
    useEffect(() => {
        const getAllProvinceAPI = async () => {
            ProvinceService.getAllProvince()
                .then((data) => {
                    setProvince(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        getAllProvinceAPI();
    }, []);

    return (
        <>
            <div class="container-xxl flex-grow-1 container-p-y">
                <h4 class="fw-bold py-3 mb-4">
                    <span class="text-muted fw-light">Rạp /</span>
                    Thêm rạp
                </h4>

                <a href="/theater" class="btn btn btn-outline-primary mb-3">Trở về</a>

                <div class="card mb-4">
                    <h5 class="card-header">Rạp</h5>
                    <div class="card-body">
                        <form
                            onSubmit={handleCreate}
                        >
                            <div class="mb-3 row">
                                <label for="html5-text-input" class="col-md-2 col-form-label">Tên</label>
                                <div class="col-md-10">
                                    <input class="form-control" type="text" placeholder="Nhập tên rạp" id="html5-text-input" value={inputTen} onChange={(e) => setInputTen(e.target.value)} />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="exampleFormControlSelect1" class="col-md-2 col-form-label">Tỉnh thành</label>
                                <div class="col-md-10">
                                    <select placeholder="Chọn tỉnh thành" onChange={handleChangeSelected} className="form-control" value={inputTinhThanh}>
                                        {provinces.map((provinceItem) => (

                                            <option key={provinceItem.provinceId} value={provinceItem.provinceId}>
                                                {provinceItem.provinceName}
                                            </option>))}
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="exampleFormControlTextarea1" class="col-md-2 col-form-label">Địa chỉ</label>
                                <div class="col-md-10">
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Nhập địa chỉ" value={inputDiaChi} onChange={(e) => setInputDiaChi(e.target.value)} />
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
    )
}