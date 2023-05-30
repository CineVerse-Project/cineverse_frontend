export function handleValidationRoom (editData, errors){
    if(editData.editTenPhong == "" || editData.editTenPhong == " "){
        errors.editTenPhong = 'Ten phong khong duoc de trong';
    }
    if(!/^[\p{L}\p{N},\s]+$/u.test(editData.editTenPhong)){
        errors.editTenPhong = 'Ten khong chua ki tu dat biet';
    }
    if(!/^\d+$/.test(editData.editSoCot)){
        errors.editSoCot = 'So cot phai la so';
    }
    if(!/^\d+$/.test(editData.editSoHang)){
        errors.editSoHang = 'So hang phai la so';
    }
    if(editData.editTenRap == ""){
        errors.editTenRap = "Ten rap khong duoc de trong"
    }
}