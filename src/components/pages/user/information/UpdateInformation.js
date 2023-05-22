const UpdateInformation = () => {
    return (
        <div>

            <div class="mx-auto mt-4" >
                <h5 class="text-uppercase text-center p-2 text-white" style={{ backgroundColor: '#c23b1a' }}>Cập nhật thông tin</h5>
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label htmlFor="" class="form-label">Họ tên</label>
                            <input type="text" name="" id="" class="input-red" value="Nguyễn Văn A" />
                        </div>
                        <div class="form-group">
                            <label htmlFor="gender" class="form-label">Giới tính</label>
                            <div>
                                <input type="radio" name="gender" id="" checked />Nam
                                <input type="radio" name="gender" id="" />Nữ
                            </div>

                        </div>
                        <div class="form-group">
                            <label htmlFor="" class="form-label">Ngày sinh</label>
                            <input type="text" name="" id="" class="input-red" value="01-01-2000" />
                        </div>
                        <div class="form-group">
                            <label htmlFor="" class="form-label">Số điện thoại</label>
                            <input type="text" name="" id="" class="input-red" value="0123456789" />
                        </div>
                        <div class="form-group">
                            <label htmlFor="" class="form-label">Email</label>
                            <input type="text" name="" id="" class="input-red" value="nguyenvana@gmail.com" disabled />
                        </div>
                        <div class="form-group">
                            <label htmlFor="" class="form-label">Địa chỉ</label>
                            <input name="" id="" class="input-red" value="TP. ĐÀ NẴNG" />

                        </div>
                        <div class="form-group">
                            <label htmlFor="" class="form-label">Mật khẩu</label>
                            <div class="icons">
                                <input type="password" class="input-red input-with-icon" placeholder="Nhập mật khẩu" id="password" />
                                <i class="fas fa-eye-slash icon" id="show_hide_password-icon" style={{ cursor: 'pointer', padding: '12px 12px' }} ></i>
                            </div>
                        </div>

                    </div>
                    <div class="col-6">
                        <p class="text-center text-uppercase">Hình ảnh</p>
                        <hr />
                        <div class="border w-75 mx-auto">
                            <img src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" class="w-100" />
                        </div>
                        <label htmlFor="image_input" class="btn-red mt-4 d-block w-50 mx-auto text-center">Thay đổi ảnh</label>
                        <input type="file" name="file_input" id="image_input" accept="image/*" hidden />
                    </div>
                </div>
                <div >
                    <button class="btn-red w-25">Lưu thay đổi</button>
                </div>
            </div>



        </div>
    )
}

export default UpdateInformation;