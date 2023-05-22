const EarnPoints = () => {
    const pStyle = "fontWeight: 600; marginBottom:8px";
    const spanStyle = "fontWeight: 400;"
    return (<div>
        <div class="mx-auto mt-4" >
            <h5 class="text-uppercase text-center p-2 text-white" style={{ backgroundColor: '#c23b1a' }}>Lịch sử tích điểm</h5>
            <div>
                <p style={{ pStyle }}>Số tích điểm đã nhận: <span style={{ spanStyle }}>60 cinepoint</span> </p>
                <p style={{ pStyle }}>Số tích điểm còn lại: <span style={{ spanStyle }}>36 cinepoint</span> </p>
            </div>
            <hr />
            <div class="row">
                <div class="col-12">
                    <p style={{ pStyle }}>Mã đặt vé: <span style={{ spanStyle }}>123456</span></p>
                    <p style={{ pStyle }}>Trạng thái: <span style={{ spanStyle }}>Thành công</span></p>
                    <p style={{ pStyle }}>Mô tả đặt vé: <span style={{ spanStyle }}>Phim: LatMat6-TamVeDinhMenh(c16, Suat chieu: 12:10-14:25, Ngay: 06/05/2023, Ghe: F09,F10,F11,F12, Rap: Metiz Cinema.)</span></p>
                    <p style={{ pStyle }}>Chi phí: <span style={{ spanStyle }}>340.000 VNĐ</span></p>
                    <p style={{ pStyle }}>Tích điểm: <span style={{ spanStyle }}>17</span></p>
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-12">
                    <p style={{ pStyle }}>Mã đặt vé: <span style={{ spanStyle }}>123456</span></p>
                    <p style={{ pStyle }}>Trạng thái: <span style={{ spanStyle }}>Thành công</span></p>
                    <p style={{ pStyle }}>Mô tả đặt vé: <span style={{ spanStyle }}>Phim: LatMat6-TamVeDinhMenh(c16, Suat chieu: 12:10-14:25, Ngay: 06/05/2023, Ghe: F09,F10,F11,F12, Rap: Metiz Cinema.)</span></p>
                    <p style={{ pStyle }}>Chi phí: <span style={{ spanStyle }}>340.000 VNĐ</span></p>
                    <p style={{ pStyle }}>Tích điểm: <span style={{ spanStyle }}>17</span></p>
                </div>
            </div>
            <hr />
            <div class="text-center">
                <button class="btn-red">Xem thêm</button>
            </div>
        </div>

    </div>
    )
}
export default EarnPoints;