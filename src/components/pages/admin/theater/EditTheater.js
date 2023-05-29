import { useState, useEffect } from "react";
import { Modal, Button, Result } from 'antd';
import axios from "axios";
import ProvinceService from "../../../../services/ProvinceService";
import TheaterService from "../../../../services/TheaterService";
import { useParams } from "react-router-dom";
export default function EditTheater(props) {


    //nhan gia tri input
    const [editTen, setEditTen] = useState('');
    const [editDiaChi, setEditDiaChi] = useState('');
    const [editTinhThanh, setEditTinhThanh] = useState('')
    const {theaterId} = useParams();


    //nhan gia tri khi select option
    const handleChangeSelected = (value) => {
        //console.log(value.target.value)
         setEditTinhThanh(value.target.value);
    }

    // call api get detail
    const getTheater = () => {
        const url = `localhost:8080/api/v1/theater/` + theaterId;
        console.log(url);
        axios.get("theater/" + theaterId).then((result) => {
            setEditTen(result.data.theaterName);
            setEditDiaChi(result.data.theaterAddress);
            setEditTinhThanh(result.data.province.provinceName);
        }).catch((error) => {

        })
    }

    useEffect (() => {
        getTheater();
    }, []);


    // lay danh sach tinh thanh 
    const [provinces, setProvince] = useState([]);
    useEffect(() => {
        const getAllProvinceAPI = async () => {
            ProvinceService.getAllProvince()
                .then((data) => {
                    setProvince(data);
                    setEditTen(data.theaterName);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        getAllProvinceAPI();
    }, []);

    // const [inputTen, setInputTen] = useState('');
    // const [inputTinhThanh, setInputTinhThanh] = useState('');
    // const [inputDiaChi, setInputDiaChi] = useState('');


    //update call api 
    const handleEdit = (event) => {
        event.preventDefault();
        console.log(editTinhThanh)
        const data = {
            theaterId: theaterId,
            theaterName: editTen,
            theaterAddress: editDiaChi,
            province : {
                provinceId : editTinhThanh
            },    
        }

        console.log(data)


        Modal.confirm({
            title: "Bạn muốn thay đổi rạp phim?",
            okText: "Thêm",
            onOk: () => {

                TheaterService.updateTheater(data,theaterId);

                TheaterService.getAllTheater();
            },
            cancelText: 'Đóng',
            onCancel: () => {
            },

        });
    }

    return (
        <>
            <div class="container-xxl flex-grow-1 container-p-y">
                <h4 class="fw-bold py-3 mb-4">
                    <span class="text-muted fw-light">Rạp /</span>
                    Cập nhật rạp
                </h4>

                <a href="/theater" class="btn btn btn-outline-primary mb-3">Trở về</a>

                <div class="card mb-4">
                    <h5 class="card-header">
                        Chỉnh sửa thông tin Rạp
                    </h5>
                    <div class="card-body">
                        <form
                            onSubmit={handleEdit}
                        >
                            <div class="mb-3 row">
                                <label for="html5-text-input" class="col-md-2 col-form-label">Tên</label>
                                <div class="col-md-10">
                                    <input class="form-control" type="text" placeholder="Nhập tên rạp" id="html5-text-input"  value={editTen} onChange={(e) => setEditTen(e.target.value)}/>
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="exampleFormControlSelect1" class="col-md-2 col-form-label">Tỉnh thành</label>
                                <div class="col-md-10">
                                    <select placeholder="Chọn tỉnh thành" onChange={handleChangeSelected} className="form-control" value={editTinhThanh}>
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
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Nhập địa chỉ" value={editDiaChi} onChange={(e) => setEditDiaChi(e.target.value)}/>
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
    )
}