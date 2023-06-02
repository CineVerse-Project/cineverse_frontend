export function handleValidationTheater(editData, errors) {
  if (editData.editTen == "" && editData.editTen.trim() == "") {
    errors.editTen = "khong duoc de trong";
  }
  if (editData.editDiaChi == null || editData.editDiaChi == "") {
    errors.editDiaChi = "khong duoc de trong";
  }
  if (editData.editTinhThanh == "") {
    errors.editTinhThanh = "Tinh Thanh khong duoc trong";
  }
}
