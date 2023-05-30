import { useState, useEffect } from "react";
import { Modal, Button, Result } from 'antd';
import axios from "axios";
import ProvinceService from "../../../../services/ProvinceService";
import TheaterService from "../../../../services/TheaterService";
import { useParams } from "react-router-dom";
import { handleValidationTheater } from "../../../../services/handleValidationTheater";

export default function EditTheater(props) {

    const [editData, setEditData] = useState({
        editTen: '',
        editDiaChi: '',
        editTinhThanh: ''
    })

    const [errors, setErrors] = useState({
        editTen: '',
        editDiaChi: '',
        editTinhThanh: '',
    })

    const {theaterId} = useParams();


     //nhan gia tri thay doi trong o input
     const handleInputChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        setEditData((preData) => ({...preData, [field]: value}));
    }

    // call api get detail
    const getTheater = () => {
        const url = `localhost:8080/api/v1/theater/` + theaterId;
        console.log(url);
        axios.get("theater/" + theaterId).then((result) => {
            setEditData({
                editTen: result.data.theaterName,
                editDiaChi: result.data.theaterAddress,
                editTinhThanh: result.data.province.provinceId,
            })
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
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        getAllProvinceAPI();
    }, []);

    //update call api 
    const handleEdit = (event) => {
        event.preventDefault();
        let errors = {};
        const data = {
            theaterId: theaterId,
            theaterName: editData.editTen,
            theaterAddress: editData.editDiaChi,
            province : {
                provinceId : editData.editTinhThanh
            },    
        }
        handleValidationTheater(editData, errors);
        if(Object.keys(errors).length === 0){
            Modal.confirm({
                title: "Bạn muốn thay đổi rạp phim?",
                okText: "Thêm",
                onOk: () => {
    
                    TheaterService.updateTheater(data,theaterId);
    
                    TheaterService.getAllTheater();
                    setErrors([])
                },
                cancelText: 'Đóng',
                onCancel: () => {
                },
    
            });
        } else {
            setErrors(errors);
        }
        
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
                            {errors.editTen && <p className="col-md-10 invalid-feedback" style={{ display: "block", color: "red"}}>{errors.editTen}</p>}
                            <div class="mb-3 row">
                                <label for="html5-text-input" class="col-md-2 col-form-label">Tên</label>
                                <div class="col-md-10">
                                    <input class="form-control" type="text" placeholder="Nhập tên rạp" id="html5-text-input"  value={editData.editTen} onChange={handleInputChange} name="editTen"/>
                                </div>
                            </div>
                            {errors.editTinhThanh && <p className="col-md-10 invalid-feedback" style={{ display: "block", color: "red"}}>{errors.editTinhThanh}</p>}
                            <div class="mb-3 row">
                                <label for="exampleFormControlSelect1" class="col-md-2 col-form-label">Tỉnh thành</label>
                                <div class="col-md-10">
                                    <select placeholder="Chọn tỉnh thành" onChange={handleInputChange} className="form-control" value={editData.editTinhThanh} name="editTinhThanh">
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
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Nhập địa chỉ" value={editData.editDiaChi} onChange={handleInputChange} name="editDiaChi"/>
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