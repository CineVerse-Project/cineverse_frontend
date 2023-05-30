export function handleValidationTheater(editData, errors) {
  if (editData.editTen == "" && editData.editTen.trim() == "") {
    errors.editTen = "khong duoc de trong";
  }
//   if (/^[^\u0023\u0024\u0025\u005e\u0026\u002a]+$/u.test(editData.editTen)) {
//     errors.editTen = "Ten khong chua ky tu dat biet"
//   }
  if (editData.editDiaChi == null || editData.editDiaChi == "") {
    errors.editDiaChi = "khong duoc de trong";
  }
  if (editData.editTinhThanh == ""){
    errors.editTinhThanh = "Tinh Thanh khong duoc trong"
  }

  // if(!/^[\p{L}\p{N},\s]+$/u.test(editData.editDiaChi)){
  //     errors.editDiaChi = 'Dia chi khong chua ki tu dat biet';
  // }
//   if (!/^[\p{L}\p{N},\s]+$/u.test(editData.editTen)) {
//     errors.editTen = "khong chua ki tu dat biet";
//   }
}
