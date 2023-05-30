export function handleValidationMovie (editData, errors){
    if(editData.editTenPhim == "" || editData.editTenPhim == " "){
        errors.editTenPhim = 'Ten phim khong duoc de trong';
    }
    if(editData.editNgayChieu == null || editData.editNgayChieu == " "){
        errors.editNgayChieu = 'Ngay chieu khong duoc de trong';
    }
    if(editData.editNgayDong == null || editData.editNgayDong == " "){
        errors.editNgayDong = 'Ngay dong khong duoc de trong';
    }
    if((editData.editNgayChieu > editData.editNgayDong) == true){
        errors.editNgayDong = 'Ngay dong phai lon hon ngay chieu';
    }
    const currentDate = new Date().toLocaleDateString('en-CA');
    if(editData.editNgayChieu < currentDate){
        errors.editNgayChieu = 'Ngay chieu phai lon hon ngay hien tai';
    }
    if (editData.editLoaiPhim == ""){
        errors.editLoaiPhim = 'Loai phim khong duoc de trong'
    }
    // if(!/^[a-zA-Z0-9]+$/.test(editData.editDienVien)){
    //     errors.editDienVien = "Ten dien vien khong chua ki tu dac biet"
    // }
}