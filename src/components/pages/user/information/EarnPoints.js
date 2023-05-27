import { useState, useEffect } from "react";
import UserService from "../../../../services/UserService";
import { useParams, useNavigate } from "react-router-dom";


/**
 * @author HuuNQ
 * 26-05-2023
 * @method EarnPoints
 * @returns none
 */
const EarnPoints = () => {
    const [earnPoints, setEarnPoints] = useState([]);
    const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;
    const { username } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (token != null) {
            UserService.getEarnPointsByUsername(username,token)
                .then((data) => {
                    console.log(data);
                    setEarnPoints([...data]);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            navigate("/sign-in")
        }
    }, []);
    const mapEarnPoint = () => {
        for (let i = 0; i < earnPoints.length; i++) {
        return (
            <div>
                < div className="row" >
                    <div className="col-12">

                        <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Mã đặt vé: <span style={{ fontWeight: 400 }}>{earnPoints[i][0]}</span></p>
                        <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Trạng thái: <span style={{ fontWeight: 400 }}>{earnPoints[i][7] > 0 ? 'Thành công' : 'Thất bại'}</span></p>
                        <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Mô tả đặt vé: <span style={{ fontWeight: 400 }}>Phim: {earnPoints[i][2]}(c16, Suat chieu: {earnPoints[i][3].split('T')[1]}, Ngay:  {earnPoints[i][3].split('T')[0]}, Ghe: {earnPoints[i][6]}, Rap: {earnPoints[i][5]}.)</span></p>
                        <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Chi phí: <span style={{ fontWeight: 400 }}>{earnPoints[i][7]}</span></p>
                        <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Tích điểm: <span style={{ fontWeight: 400 }}>{earnPoints[i][8]}</span></p>
                    </div>
                </div >
                <hr />
            </div>
        )
        }
    }
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