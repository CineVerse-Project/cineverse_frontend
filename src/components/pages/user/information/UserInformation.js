const UserInformation = () => {
    return (
        <div>
            <div className="mx-auto mt-4" >
                <h5 className="text-uppercase text-center p-2 text-white" style={{ backgroundColor: '#c23b1a' }}>Thông tin tài khoản</h5>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Họ tên</label>
                            <input type="text" name="" id="" className="form-control" value="Nguyễn Văn A" disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Giới tính</label>
                            <input type="text" name="" id="" className="form-control" value="Nam" disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Ngày sinh</label>
                            <input type="text" name="" id="" className="form-control" value="01-01-2000" disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Số điện thoại</label>
                            <input type="text" name="" id="" className="form-control" value="0123456789" disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Email</label>
                            <input type="text" name="" id="" className="form-control" value="nguyenvana@gmail.com" disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Địa chỉ</label>
                            <textarea name="" id="" className="form-control" disabled>TP. ĐÀ NẴNG
                            </textarea>
                        </div>

                    </div>
                    <div className="col-6">
                        <p className="text-center text-uppercase">Hình ảnh</p>
                        <hr />
                        <div className="border w-75 mx-auto">
                            <img src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" className="w-100" />
                        </div>
                    </div>
                </div>
            </div>

        </div>)
}

export default UserInformation;