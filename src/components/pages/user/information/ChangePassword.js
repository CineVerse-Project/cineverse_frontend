const ChangePassword = () => {
    return (<div>
                        <div className="mx-auto mt-4" >
                            <h5 className="text-uppercase text-center p-2 text-white" style={{ backgroundColor: '#c23b1a' }}>Thay đổi mật khẩu</h5>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="" className="form-label">Mật khẩu cũ (*)</label>
                                        <div className="icons">
                                            <input type="password" className="input-red input-with-icon" placeholder="Nhập mật khẩu" id="password" />
                                            <i className="fas fa-eye-slash icon" id="show_hide_password-icon" style={{ cursor: 'pointer', padding: 12 + 'px' + 12 + 'px' }} ></i>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="" className="form-label">Mật khẩu mới (*)</label>
                                        <div className="icons">
                                            <input type="password" className="input-red input-with-icon" placeholder="Nhập mật khẩu mới" id="new-password" />
                                            <i className="fas fa-eye-slash icon" id="show_hide_new-password-icon" style={{ cursor: 'pointer', padding: 12 + 'px' + 12 + 'px' }} ></i>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="" className="form-label">Xác nhận mật khẩu mới (*)</label>
                                        <div className="icons">
                                            <input type="password" className="input-red input-with-icon" placeholder="Nhập xác nhận mật khẩu mới" id="re-new-password" />
                                            <i className="fas fa-eye-slash icon" id="show_hide_re-new-password-icon" style={{ cursor: 'pointer', padding: 12 + 'px' + 12 + 'px' }} ></i>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div >
                                <button className="btn-red w-25">Thay đổi</button>
                            </div>
                        </div>
    </div>)
}
export default ChangePassword;