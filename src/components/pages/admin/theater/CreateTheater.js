import { useState, useEffect } from "react";
import { Modal, Button } from 'antd';
import axios from "axios";
import TheaterService from "../../../../services/TheaterService";
import ProvinceService from "../../../../services/ProvinceService";
import { date } from "yup";
import { handleValidationTheater } from "../../../../services/handleValidationTheater";

export default function CreateTheater() {

    //UseState nhan gia tri input
    const [editData, setEditData] = useState({
        editTen: '',
        editTinhThanh: '',
        editDiaChi: '',
    });

    const [errors, setError] = useState({
        editTen: '',
        editTinhThanh: '',
        editDiaChi: '',
    })

    const handleInputChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        setEditData((preData) => ({...preData, [field]: value}));
    }

    //create theater
    const handleCreate = (event) => {
        event.preventDefault();
        let errors = [];
        const data = {
            theaterName: editData.editTen,
            province : {
                provinceId : editData.editTinhThanh
            },
            theaterAddress: editData.editDiaChi,
        }
        console.log(data);
        handleValidationTheater(editData, errors);
        if(Object.keys(errors).length === 0){
            Modal.confirm({
                title: "Bạn muốn thêm mới rạp phim?",
                okText: "Thêm",
                onOk: () => {
                    TheaterService.createTheater(data);
                    TheaterService.getAllTheater();
                    setEditData([]);
                    setError([])
                },
                cancelText: 'Đóng',
                onCancel: () => {
                },
    
            });
        } else {
            setError(errors);
        }
        console.log(errors);
       
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
                            {errors.editTen && <p className="col-md-10 invalid-feedback" style={{ display: "block", color: "red"}}>{errors.editTen}</p>}
                            <div class="mb-3 row">
                                <label for="html5-text-input" class="col-md-2 col-form-label">Tên</label>
                                <div class="col-md-10">
                                    <input class="form-control" type="text" placeholder="Nhập tên rạp" id="html5-text-input" value={editData.editTen} onChange={handleInputChange} name="editTen" />
                                </div>
                            </div>
                            {errors.editTinhThanh && <p className="col-md-10 invalid-feedback" style={{ display: "block", color: "red"}}>{errors.editTinhThanh}</p>}
                            <div class="mb-3 row">
                                <label for="exampleFormControlSelect1" class="col-md-2 col-form-label">Tỉnh thành</label>
                                <div class="col-md-10">
                                    <select placeholder="Chọn tỉnh thành" onChange={handleInputChange} className="form-control" value={editData.editTinhThanh} name="editTinhThanh">
                                        <option value="">Chọn tỉnh thành</option>
                                        {provinces.map((provinceItem) => (

                                            <option key={provinceItem.provinceId} value={provinceItem.provinceId}>
                                                {provinceItem.provinceName}
                                            </option>))}
                                    </select>
                                </div>
                            </div>
                            {errors.editDiaChi && <p className="col-md-10 invalid-feedback" style={{ display: "block", color: "red"}}>{errors.editDiaChi}</p>}
                            <div class="mb-3 row">
                                <label for="exampleFormControlTextarea1" class="col-md-2 col-form-label">Địa chỉ</label>
                                <div class="col-md-10">
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Nhập địa chỉ" value={editData.editDiaChi} onChange={handleInputChange} name="editDiaChi" />
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