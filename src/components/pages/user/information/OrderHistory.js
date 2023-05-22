const OrderHistory = () => {
    return (<div>
    
                        <div className="mx-auto mt-4" >
                            <h5 className="text-uppercase text-center p-2 text-white" style={{backgroundColor: '#c23b1a'}}>Lịch sử đặt vé</h5>
                            <div className="row">
                                <div className="col-8">
                                    <p style={{fontWeight: 600, marginBottom:8 +'px'}}>Mã đặt vé: <span style={{fontWeight: 400}}>123456</span></p>
                                    <p style={{fontWeight: 600, marginBottom:8 +'px'}}>Trạng thái: <span style={{fontWeight: 400}}>Thành công</span></p>
                                    <p style={{fontWeight: 600, marginBottom:8 +'px'}}>Mô tả đặt vé: <span style={{fontWeight: 400}}>Phim: LatMat6-TamVeDinhMenh(c16, Suat chieu: 12:10-14:25, Ngay: 06/05/2023, Ghe: F09,F10,F11,F12, Rap: Metiz Cinema.)</span></p>
                                    <p style={{fontWeight: 600, marginBottom:8 +'px'}}>Chi phí: <span style={{fontWeight: 400}}>340.000 VNĐ</span></p>
                                </div>

                                <div className="col-4">
                                    <div className="mx-auto w-75">
                                        <img src="https://metiz.vn/media/poster_film/339082728_762916032238008_8555442761793095442_n.jpg" alt="" width="100%"/>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                                <div className="row">
                                    <div className="col-8">
                                        <p style={{fontWeight: 600, marginBottom:8 +'px'}}>Mã đặt vé: <span style={{fontWeight: 400}}>123456</span></p>
                                        <p style={{fontWeight: 600, marginBottom:8 +'px'}}>Trạng thái: <span style={{fontWeight: 400}}>Thành công</span></p>
                                        <p style={{fontWeight: 600, marginBottom:8 +'px'}}>Mô tả đặt vé: <span style={{fontWeight: 400}}>Phim: LatMat6-TamVeDinhMenh(c16, Suat chieu: 12:10-14:25, Ngay: 06/05/2023, Ghe: F09,F10,F11,F12, Rap: Metiz Cinema.)</span></p>
                                        <p style={{fontWeight: 600, marginBottom:8 +'px'}}>Chi phí: <span style={{fontWeight: 400}}>340.000 VNĐ</span></p>
                                    </div>

                                    <div className="col-4">
                                        <div className="mx-auto w-75">
                                            <img src="https://metiz.vn/media/poster_film/339082728_762916032238008_8555442761793095442_n.jpg" alt="" width="100%"/>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                    <div className="text-center">
                                        <button className="btn-red">Xem thêm</button>
                                    </div>
                                </div>
        </div>)
}
export default OrderHistory;