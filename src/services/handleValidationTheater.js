import TheaterService from "./TheaterService";

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
  if (editData.editTinhThanh == "") {
    errors.editTinhThanh = "Tinh Thanh khong duoc trong";
  }

  // const CheckTheaterName = async () => {
  //   try {
  //     const data = await TheaterService.getAllTheater();
  //     const theaterExists = data.some(
  //       (item) => item.theaterName === editData.editTen
  //     );
  //     if (theaterExists) {
  //       return "Ten rap da ton tai";
  //     }
  //     return null;
  //   } catch (error) {
  //     console.log(error);
  //     return "An error occurred while checking theater name";
  //   }
  // };

  // CheckTheaterName()
  //   .then((result) => {
  //     errors.editTen = result;
  //     console.log(errors.editTen)
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
}
